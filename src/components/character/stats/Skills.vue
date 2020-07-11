<template>
  <v-card>
    <v-card-text
      v-if="characterSkills && characterScores"
      class="px-1"
    >
      <div class="px-2">
        <v-select
          v-model="sortBy"
          label="Sort By"
          :items="soryByOptions"
          prepend-inner-icon="mdi-sort"
          color="secondary"
          outlined
          dense
        />
      </div>
      <v-row
        wrap
        dense
        class=""
      >
        <v-col
          cols="4"
          class="pl-3"
        >
          <strong>Stat</strong>
        </v-col>
        <v-col cols="2">
          <strong>Prof.</strong>
        </v-col>
        <v-col cols="3">
          <strong>Bonus</strong>
        </v-col>
        <v-col cols="3">
          <strong>Total</strong>
        </v-col>
      </v-row>

      <v-row
        v-for="(item, index) in sortedSkills"
        :key="index"
        class="skill align-center"
        wrap
        dense
      >
        <v-col
          cols="12"
          class="pa-0"
        >
          <v-divider class="ma-0 pa-0" />
        </v-col>
        <v-col
          cols="4"
          class="pl-3 pr-0"
        >
          <span class="skill__name">
            {{ item.name.replace(/_/g, ' ') }}
          </span>
          <div class="score caption">
            ({{ item.abilityScore.slice(0, 3) }})
          </div>
        </v-col>
        <v-col
          cols="2"
          class="pt-0 pb-2"
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
        </v-col>
        <v-col
          cols="3"
          class="pl-0"
        >
          <v-text-field
            type="number"
            hide-details
            filled
            dense
            :value="characterSkills[item.name].bonus"
            @input="updateSkill(item.name, 'bonus', $event)"
          />
        </v-col>
        <v-col
          cols="3"
          class="pl-0"
        >
          <v-text-field
            type="number"
            hide-details
            disabled
            outlined
            dense
            :prefix="getSkillPrefix(item)"
            :value="getSkillModifier(item)"
          />
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-text
      v-else
      height="500"
    >
      Loading...
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
import defaultSkills from '@/models/stats/skills'
import abilityScores from '../../../mixins/abilityScores'

export default {
  // Name
  name: 'Skills',

  // Mixins
  mixins: [
    abilityScores,
    character,
    skills,
    proficiencyBonus
  ],

  // Data
  data () {
    return {
      fetchedAbilityScores: false,
      fetchedSkills: false,
      sortBy: 'alhpa',
      soryByOptions: [{
        text: 'Alphabetical',
        value: 'alhpa'
      }, {
        text: 'Ability Score',
        value: 'ability'
      }]
    }
  },

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
      switch (this.sortBy) {
        case ('ability'):
          return value
            .sort((a, b) => (a.name > b.name) ? 1 : -1)
            .sort((a, b) => (a.abilityScore > b.abilityScore) ? 1 : -1)
        case ('alpha'):
        default:
          return value.sort((a, b) => (a.name > b.name) ? 1 : -1)
      }
    }
  },

  // Watch
  watch: {
    character: {
      immediate: true,
      handler (newVal, oldVal) {
        if (newVal) {
          if (!this.characterScores && !this.fetchedAbilityScores) {
            this.fetchedAbilityScores = true
            this.getAbilityScores()
          }

          if (!this.characterSkills && !this.fetchedSkills) {
            this.fetchedSkills = true
            this.getSkills()
          }
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
        console.log('Get skillzzz')
        console.log(snapshot.val())
        console.log(defaultSkills)
        this.$store.commit('update_character_field', {
          field: 'skills',
          value: snapshot.val() || defaultSkills
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
      if (!this.characterScores[item]) {
        console.log(item)
      }
      const base = +this.characterScores[item].base || 0
      const bonus = +this.characterScores[item].bonus || 0
      const total = base + bonus
      return Math.floor((parseInt(total || 0, 0) / 2 - 5))
    },

    getSkillPrefix (item) {
      return this.getSkillModifier(item) > 0 ? '+' : ''
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
