import _ from 'lodash'
import axios from 'axios'
import Qs from 'qs'

const VueMailUp = {
  install (Vue, options) {
    Vue.prototype.$mailUp = {
      get NewsletterParameters () {
        return {
          List: options.list,
          retCode: 1,
          Confirm: process.env.NODE_ENV === 'development' ? '0' : '1'
        }
      },
      subscribe (data) {
        if (!VueMailUp.$_validateDataObj(data)) throw new Error('Not valid data object', data)
        return axios.get(VueMailUp.$_getApiUrl(options.key), { params: data, paramsSerializer: VueMailUp.$_serializer })
          .then(r => _.get(VueMailUp.$_replyCodesMap, r))
          .catch(r => _.get(VueMailUp.$_replyCodesMap, '1'))
      }
    }
  },
  $_mandatoryKeys: ['List', 'email', 'csvFldNames', 'csvFldValues'],
  $_noEncodeKeys: ['csvFldNames', 'csvFldValues', 'email'],
  $_replyCodesMap: {
    '0': { type: 'info', text: 'Operation completed successfully' },
    '1': { type: 'error', text: 'Generic error' },
    '2': { type: 'error', text: 'Invalid email address or mobile number' },
    '3': { type: 'error', text: 'Recipient already subscribed' },
    '-1011': { type: 'error', text: 'IP not registered' }
  },
  $_getApiUrl (key) {
    return `//${key}/frontend/xmlSubscribe.aspx`
  },
  $_validateDataObj (data) {
    return _.every(VueMailUp.$_mandatoryKeys, k => _.hasIn(data, k))
  },
  $_serializer (params) {
    return `${VueMailUp.$_encodedSerializer(_.omit(params, VueMailUp.$_noEncodeKeys))}&${VueMailUp.$_cleanSerializer(_.pick(params, VueMailUp.$_noEncodeKeys))}`
  },
  $_encodedSerializer (params) {
    return Qs.stringify(params, { arrayFormat: 'brackets' })
  },
  $_cleanSerializer (params) {
    return Qs.stringify(params, { encode: false })
  }
}

export default VueMailUp