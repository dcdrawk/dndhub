<template>
  <div>
    <!-- Primary Class Card -->
    <v-card flat class="mb-1">
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
                @input="updateCharacter('subrace', $event);"
                @customize="customizeCharacter('subrace', !character.custom.subrace)"
              />
            </v-flex>

            <v-flex xs12 md6>
              <v-text-field
                label="Ability Score Increase"
                type="text"
                :value="character.abilityScoreIncrease"
                @input="updateCharacter('abilityScoreIncrease', $event)"
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
      this.updateCharacter('abilityScoreIncrease', race.abilityScoreIncrease)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
