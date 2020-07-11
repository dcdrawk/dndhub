<template>
  <div>
    <v-card
      v-if="characterScores"
      flat
    >
      <v-card-text class="pb-0 px-1">
        <div class="text-h6 px-2">
          Ability Scores
        </div>
        <v-row
          wrap
          dense
          class="stat-header pt-2 pb-2"
        >
          <v-col
            cols="6"
            class="pl-3"
          >
            <strong>Stat</strong>
          </v-col>
          <v-col cols="2">
            <strong>Base</strong>
          </v-col>
          <v-col cols="2">
            <strong>Bonus</strong>
          </v-col>
          <v-col cols="2">
            <strong>Mod.</strong>
          </v-col>
        </v-row>

        <v-row
          v-for="(item, key, index) in abilityScores"
          :key="index"
          class="stat"
          wrap
          dense
        >
          <v-col
            cols="12"
            class="pa-0"
          >
            <v-divider class="pa-0 ma-0" />
          </v-col>

          <v-col
            cols="6"
            class="pl-3 pt-2 pb-2 d-flex align-center"
          >
            <span class="stat__name">
              {{ item }}
            </span>
          </v-col>
          <v-col cols="2">
            <v-text-field
              type="number"
              class="pt-0"
              hide-details
              filled
              dense
              :value="characterScores[item].base"
              @input="updateAbilityScore(item, 'base', $event)"
            />
          </v-col>
          <v-col cols="2">
            <v-text-field
              type="number"
              class="pt-0"
              hide-details
              filled
              dense
              :value="characterScores[item].bonus"
              @input="updateAbilityScore(item, 'bonus', $event)"
            />
          </v-col>
          <v-col
            cols="2"
          >
            <v-text-field
              type="number"
              class="pt-0"
              hide-details
              disabled
              outlined
              dense
              :prefix="getAbilityScorePrefix(item)"
              :value="getAbilityModifier(item)"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-divider />

    <v-card
      v-if="characterSaves"
    >
      <v-card-text class="pt-4 px-1">
        <div class="text-h6 px-2">
          Saving Throws
        </div>
        <v-row
          wrap
          dense
          class="mb-2"
        >
          <v-col
            cols="6"
            class="pl-3"
          >
            <strong>Stat</strong>
          </v-col>
          <v-col cols="2">
            <strong>Prof.</strong>
          </v-col>
          <v-col cols="2">
            <strong>Bonus</strong>
          </v-col>
          <v-col cols="2">
            <strong>Mod.</strong>
          </v-col>
        </v-row>

        <v-row
          v-for="(item, key, index) in abilityScores"
          :key="index"
          class="stat"
          dense
          wrap
        >
          <v-col
            cols="12"
            class="pa-0 ma-0"
          >
            <v-divider class="pa-0 ma-0" />
          </v-col>
          <v-col
            cols="6"
            class="pl-3 d-flex align-center"
          >
            <span class="stat__name">
              {{ item }}
            </span>
          </v-col>
          <v-col cols="2">
            <v-checkbox
              class="mt-1"
              hide-details
              color="secondary"
              :input-value="characterSaves[item].proficient"
              :true-value="true"
              :false-value="false"
              @change="updateSavingThrows(item, 'proficient', $event)"
            />
          </v-col>
          <v-col cols="2">
            <v-text-field
              type="number"
              class="pt-0"
              hide-details
              filled
              dense
              :value="characterSaves[item].bonus"
              @input="updateSavingThrows(item, 'bonus', $event)"
            />
          </v-col>
          <v-col cols="2">
            <v-text-field
              type="number"
              class="pt-0"
              hide-details
              disabled
              outlined
              dense
              :prefix="getSavingThrowPrefix(item)"
              :value="getSavingModifier(item)"
            />
          </v-col>
        </v-row>
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
  name: 'AbilityScores',

  // Mixins
  mixins: [
    character,
    abilityScores,
    proficiencyBonus
  ],

  // Data
  data () {
    return {
      fetchedAbilityScores: false,
      fetchedSavingThrows: false
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

  // Watch
  watch: {
    character: {
      immediate: true,
      handler (newVal, oldVal) {
        console.log('watch character?', newVal)
        if (newVal) {
          if (!this.characterScores && !this.fetchedAbilityScores) {
            this.fetchedAbilityScores = true
            console.log('get ability scores?!?!??')
            this.getAbilityScores()
          }
          if (!this.characterSaves && !this.fetchedSavingThrows) {
            this.fetchedSavingThrows = true
            this.getSavingThrows()
          }
        }
      }
    }
  },

  // Methods
  methods: {
    getAbilityScorePrefix (item) {
      return this.getAbilityModifier(item) > 0 ? '+' : ''
    },
    getSavingThrowPrefix (item) {
      return this.getSavingModifier(item) > 0 ? '+' : ''
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
