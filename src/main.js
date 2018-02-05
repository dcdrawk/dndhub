import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import firebase from './firebase'

/**
 * Import Vuetify
 */
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false
console.dir(Vuetify)
Vue.use(Vuetify)

console.log(process.env.API_KEY)
Vue.use(firebase)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
