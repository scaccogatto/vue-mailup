# vue-mailup

MailUp plugin for VueJS -> [official docs](http://help.mailup.com/display/mailupapi/HTTP+API+Specifications)

## Usage

`$ npm install vue-mailup`

```js
import Vue from 'vue';
import VueMailUp from 'vue-mailup';

Vue.use(VueMailUp, options)
```

Vue Component

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

## Options

Options are **mandatory**

```js
let options = {
  list: 1, // list ID
  key: 'k2z5.s01.it', // your console URL
  confirm: 1 // confirmation email
};
```

## TODO

- Webpack bundle
- Check subscribe
- Unsubscribe
- Update