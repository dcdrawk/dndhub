<template>
  <div>
    <v-card flat class="mb-1">
      <v-card-text>

      <v-container grid-list-md>
        <v-layout row wrap>
          <v-flex xs12>
            <v-text-field
              label="Proficiency Bonus"
              type="text"
              :value="proficiencyBonus"
              persistent-hint
              disabled
            />
          </v-flex>
          <v-flex xs12>
            <v-text-field
              label="Armor Class"
              type="number"
              :value="character.armorClass"
            />

          </v-flex>

          <v-flex xs6>
            <v-text-field
              label="Initiative"
              type="number"
              :value="character.initiative"
            />
          </v-flex>

          <v-flex xs6>
            <v-text-field
              label="Speed"
              type="number"
              :value="character.speed"
            />
          </v-flex>

        </v-layout>
        <!-- <v-divider/> -->
        <!-- <h3>Health</h3> -->
      </v-container>
      </v-card-text>
    </v-card>

    <v-card>
      <v-card-text>
        <h3 class="pl-2">Health</h3>
        <v-container grid-list-md>
          <v-layout row wrap>
            <v-flex xs6>
              <v-text-field
                label="Current HP"
                type="number"
                :value="character.HpCurrent"
                @input="updateCharacter('HpCurrent', $event)"
              />
            </v-flex>
            <v-flex xs6>
              <v-text-field
                label="Total HP"
                type="number"
                disabled
                :value="totalHP"
              />
            </v-flex>

            <v-flex xs6>
              <v-text-field
                label="Max HP"
                type="number"
                :value="character.HpMax"
                @input="updateCharacter('HpMax', $event)"
              />
            </v-flex>

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
 * <general></general>
 * @desc A character's general / basic info
 */
import proficiencyBonus from '../../../mixins/proficiencyBonus'
import races from '../../../mixins/game-data/races'
import validation from '../../../mixins/validation'
import character from '../../../mixins/character'
import CustomSelect from '../../inputs/CustomSelect'

export default {
  // Name
  name: 'combat',

  // Components
  components: {
    CustomSelect
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
