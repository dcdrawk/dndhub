export default {
  // Methods
  methods: {
    /**
     * @function initFirebase
     * @desc initialize firebase, watch auth state for changes
     * if there is a user, store that in Vuex
     */
    initFirebase () {
      this.$firebase.auth().onAuthStateChanged(user => {
        if (user) {
          console.log('a user has signed in!')
          this.$store.commit('update_user', user)
        } else {
          console.log('no user is signed in...')
          this.$store.commit('update_user', undefined)
        }
      })
    }
  },

  // Mounted
  mounted () {
    this.initFirebase()
  }
}
