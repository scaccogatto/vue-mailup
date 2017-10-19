import subscribe from './VueMailUp/subscribe.js'
import checkSubscriber from './VueMailUp/checkSubscriber.js'
import updateSubscriber from './VueMailUp/updateSubscriber.js'
import unsubscribe from './VueMailUp/unsubscribe.js'

const VueMailUp = {
  install (Vue, options) {
    Vue.prototype.$mailUp = {
      get NewsletterParameters () {
        return {
          List: options.list,
          ListGuid: options.listGuid,
          retCode: 1,
          Confirm: options.confirm
        }
      },
      subscribe (data, key = options.key) {
        return subscribe.apply(key, data)
      },
      checkSubscriber (data, key = options.key) {
        return checkSubscriber.apply(key, data)
      },
      updateSubscriber (data, key = options.key) {
        return updateSubscriber.apply(key, data)
      },
      unsubscribe (data, key = options.key) {
        return unsubscribe.apply(key, data)
      }
    }
  }
}

export default VueMailUp

// browser load
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueMailUp)
}
