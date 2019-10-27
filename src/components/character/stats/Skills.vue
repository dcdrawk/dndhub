<template>
  <v-card v-if="characterSkills && characterScores">
    <v-card-text class="pa-0">
      <v-container
        grid-list-sm
        class="pa-0"
      >
        <v-layout
          row
          wrap
          class="mb-0 pa-2 pl-3"
        >
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
            <strong>Mod.</strong>
          </v-flex>
        </v-layout>

        <v-divider />

        <v-layout
          v-for="(item, index) in sortedSkills"
          :key="index"
          class="pa-0 pr-0 skill"
          wrap
        >
          <v-flex
            xs12
            class="pa-0"
          >
            <v-divider class="ma-0 pa-0" />
          </v-flex>
          <v-flex
            xs6
            class="pl-3 pr-0 pt-2"
          >
            <span class="skill__name">
              {{ item.name.replace(/_/g, ' ') }}
            </span>
            <span class="score">
              ({{ item.abilityScore.slice(0, 3) }})
            </span>
          </v-flex>
          <v-flex
            xs2
            class="pt-0"
          >
            <v-checkbox
              class="skill__checkbox mt-1"
              hide-details
              color="secondary"
              :input-value="characterSkills[item.name].proficient"
              :true-value="true"
              :false-value="false"
              @change="updateSkill(item.name, 'proficient', $event)"
            />
          </v-flex>
          <v-flex
            xs2
            class="pt-0"
          >
            <v-text-field
              type="number"
              class="pt-0"
              hide-details
              :value="characterSkills[item.name].bonus"
              @input="updateSkill(item.name, 'bonus', $event)"
            />
          </v-flex>
          <v-flex
            xs2
            class="pt-0 pr-3"
          >
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
  name: 'Skills',

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
    },
    sortedSkills () {
      let value = [ ...this.skills ]
      return value.sort((a, b) => (a.name > b.name) ? 1 : -1)
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
     * Get Skill Modifier
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
     * Update Skill
     * Update firebase and the store
     */
    updateSkill (skill, field, value) {
      const update = {}
      update[field] = value
      this.$db.ref(
        `skills/${this.characterId}/${skill}`
      ).update(update)
      const skills = { ...this.characterSkills }
      skills[skill][field] = value
      this.$store.commit('update_character_field', {
        field: 'skills',
        value: skills
      })
    },

    /**
     * Get Ability Modifier
     * @returns {Number} - ability score mod
     */
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
// .stat-name {
//   text-transform: capitalize;
// }
.skill {
  overflow: hidden;
  &:nth-child(even) {
    background-color: rgba(0, 0, 0, 0.05);
  }
  &__checkbox {
    top: 4px;
  }
  &__name {
    text-transform: capitalize;
  }
}
.score {
  text-transform: capitalize;
  opacity: .5;
}
</style>
