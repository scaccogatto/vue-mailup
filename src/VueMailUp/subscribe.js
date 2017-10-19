import _ from 'lodash'
import axios from 'axios'
import Qs from 'qs'

const subscribe = {
  apply (key, data) {
    if (!subscribe.$_validateDataObj(data)) throw new Error('Not valid data object', data)
    return axios.get(subscribe.$_getApiUrl(key), { params: data, paramsSerializer: subscribe.$_serializer })
      .then(r => _.get(subscribe.$_replyCodesMap, r))
      .catch(r => _.get(subscribe.$_replyCodesMap, '1'))
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
    return _.every(subscribe.$_mandatoryKeys, k => {
      // FIXME
      if (typeof k === 'string') return _.hasIn(data, k)
      if (typeof k === 'object') return _.some(k, v => _.hasIn(data, v))
      return false
    })
  },
  $_serializer (params) {
    return subscribe.$_cleanSerializer(params)
  },
  $_cleanSerializer (params) {
    return Qs.stringify(params, { encode: false })
  }
}

export default subscribe
