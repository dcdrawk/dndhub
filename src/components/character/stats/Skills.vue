<template>
  <div>
    <v-card v-if="characterSkills && characterScores">
      <v-card-text class="pa-0">
        <v-container grid-list-sm class="pa-0">
          <v-layout row wrap class="mb-2 pa-2">
            <v-flex xs6>
              <strong>Stat</strong>
            </v-flex>
            <v-flex xs2>
              <strong>Prof.</strong>
            </v-flex>
            <v-flex xs2>
              <strong>Bonus</strong>
            </v-flex>
            <v-flex xs2>
              <strong>Modifier</strong>
            </v-flex>
          </v-layout>

          <v-layout
            v-for="(item, index) in skills"
            :key="index"
            class="pa-2 skill"
          >
            <v-flex xs6 class="pt-2">
              <span class="stat-name">
                {{ item.name.replace(/_/g, ' ') }}
              </span>
            </v-flex>
            <v-flex xs2>
              <v-checkbox
                hide-details
                color="secondary"
                :input-value="characterSkills[item.name].proficient"
                :true-value="true"
                :false-value="false"
                @change="updateSkill(item.name, 'proficient', $event)"
              />
            </v-flex>
            <v-flex xs2>
              <v-text-field
                type="number"
                class="pt-0"
                hide-details
                :value="characterSkills[item.name].bonus"
                @input="updateSkill(item.name, 'bonus', $event)"
              />
            </v-flex>
            <v-flex xs2>
              <v-text-field
                type="number"
                class="pt-0"
                hide-details
                disabled
                :value="getSkillModifier(item)"
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
 * <skills></skills>
 * @desc A character's skills
 */
import proficiencyBonus from '../../../mixins/proficiencyBonus'
import character from '../../../mixins/character'
import skills from '../../../mixins/skills'

export default {
  // Name
  name: 'skills',

  // Mixins
  mixins: [
    character,
    skills,
    proficiencyBonus
  ],

  // Computed
  computed: {
    characterSkills () {
      if (!this.character) return
      return this.$store.state.character.skills
    },
    characterScores () {
      if (!this.character) return
      return this.$store.state.character.abilityScores
    }
  },

  // Watch
  watch: {
    character: {
      immediate: true,
      handler (newVal, oldVal) {
        if (newVal) {
          if (!this.characterSkills) this.getSkills()
        }
      }
    }
  },

  // Methods
  methods: {
    /**
     * Get Skills
     * get a list of skills from firebase, store in Vuex
     */
    async getSkills () {
      try {
        const snapshot = await this.$db.ref(
          `skills/${this.characterId}`
        ).once('value')
        this.$store.commit('update_character_field', {
          field: 'skills',
          value: snapshot.val()
        })
      } catch (error) {
        console.warn(error)
      }
    },

    /**
     * Get Ability Modifier
     * @returns {Number} - ability score mod
     */
    getSkillModifier (item) {
      let score = this.getAbilityModifier(item.abilityScore)
      score += +this.characterSkills[item.name].bonus || 0
      if (this.characterSkills[item.name].proficient) {
        score += this.proficiencyBonus
      }
      return score
    },

    /**
     * Update Ability Score
     * Update firebase and the store
     */
    updateSkill (skill, field, value) {
      const update = {}
      update[field] = value
      this.$db.ref(
        `skills/${this.characterId}/${skill}`
      ).update(update)
      const skills = {...this.characterSkills}
      skills[skill][field] = value
      this.$store.commit('update_character_field', {
        field: 'skills',
        value: skills
      })
    },

    getAbilityModifier (item) {
      const base = +this.characterScores[item].base || 0
      const bonus = +this.characterScores[item].bonus || 0
      const total = base + bonus
      return Math.floor((parseInt(total || 0, 0) / 2 - 5))
    }
  }
}
</script>

<style scoped lang="scss">
.stat-name {
  text-transform: capitalize;
}
.skill {
  &:nth-child(odd) {
    background-color: rgba(255, 255, 255, .1);
  }
}
</style>
