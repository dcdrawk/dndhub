export default {
  computed: {
    races () {
      return this.$store.state.gameData.races
    },
    subraces () {
      const race = this.character.race
      if (race) {
        for (let i in this.races) {
          if (race === this.races[i].name) {
            return this.races[i].subraces
          }
        }
      }
    }
  },

  methods: {
    getRace (name) {
      for (let i in this.races) {
        if (name === this.races[i].name) {
          return this.races[i]
        }
      }
    },

    getSubrace (name) {
      for (let i in this.subraces) {
        if (name === this.subraces[i].name) {
          return this.subraces[i]
        }
      }
    }
  }
}
