// import CharacterCRUD from '../models/characterCRUD'

export default {
  computed: {
    user () {
      return this.$store.state.user
    },
    character () {
      return this.$store.state.character
    },
    characterId () {
      return this.$store.state.characterId
    }
  },

  // mounted () {
  //   this.$db.ref(`characters/${this.user.uid}/${this.character.id}/`)
  //     .on('value', (snapshot) => {
  //       this.$store.commit('update_character', snapshot.val())
  //     })
  // },

  // Watch
  // watch: {
  //   user: {
  //     immediate: true,
  //     handler: function (newValue, oldValue) {
  //       if (!newValue) return
  //       this.initCharacter()
  //     }
  //   }
  // },

  // Methods
  methods: {
    initCharacter () {
      console.log('init character...')
      this.$db.ref(`characters/${this.user.uid}/${this.character.id}/`)
        .on('value', (snapshot) => {
          console.log('character updated!')
          // this.$store.commit('update_character', snapshot.val())
        })
    },

    /**
     * Update Character
     * @param {String} field
     * @param {String|Boolean|Array|Object} value
     */
    updateCharacter (field, value) {
      let update = {}
      value = value || ''
      update[field] = value
      this.$db.ref(`characters/${this.user.uid}/${this.characterId}/`)
        .update(update)
      this.$store.commit('update_character_field', {
        field: field,
        value: value
      })
    },

    /**
     * Customize Character
     * @param {String} field
     * @param {Boolean} value
     */
    customizeCharacter (field, value) {
      let update = {}
      update[field] = value
      this.$db.ref(`characters/${this.user.uid}/${this.characterId}/custom`)
        .update(update)

      this.$store.commit('customize_character', {
        field: field,
        value: value
      })
    }

    /**
     * Set Class
     * @param {String} field
     * @param {String|Boolean|Array|Object} value
     */
    // setClass (field, value) {
    //   let update = {}
    //   value = value || ''
    //   update[field] = value

    //   this.$db.ref(`characters/${this.user.uid}/${this.character.id}/`)
    //     .update(update)

    //   this.$store.commit('update_character', {
    //     field: field,
    //     value: value
    //   })
    // },
  }
}
