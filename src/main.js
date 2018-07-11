import Vue from 'vue'
import App from './App.vue'
import store from './store'

import VeeValidate, { Validator } from 'vee-validate'
import { dictionary } from './validate-dict'
Validator.localize(dictionary)
Vue.use(VeeValidate)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
