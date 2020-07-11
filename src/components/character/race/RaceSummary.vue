<template>
  <div>
    <!-- Primary Class Card -->
    <v-card flat>
      <v-card-text>
        <!-- <v-container
          grid-list-md
          class="pa-0"
        > -->
        <v-row
          wrap
        >
          <!-- Primary Class Name -->
          <v-col
            cols="12"
            md="6"
          >
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
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <custom-select
              label="Subrace"
              :value="character.subrace"
              :items="subraces"
              item-text="name"
              item-value="name"
              :custom="character.custom.race || character.custom.subrace"
              @input="updateSubrace($event);"
              @customize="customizeCharacter('subrace', !character.custom.subrace)"
            />
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              label="Ability Score Increase (Race)"
              type="text"
              :value="character.abilityScoreIncreaseRace"
              color="secondary"
              filled
              hide-details
              @input="updateCharacter('abilityScoreIncreaseRace', $event)"
            />
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              label="Ability Score Increase (Subrace)"
              type="text"
              :value="character.abilityScoreIncreaseSubrace"
              color="secondary"
              filled
              hide-details
              @input="updateCharacter('abilityScoreIncreaseSubrace', $event)"
            />
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              label="Speed"
              type="text"
              color="secondary"
              filled
              hide-details
              :value="character.speed"
              @input="updateCharacter('speed', $event)"
            />
          </v-col>
        </v-row>
        <!-- </v-container> -->
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
  name: 'RaceSummary',

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
      this.updateCharacter('race', value)
      // this.updateCharacter('subrace', value)
      const race = this.getRace(value)
      if (!race) return
      this.updateCharacter('speed', race.speed)
      this.updateCharacter('abilityScoreIncreaseRace', race.abilityScoreIncrease)
    },

    /**
     * Update the characters subrace
     */
    async updateSubrace (value) {
      this.updateCharacter('subrace', value)
      const subrace = this.getSubrace(value)
      if (!subrace) return
      this.updateCharacter('abilityScoreIncreaseSubrace', subrace.abilityScoreIncrease)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
