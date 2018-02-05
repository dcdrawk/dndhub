import Vue from 'vue'
import Firebase from 'firebase'
import VueFire from 'vuefire'

export default class FirebaseSetup {
  // console.log(process.env.API_KEY)

  static firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID
  }

  static install () {
    Vue.use(VueFire)
    const firebaseApp = Firebase.initializeApp(this.firebaseConfig)
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
