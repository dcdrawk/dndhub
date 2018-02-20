export default {
  computed: {
    proficiencyBonus () {
      return Math.floor((this.character.level + 7) / 4)
    }
  }
}
