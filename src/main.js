import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import firebase from './firebase'
import VeeValidate from 'vee-validate'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.use(VeeValidate)
Vue.use(firebase)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
