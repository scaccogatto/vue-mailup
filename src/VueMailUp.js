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
          Confirm: options.confirm
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
  $_mandatoryKeys: ['List', ['email', 'sms'], 'csvFldNames', 'csvFldValues'],
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
    return _.every(VueMailUp.$_mandatoryKeys, k => {
      // FIXME
      if (typeof k === 'string') return _.hasIn(data, k)
      if (typeof k === 'object') return _.some(k, v => _.hasIn(data, v))
      return false
    })
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

// browser load
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueMailUp)
}
