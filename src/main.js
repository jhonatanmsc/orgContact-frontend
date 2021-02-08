import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import GoogleAuth from '@/config/google_oAuth.js';

const gauthOption = {
  clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID,
  scope: 'profile email',
  prompt: 'select_account'
}

Vue.config.productionTip = false
Vue.use(GoogleAuth, gauthOption)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
