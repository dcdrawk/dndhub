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
    primary: colors.red.base,
    secondary: colors.orange.accent2,
    accent: colors.orange.accent3,
    error: colors.red.darken3,
    info: colors.cyan.accent3,
    success: colors.green.base,
    warning: colors.deepOrange.base
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
