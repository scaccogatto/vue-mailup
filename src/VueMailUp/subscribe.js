import _ from 'lodash'
import axios from 'axios'
import { validateDataObj, cleanSerialize } from './validate.js'

const subscribe = {
  apply (key, data) {
    if (!validateDataObj(data, subscribe.$_mandatoryKeys)) throw new Error('Not valid data object', data)
    return axios.get(subscribe.$_getApiUrl(key), { params: data, paramsSerializer: subscribe.$_serializer })
      .then(r => _.get(subscribe.$_replyCodesMap, r))
      .catch(r => _.get(subscribe.$_replyCodesMap, '1'))
  },
  $_mandatoryKeys: ['List', ['email', 'sms'], 'csvFldNames', 'csvFldValues'],
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
  $_serializer (params) {
    return cleanSerialize(params)
  }
}

export default subscribe
