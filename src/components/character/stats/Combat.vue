<template>
  <div>
    <v-card flat>
      <v-card-text>
        <h2 class="pl-0 pb-4">
          Combat Proficiencies
        </h2>
        <v-container
          grid-list-md
          class="pa-0"
        >
          <v-layout
            row
            wrap
          >
            <!-- Proficiency Bonus -->
            <v-flex xs12>
              <v-text-field
                label="Proficiency Bonus"
                type="text"
                :value="proficiencyBonus"
                persistent-hint
                disabled
                hint="Determined by level"
                @input="updateCharacter('proficiencyBonus', $event)"
              />
            </v-flex>

            <!-- Armor Class -->
            <v-flex xs12>
              <v-text-field
                label="Armor Class"
                type="number"
                :value="character.ac"
                @input="updateCharacter('ac', $event)"
              />
            </v-flex>

            <!-- Initiative -->
            <v-flex xs6>
              <v-text-field
                label="Initiative"
                type="number"
                :value="character.initiative"
                persistent-hint
                hint="Base = Dex Modifier"
                @input="updateCharacter('initiative', $event)"
              />
            </v-flex>

            <!-- Speed -->
            <v-flex xs6>
              <v-text-field
                label="Speed"
                type="number"
                :value="character.speed"
                @input="updateCharacter('speed', $event)"
              />
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>

    <v-divider />

    <v-card>
      <v-card-text>
        <h2 class="pl-0 pb-4">
          Health
        </h2>
        <v-container
          grid-list-md
          class="pa-0"
        >
          <v-layout
            row
            wrap
          >
            <!-- Current HP -->
            <v-flex xs6>
              <v-text-field
                label="Current HP"
                type="number"
                :value="character.HpCurrent"
                @input="updateCharacter('HpCurrent', $event)"
              />
            </v-flex>

            <!-- Total HP -->
            <v-flex xs6>
              <v-text-field
                label="Total HP"
                type="number"
                disabled
                :value="totalHP || 0"
              />
            </v-flex>

            <!-- Max HP -->
            <v-flex xs6>
              <v-text-field
                label="Max HP"
                type="number"
                :value="character.HpMax"
                @input="updateCharacter('HpMax', $event)"
              />
            </v-flex>

            <!-- Temp HP -->
            <v-flex xs6>
              <v-text-field
                label="Temp HP"
                type="number"
                :value="character.HpTemp"
                @input="updateCharacter('HpTemp', $event)"
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
