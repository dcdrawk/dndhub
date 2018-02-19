// import character from '../character'

export default {
  // Mixins
  mixins: [
    // character
  ],

  // Computed
  computed: {
    classes () {
      return this.$store.state.gameData.classes
    }
  },

  // Methods
  methods: {
    getSubclassLabel (className) {
      if (!className) return
      return this.getClass(className).archetypes.name
    },

    getSubclassOptions (className) {
      if (!className) return
      return this.getClass(className).archetypes.options
    },

    getClass (className) {
      for (let classObj of this.classes) {
        if (classObj.name === className) return classObj
      }
    },

    getHitDice (className) {
      if (!className) return
      return this.getClass(className).hitDice
    },

    async addMulticlass () {
      try {
        const ref = await this.$db
          .ref(`characters/${this.user.uid}/${this.characterId}/classes`)
          .push({
            name: '',
            subclass: '',
            hitDice: '',
            custom: {
              init: true
            }
          })
          .once('value')

        const classes = this.character.classes
        classes[ref.key] = ref.val()
        this.$store.commit('update_character_field', {
          field: 'classes',
          value: classes
        })
      } catch (error) {

      }
    },

    removeClass (id) {
      this.$db
        .ref(`characters/${this.user.uid}/${this.characterId}/classes/${id}`)
        .remove()

      const classes = this.character.classes
      delete classes[id]
      this.$store.commit('update_character_field', {
        field: 'classes',
        value: classes
      })
    }
  }
}
