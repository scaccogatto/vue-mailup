import _ from 'lodash'
import Qs from 'qs'

export function validateDataObj (data, rules) {
  return _.every(rules, k => {
    // FIXME
    if (typeof k === 'string') return _.hasIn(data, k)
    if (typeof k === 'object') return _.some(k, v => _.hasIn(data, v))
    return false
  })
}

export function cleanSerialize (params) {
  return Qs.stringify(params, { encode: false })
}
