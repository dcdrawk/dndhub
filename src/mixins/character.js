export default {
  computed: {
    user () {
      return this.$store.state.user
    },
    character () {
      return this.$store.state.character
    }
  },

  methods: {
    /**
     * Update Character
     * @param {String} field
     * @param {String|Boolean|Array|Object} value
     */
    updateCharacter (field, value) {
      let update = {}
      value = value || ''
      update[field] = value

      this.$db.ref(`characters/${this.user.uid}/${this.character.id}/`)
        .update(update)

      this.$store.commit('update_character', {
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
      this.$db.ref(`characters/${this.user.uid}/${this.character.id}/custom`)
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
