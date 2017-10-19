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
          retCode: 1,
          Confirm: options.confirm
        }
      },
      subscribe (data) {
        return subscribe.apply(options.key, data)
      },
      checkSubscriber (data) {
        // return checkSubscriber.apply(options.key, data)
      },
      updateSubscriber (data) {
        // return updateSubscriber.apply(options.key, data)
      },
      unsubscribe (data) {
        // return unsubscribe.apply(options.key, data)
      }
    }
  }
}

export default VueMailUp

// browser load
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueMailUp)
}
