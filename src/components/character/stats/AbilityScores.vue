<template>
  <div>
    <v-card v-if="characterScores" class="mb-1">
      <v-card-text class="pa-1">
        <v-container grid-list-sm>
          <v-layout row wrap class="stat-header mb-2">
            <v-flex xs3>
              <strong>Stat</strong>
            </v-flex>
            <v-flex xs3>
              <strong>Base</strong>
            </v-flex>
            <v-flex xs3>
              <strong>Bonus</strong>
            </v-flex>
            <v-flex xs3>
              <strong>Modifier</strong>
            </v-flex>
          </v-layout>

          <v-layout
            v-for="(item, key, index) in abilityScores"
            :key="index"
            class="mb-2"
          >
            <v-flex xs3 class="pt-2">
              <span class="stat-name">
                {{ item.slice(0, 3) }}.
              </span>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                type="number"
                class="pt-0"
                hide-details
                :value="characterScores[item].base"
                @input="updateAbilityScore(item, 'base', $event)"
              />
            </v-flex>
            <v-flex xs3>
              <v-text-field
                type="number"
                class="pt-0"
                hide-details
                :value="characterScores[item].bonus"
                @input="updateAbilityScore(item, 'bonus', $event)"
              />
            </v-flex>
            <v-flex xs3>
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

    <v-card v-if="characterSaves">
      <v-card-text class="pa-1">
        <h3 class="pl-1 mb-2 mt-2">Saving Throws</h3>
        <v-container grid-list-sm>
          <v-layout row wrap class="stat-header mb-2">
            <v-flex xs3>
              <strong>Stat</strong>
            </v-flex>
            <v-flex xs3>
              <strong>Proficient</strong>
            </v-flex>
            <v-flex xs3>
              <strong>Bonus</strong>
            </v-flex>
            <v-flex xs3>
              <strong>Modifier</strong>
            </v-flex>
          </v-layout>

          <v-layout
            v-for="(item, key, index) in abilityScores"
            :key="index"
            class="mb-2"
          >
            <v-flex xs3 class="pt-2">
              <span class="stat-name">
                {{ item.slice(0, 3) }}.
              </span>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                hide-details
                color="secondary"
                :input-value="characterSaves[item].proficient"
                :true-value="true"
                :false-value="false"
                @change="updateSavingThrows(item, 'proficient', $event)"
              />
            </v-flex>
            <v-flex xs3>
              <v-text-field
                type="number"
                class="pt-0"
                hide-details
                :value="characterSaves[item].bonus"
                @input="updateSavingThrows(item, 'bonus', $event)"
              />
            </v-flex>
            <v-flex xs3>
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
import CustomSelect from '../../inputs/CustomSelect'

export default {
  // Name
  name: 'ability-scores',

  // Components
  components: {
    CustomSelect
  },

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
  },

  // Methods
  methods: {
    async getAbilityScores () {
      try {
        const snapshot = await this.$db.ref(
          `abilityScores/${this.characterId}`
        ).once('value')
        this.$store.commit('update_character_field', {
          field: 'abilityScores',
          value: snapshot.val()
        })
      } catch (error) {
        console.warn(error)
      }
    },

    async getSavingThrows () {
      try {
        const snapshot = await this.$db.ref(
          `savingThrows/${this.characterId}`
        ).once('value')
        this.$store.commit('update_character_field', {
          field: 'savingThrows',
          value: snapshot.val()
        })
      } catch (error) {
        console.warn(error)
      }
    },

    getAbilityModifier (item) {
      const base = +this.characterScores[item].base || 0
      const bonus = +this.characterScores[item].bonus || 0
      const total = base + bonus
      return Math.floor((parseInt(total || 0, 0) / 2 - 5))
    },

    getSavingModifier (item) {
      let score = this.getAbilityModifier(item)
      score += +this.characterSaves[item].bonus || 0

      if (this.characterSaves[item].proficient) {
        score += this.proficiencyBonus
      }
      return score
    },

    updateAbilityScore (score, field, value) {
      const update = {}
      update[field] = value
      this.$db.ref(
        `abilityScores/${this.characterId}/${score}`
      ).update(update)
      const abilityScores = {...this.characterScores}
      abilityScores[score][field] = value
      this.$store.commit('update_character_field', {
        field: 'abilityScores',
        value: abilityScores
      })
    },

    updateSavingThrows (score, field, value) {
      const update = {}
      update[field] = value
      this.$db.ref(
        `savingThrows/${this.characterId}/${score}`
      ).update(update)
      const savingThrows = {...this.characterSaves}
      savingThrows[score][field] = value
      this.$store.commit('update_character_field', {
        field: 'savingThrows',
        value: savingThrows
      })
    }
  }
}
</script>

<style scoped lang="scss">
.stat-name {
  text-transform: capitalize;
}
</style>
