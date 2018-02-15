import CharacterCRUD from '../models/characterCRUD'
export default {
  // Computed
  computed: {
    characterId () {
      return this.$store.state.characterId
    }
  },
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
          if (this.characterId) CharacterCRUD.select(this.characterId)
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
