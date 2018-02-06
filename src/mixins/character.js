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

    customizeCharacter (field, value) {
      console.log('customize!', field, value)
      let update = {}
      update[field] = value
      this.$db.ref(`characters/${this.user.uid}/${this.character.id}/custom`)
        .update(update)

      this.$store.commit('customize_character', {
        field: field,
        value: value
      })
    }
  }
}
