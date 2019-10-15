export default {
  data () {
    return {
      abilityScores: [
        'strength',
        'dexterity',
        'constitution',
        'intelligence',
        'wisdom',
        'charisma'
      ]
    }
  },

  // Computed
  computed: {
    characterScores () {
      if (!this.character) return
      return this.$store.state.character.abilityScores
    },
    characterSaves () {
      if (!this.character) return
      return this.$store.state.character.savingThrows
    }
  },

  methods: {
    /**
     * Get Ability Scores
     * get a list of ability scores from firebase, store in Vuex
     */
    async getAbilityScores () {
      try {
        const snapshot = await this.$db.ref(
          `abilityScores/${this.characterId}`
        ).once('value')
        this.$store.commit('update_character_field', {
          field: 'abilityScores',
          value: snapshot.val()
        })
      } catch (error) {
        console.warn(error)
      }
    },

    /**
     * Get Saving Throws
     * get a list of saving thwos from firebase, store in Vuex
     */
    async getSavingThrows () {
      try {
        const snapshot = await this.$db.ref(
          `savingThrows/${this.characterId}`
        ).once('value')
        this.$store.commit('update_character_field', {
          field: 'savingThrows',
          value: snapshot.val()
        })
      } catch (error) {
        console.warn(error)
      }
    },

    /**
     * Get Ability Modifier
     * @returns {Number} - ability score mod
     */
    getAbilityModifier (item) {
      if (!this.characterScores) return
      const base = +this.characterScores[item].base || 0
      const bonus = +this.characterScores[item].bonus || 0
      const total = base + bonus
      return Math.floor((parseInt(total || 0, 0) / 2 - 5))
    },

    /**
     * Get Saving Modifier
     * @returns {Number} - saving throw mod
     */
    getSavingModifier (item) {
      let score = this.getAbilityModifier(item)
      score += +this.characterSaves[item].bonus || 0

      if (this.characterSaves[item].proficient) {
        score += this.proficiencyBonus
      }
      return score
    },

    /**
     * Update Ability Score
     * Update firebase and the store
     */
    updateAbilityScore (score, field, value) {
      const update = {}
      update[field] = value
      this.$db.ref(
        `abilityScores/${this.characterId}/${score}`
      ).update(update)
      const abilityScores = { ...this.characterScores }
      abilityScores[score][field] = value
      this.$store.commit('update_character_field', {
        field: 'abilityScores',
        value: abilityScores
      })
    },

    /**
     * Update Saving Throws
     * Update firebase and the store
     */
    updateSavingThrows (score, field, value) {
      const update = {}
      update[field] = value
      this.$db.ref(
        `savingThrows/${this.characterId}/${score}`
      ).update(update)
      const savingThrows = { ...this.characterSaves }
      savingThrows[score][field] = value
      this.$store.commit('update_character_field', {
        field: 'savingThrows',
        value: savingThrows
      })
    }
  }
}
