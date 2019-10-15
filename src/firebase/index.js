import Vue from 'vue'
import Firebase from 'firebase/app'
import * as VueFire from 'vuefire'

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID
}

export default class FirebaseSetup {
  static install () {
    Vue.use(VueFire)
    const firebaseApp = Firebase.initializeApp(firebaseConfig)
    const db = firebaseApp.database()

    Object.defineProperty(Vue.prototype, '$firebase', {
      get () {
        return firebaseApp
      }
    })

    Object.defineProperty(Vue.prototype, '$db', {
      get () {
        return db
      }
    })
  }
}
