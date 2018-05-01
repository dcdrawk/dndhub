<template>
  <div>
    <!-- Primary Class Card -->
    <v-card flat>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout row wrap>
            <!-- Primary Class Name -->
            <v-flex xs12 md6>
              <custom-select
                label="Race"
                :value="character.race"
                :items="races"
                item-text="name"
                item-value="name"
                :custom="character.custom.race"
                @input="updateRace($event);"
                @customize="customizeCharacter('race', !character.custom.race)"
              />
            </v-flex>

            <v-flex xs12 md6>
              <custom-select
                label="Subrace"
                :value="character.subrace"
                :items="subraces"
                item-text="name"
                item-value="name"
                :custom="character.custom.subrace"
                @input="updateSubrace($event);"
                @customize="customizeCharacter('subrace', !character.custom.subrace)"
              />
            </v-flex>

            <v-flex xs12 md6>
              <v-text-field
                label="Ability Score Increase (Race)"
                type="text"
                :value="character.abilityScoreIncreaseRace"
                @input="updateCharacter('abilityScoreIncreaseRace', $event)"
              />
            </v-flex>

            <v-flex xs12 md6>
              <v-text-field
                label="Ability Score Increase (Subrace)"
                type="text"
                :value="character.abilityScoreIncreaseSubrace"
                @input="updateCharacter('abilityScoreIncreaseSubrace', $event)"
              />
            </v-flex>

            <v-flex xs12 md6>
              <v-text-field
                label="Speed"
                type="text"
                :value="character.speed"
                @input="updateCharacter('speed', $event)"
              />
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
/**
 * <race-summary></race-summary>
 * @desc A character's race and subrace
 */
import races from '../../../mixins/game-data/races'
import character from '../../../mixins/character'
import CustomSelect from '../../inputs/CustomSelect'

export default {
  // Name
  name: 'race-summary',

  // Components
  components: {
    CustomSelect
  },

  // Mixins
  mixins: [
    character,
    races
  ],

  computed: {
    user () {
      return this.$store.state.user
    }
  },

  methods: {
    /**
     * Update the characters race
     */
    async updateRace (value) {
      const race = this.getRace(value)
      this.updateCharacter('race', value)
      this.updateCharacter('subrace', value)
      this.updateCharacter('speed', race.speed)
      this.updateCharacter('abilityScoreIncreaseRace', race.abilityScoreIncrease)
    },

    /**
     * Update the characters subrace
     */
    async updateSubrace (value) {
      const subrace = this.getSubrace(value)
      console.log(subrace)
      this.updateCharacter('subrace', value)
      this.updateCharacter('abilityScoreIncreaseSubrace', subrace.abilityScoreIncrease)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
