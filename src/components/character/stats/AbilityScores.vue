<template>
  <div>
    <v-card class="stat-list" v-if="characterScores">
      <v-card-text class="pa-0">
        <v-container grid-list-sm class="pa-0">
          <v-layout row wrap class="stat-header pt-2 pb-2">
            <v-flex xs6 class="pl-3">
              <strong>Stat</strong>
            </v-flex>
            <v-flex xs2>
              <strong>Base</strong>
            </v-flex>
            <v-flex xs2>
              <strong>Bonus</strong>
            </v-flex>
            <v-flex xs2>
              <strong>Mod.</strong>
            </v-flex>
          </v-layout>

          <v-layout
            v-for="(item, key, index) in abilityScores"
            :key="index"
            class="pa-0 stat"
            wrap
          >
            <v-flex xs12 class="pa-0 ma-0">
              <v-divider class="pa-0 ma-0"></v-divider>
            </v-flex>

            <v-flex xs6 class="pl-3 pt-2 pb-2">
              <span class="stat__name">
                {{ item }}
              </span>
            </v-flex>
            <v-flex xs2>
              <v-text-field
                type="number"
                class="pt-0"
                hide-details
                :value="characterScores[item].base"
                @input="updateAbilityScore(item, 'base', $event)"
              />
            </v-flex>
            <v-flex xs2>
              <v-text-field
                type="number"
                class="pt-0"
                hide-details
                :value="characterScores[item].bonus"
                @input="updateAbilityScore(item, 'bonus', $event)"
              />
            </v-flex>
            <v-flex xs2>
              <v-text-field
                type="number"
                class="pt-0"
                hide-details
                disabled
                :value="getAbilityModifier(item)"
              />
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>

    <v-divider/>

    <v-card class="stat-list" v-if="characterSaves">
      <v-card-text class="pa-0 pt-4">
        <h3 class="pl-3 mb-2 pt-2">Saving Throws</h3>
        <v-container grid-list-sm class="pa-0">
          <v-layout row wrap class="stat-header mb-2">
            <v-flex xs6 class="pl-3">
              <strong>Stat</strong>
            </v-flex>
            <v-flex xs2>
              <strong>Prof.</strong>
            </v-flex>
            <v-flex xs2>
              <strong>Bonus</strong>
            </v-flex>
            <v-flex xs2>
              <strong>Mod.</strong>
            </v-flex>
          </v-layout>

          <v-layout
            v-for="(item, key, index) in abilityScores"
            :key="index"
            class="stat"
            row
            wrap
          >
            <v-flex xs12 class="pa-0 ma-0">
              <v-divider class="pa-0 ma-0"></v-divider>
            </v-flex>
            <v-flex xs6 class="pl-3 pt-2 pb-2">
              <span class="stat__name">
                {{ item }}
              </span>
            </v-flex>
            <v-flex xs2>
              <v-checkbox
                class="mt-1"
                hide-details
                color="secondary"
                :input-value="characterSaves[item].proficient"
                :true-value="true"
                :false-value="false"
                @change="updateSavingThrows(item, 'proficient', $event)"
              />
            </v-flex>
            <v-flex xs2>
              <v-text-field
                type="number"
                class="pt-0"
                hide-details
                :value="characterSaves[item].bonus"
                @input="updateSavingThrows(item, 'bonus', $event)"
              />
            </v-flex>
            <v-flex xs2>
              <v-text-field
                type="number"
                class="pt-0"
                hide-details
                disabled
                :value="getSavingModifier(item)"
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
 * <ability-scores></ability-scores>
 * @desc A character's ability scores
 */
import abilityScores from '../../../mixins/abilityScores'
import proficiencyBonus from '../../../mixins/proficiencyBonus'
import character from '../../../mixins/character'

export default {
  // Name
  name: 'ability-scores',

  // Mixins
  mixins: [
    character,
    abilityScores,
    proficiencyBonus
  ],

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

  // Watch
  watch: {
    character: {
      immediate: true,
      handler (newVal, oldVal) {
        if (newVal) {
          if (!this.characterScores) this.getAbilityScores()
          if (!this.characterSaves) this.getSavingThrows()
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.stat-list {
  overflow: hidden;

}
.stat {
  overflow: hidden;

  &:nth-child(even) {
    background-color: rgba(0, 0, 0, 0.05);
  }
  &__name {
    text-transform: capitalize;
  }
}
</style>
