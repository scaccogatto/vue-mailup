import _ from 'lodash'
import axios from 'axios'
import { validateDataObj, cleanSerialize } from './validate.js'

const checkSubscriber = {
  apply (key, data) {
    if (!validateDataObj(data, checkSubscriber.$_mandatoryKeys)) throw new Error('Not valid data object', data)
    return axios.get(checkSubscriber.$_getApiUrl(key), { params: data, paramsSerializer: cleanSerialize })
      .then(r => _.get(checkSubscriber.$_replyCodesMap, r))
      .catch(r => _.get(checkSubscriber.$_replyCodesMap, '1'))
  },
  $_mandatoryKeys: ['ListGuid', 'List', ['email', 'sms']],
  $_replyCodesMap: {
    '1': { type: 'error', text: 'Generic error / recipient does not exist' },
    '2': { type: 'info', text: 'Recipient subscribed (OPT-IN)' },
    '3': { type: 'info', text: 'Recipient unsubscribed (OPT-OUT)' },
    '4': { type: 'info', text: 'Recipient\'s subscription to be confirmed (PENDING)' }
  },
  $_getApiUrl (key) {
    return `//${key}/frontend/Xmlchksubscriber.aspx`
  }
}

export default checkSubscriber
