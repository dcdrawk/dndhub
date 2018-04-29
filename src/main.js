import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import eventBus from './eventBus'
import firebase from './firebase'
import VeeValidate from 'vee-validate'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/es5/util/colors'

Vue.config.productionTip = false
Vue.use(Vuetify, {
  theme: {
    primary: colors.red.darken1,
    secondary: colors.orange.darken1,
    accent: colors.shades.black,
    error: colors.orange.accent3
  }
})
Vue.use(VeeValidate)
Vue.use(eventBus)
Vue.use(firebase)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
