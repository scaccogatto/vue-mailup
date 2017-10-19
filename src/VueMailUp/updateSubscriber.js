import _ from 'lodash'
import axios from 'axios'
import { validateDataObj, cleanSerialize } from './validate.js'

const updateSubscriber = {
  apply (key, data) {
    if (!validateDataObj(data, updateSubscriber.$_mandatoryKeys)) throw new Error('Not valid data object', data)
    return axios.get(updateSubscriber.$_getApiUrl(key), { params: data, paramsSerializer: cleanSerialize })
      .then(r => _.get(updateSubscriber.$_replyCodesMap, r))
      .catch(r => _.get(updateSubscriber.$_replyCodesMap, '1'))
  },
  $_mandatoryKeys: ['ListGuid', 'List', ['email', 'sms'], 'csvFldNames', 'csvFldValues'],
  $_replyCodesMap: {
    '0': { type: 'info', text: 'Data updated successfully' },
    '1': { type: 'error', text: 'Generic error' }
  },
  $_getApiUrl (key) {
    return `//${key}/frontend/xmlUpdSubscriber.aspx`
  }
}

export default updateSubscriber
