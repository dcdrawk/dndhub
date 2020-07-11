<template>
  <div>
    <v-card flat>
      <v-card-text>
        <div class="text-h6 mb-2">
          Combat Proficiencies
        </div>
        <!-- <v-container
          grid-list-md
          class="pa-0"
        > -->
        <v-row
          wrap
        >
          <!-- Proficiency Bonus -->
          <v-col
            cols="12"
            class="pb-0"
          >
            <v-text-field
              label="Proficiency Bonus"
              type="text"
              :value="proficiencyBonus"
              persistent-hint
              disabled
              filled
              hint="Determined by level"
              hide-details="auto"
              color="secondary"
              @input="updateCharacter('proficiencyBonus', $event)"
            />
          </v-col>

          <!-- Armor Class -->
          <v-col cols="12">
            <v-text-field
              label="Armor Class"
              type="number"
              :value="character.ac"
              color="secondary"
              hide-details
              filled
              @input="updateCharacter('ac', $event)"
            />
          </v-col>

          <!-- Initiative -->
          <v-col cols="6">
            <v-text-field
              label="Initiative"
              type="number"
              :value="character.initiative"
              persistent-hint
              hint="Base = Dex Modifier"
              color="secondary"
              filled
              @input="updateCharacter('initiative', $event)"
            />
          </v-col>

          <!-- Speed -->
          <v-col cols="6">
            <v-text-field
              label="Speed"
              type="number"
              :value="character.speed"
              color="secondary"
              filled
              @input="updateCharacter('speed', $event)"
            />
          </v-col>
        </v-row>
        <!-- </v-container> -->
      </v-card-text>
    </v-card>

    <v-divider />

    <v-card>
      <v-card-text>
        <div class="text-h6 mb-4">
          Health
        </div>
        <!-- <v-container
          grid-list-md
          class="pa-0"
        > -->
        <v-row
          row
          wrap
        >
          <!-- Current HP -->
          <v-col cols="6">
            <v-text-field
              label="Current HP"
              type="number"
              :value="character.HpCurrent"
              color="secondary"
              filled
              hide-details
              @input="updateCharacter('HpCurrent', $event)"
            />
          </v-col>

          <!-- Total HP -->
          <v-col cols="6">
            <v-text-field
              label="Total HP"
              type="number"
              disabled
              color="secondary"
              filled
              hide-details
              :value="totalHP || 0"
            />
          </v-col>

          <!-- Max HP -->
          <v-col cols="6">
            <v-text-field
              label="Max HP"
              type="number"
              :value="character.HpMax"
              color="secondary"
              filled
              hide-details
              @input="updateCharacter('HpMax', $event)"
            />
          </v-col>

          <!-- Temp HP -->
          <v-col cols="6">
            <v-text-field
              label="Temp HP"
              type="number"
              :value="character.HpTemp"
              color="secondary"
              filled
              hide-details
              @input="updateCharacter('HpTemp', $event)"
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
 * <combat></combat>
 * @desc A character's combat related stats
 */
import proficiencyBonus from '../../../mixins/proficiencyBonus'
import races from '../../../mixins/game-data/races'
import validation from '../../../mixins/validation'
import character from '../../../mixins/character'
// import CustomSelect from '../../inputs/CustomSelect'

export default {
  // Name
  name: 'Combat',

  // Components
  components: {
    // CustomSelect
  },

  // Mixins
  mixins: [
    character,
    proficiencyBonus,
    races,
    validation
  ],

  // Computed
  computed: {
    totalHP () {
      return this.character
        ? +this.character.HpMax + +this.character.HpTemp
        : 0
    }
  }
}
</script>

<style scoped lang="scss">
</style>
