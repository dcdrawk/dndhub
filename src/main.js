import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import eventBus from './eventBus'
import firebase from './firebase'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import '@/plugins/vee-validate'
import vuetify from '@/plugins/vuetify'
import VueVirtualScroller from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

Vue.config.productionTip = false
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
Vue.use(eventBus)
Vue.use(firebase)
Vue.use(VueVirtualScroller)

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
