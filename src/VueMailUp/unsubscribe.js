import _ from 'lodash'
import axios from 'axios'
import { validateDataObj, cleanSerialize } from './validate.js'

const unsubscribe = {
  apply (key, data) {
    if (!validateDataObj(data, unsubscribe.$_mandatoryKeys)) throw new Error('Not valid data object', data)
    return axios.get(unsubscribe.$_getApiUrl(key), { params: data, paramsSerializer: cleanSerialize })
      .then(r => _.get(unsubscribe.$_replyCodesMap, r))
      .catch(r => _.get(unsubscribe.$_replyCodesMap, '1'))
  },
  $_mandatoryKeys: ['ListGuid', 'List', ['email', 'sms']],
  $_replyCodesMap: {
    '0': { type: 'info', text: 'Recipient unsubscribed successfully' },
    '1': { type: 'error', text: 'Generic error' },
    '3': { type: 'info', text: 'Recipient unknown / already unsubscribed' }
  },
  $_getApiUrl (key) {
    return `//${key}/frontend/Xmlunsubscribe.aspx`
  }
}

export default unsubscribe
