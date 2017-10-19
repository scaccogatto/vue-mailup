# vue-mailup

MailUp plugin for VueJS -> [official docs](http://help.mailup.com/display/mailupapi/HTTP+API+Specifications)

## Usage

### Vue entry point

`$ npm install vue-mailup`

```js
import Vue from 'vue';
import VueMailUp from 'vue-mailup';

const options = {
  list: 1, // list ID
  listGuid: 'xxxx-xxxx-xxxx', // list guid
  key: 'k2z5.s01.it', // your console URL
  confirm: 1 // confirmation email
};

Vue.use(VueMailUp, options)
```

### Vue Component - Subscribe

```js
export default {
  ...
  methods: {
    subscribeAction (formData) {
      // first gather your basic data (if they're static for the whole app)
      const baseNewsletterParams = this.$mailUp.NewsletterParameters

      // gather necessary data
      const formData = {
        email: 'test@email.com',
        csvFldNames: ['campo1', 'campo2'].join(';'),
        csvFldValues: ['field1Value', 'field2Value'].join(';')
      }

      // merge data
      const subscribeData = Object.assign({}, baseNewsletterParams, formData)

      // send data
      this.$mailUp.subscribe(subscribeData)
        .then(reply => { /* do things here */ })
        .catch(reply => { /* error occurred here */ })

      /**
       * this will call:
       * http://k2z5.s01.it/frontend/xmlsubscribe.aspx
       * ?List=1
       * &ListGuid=xxxx-xxxx-xxxx
       * &Confirm=1
       * &retCode=1
       * &email=test@email.com
       * &csvFldNames=campo1;campo2
       * &csvFldValues=field1Value;field2Value
       */
    }
  }
  ...
}
```

### Vue Component - CheckSubscriber

```js
export default {
  ...
  methods: {
    checkSubscribeAction (formData) {
      // first gather your basic data (if they're static for the whole app)
      const baseNewsletterParams = this.$mailUp.NewsletterParameters

      // gather necessary data
      const formData = {
        email: 'test@email.com'
      }

      // merge data
      const subscribeData = Object.assign({}, baseNewsletterParams, formData)

      // send data
      this.$mailUp.checkSubscriber(subscribeData)
        .then(reply => { /* do things here */ })
        .catch(reply => { /* error occurred here */ })

      /**
       * this will call:
       * http://k2z5.s01.it/frontend/Xmlchksubscriber.aspx
       * ?List=1
       * &ListGuid=xxxx-xxxx-xxxx
       * &Confirm=1
       * &retCode=1
       * &email=test@email.com
       */
    }
  }
  ...
}
```

### Vue Component - UpdateSubscriber

```js
export default {
  ...
  methods: {
    updateSubscribeAction (formData) {
      // first gather your basic data (if they're static for the whole app)
      const baseNewsletterParams = this.$mailUp.NewsletterParameters

      // gather necessary data
      const formData = {
        email: 'test@email.com',
        csvFldNames: ['campo1', 'campo2'].join(';'),
        csvFldValues: ['field1Value', 'field2Value'].join(';')
      }

      // merge data
      const subscribeData = Object.assign({}, baseNewsletterParams, formData)

      // send data
      this.$mailUp.updateSubscriber(subscribeData)
        .then(reply => { /* do things here */ })
        .catch(reply => { /* error occurred here */ })

      /**
       * this will call:
       * http://k2z5.s01.it/frontend/xmlUpdSubscriber.aspx
       * ?List=1
       * &ListGuid=xxxx-xxxx-xxxx
       * &Confirm=1
       * &retCode=1
       * &email=test@email.com
       * &csvFldNames=campo1;campo2
       * &csvFldValues=field1Value;field2Value
       */
    }
  }
  ...
}
```

### Vue Component - Unsubscribe

```js
export default {
  ...
  methods: {
    unsubscribeAction (formData) {
      // first gather your basic data (if they're static for the whole app)
      const baseNewsletterParams = this.$mailUp.NewsletterParameters

      // gather necessary data
      const formData = {
        email: 'test@email.com'
      }

      // merge data
      const unsubscribeData = Object.assign({}, baseNewsletterParams, formData)

      // send data
      this.$mailUp.unsubscribe(unsubscribeData)
        .then(reply => { /* do things here */ })
        .catch(reply => { /* error occurred here */ })

      /**
       * this will call:
       * http://k2z5.s01.it/frontend/Xmlunsubscribe.aspx
       * ?List=1
       * &ListGuid=xxxx-xxxx-xxxx
       * &Confirm=1
       * &retCode=1
       * &email=test@email.com
       */
    }
  }
  ...
}
```

## Options

Options are **mandatory**

```js
const options = {
  list: 1, // list ID
  listGuid: 'xxxx-xxxx-xxxx', // list guid
  key: 'k2z5.s01.it', // your console URL
  confirm: 1 // confirmation email
};
```

## TODO

- Webpack bundle
- Test