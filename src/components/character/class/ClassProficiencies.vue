<template>
  <div>
    <v-card flat class="mb-1">
      <v-card-text>
        <v-container grid-list-md>
          <v-layout row wrap>

            <v-flex xs12 md6>
              <v-select
                label="Armor"
                :value="armor"
                tags
                chips
                deletable-chips
                @input="handleInput('armor', $event)"
              />
            </v-flex>

            <v-flex xs12 md6>
              <v-select
                label="Weapons"
                :value="weapons"
                tags
                chips
                deletable-chips
                @input="handleInput('weapons', $event)"
              />
            </v-flex>

            <v-flex xs12 md6>
              <v-select
                label="Tools"
                :value="tools"
                tags
                chips
                deletable-chips
                @input="handleInput('tools', $event)"
              />
            </v-flex>

            <v-flex xs12 md6>
              <v-select
                label="Languages"
                :value="languages"
                tags
                chips
                deletable-chips
                @input="handleInput('languages', $event)"
              />
            </v-flex>

            <v-flex xs12 md6>
              <v-select
                label="Skills"
                :value="skills"
                tags
                chips
                deletable-chips
                @input="handleInput('skills', $event)"
              />
            </v-flex>

            <v-flex xs12 md6>
              <v-select
                label="Other"
                :value="other"
                tags
                chips
                deletable-chips
                @input="handleInput('other', $event)"
              />
            </v-flex>

            <!-- <v-flex xs12 md6>
              <v-select
                label="Weapons"
                v-model="armor"
                tags
                chips
                deletable-chips
              />
            </v-flex>

            <v-flex xs12 md6>
              <v-select
                label="Tools"
                v-model="armor"
                tags
                chips
                deletable-chips
              />
            </v-flex>

            <v-flex xs12 md6>
              <v-select
                label="Saving Throws"
                v-model="armor"
                tags
                chips
                deletable-chips
              />
            </v-flex>

            <v-flex xs12 md6>
              <v-select
                label="Languages"
                v-model="armor"
                tags
                chips
                deletable-chips
              />
            </v-flex>

            <v-flex xs12 md6>
              <v-select
                label="Skills"
                v-model="armor"
                tags
                chips
                deletable-chips
              />
            </v-flex>

            <v-flex xs12 md6>
              <v-select
                label="Other"
                v-model="armor"
                tags
                chips
                deletable-chips
              />
            </v-flex> -->
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
/**
 * <class-summary></class-summary>
 * @desc A character's class and optional multiclasses
 */
// import classes from '../../../mixins/game-data/classes'
// import character from '../../../mixins/character'
// import CustomSelect from '../../inputs/CustomSelect'

export default {
  // Name
  name: 'class-proficiencies',

  data () {
    return {
      // armor: undefined
    }
  },

  computed: {
    user () {
      return this.$store.state.user
    },

    characterId () {
      return this.$store.state.characterId
    },

    proficiencies () {
      return this.$store.state.character
        ? this.$store.state.character.proficiencies
        : undefined
    },

    armor () {
      return this.proficiencies.armor.split(',')
        .filter((item) => item !== '')
    },

    weapons () {
      return this.proficiencies.weapons.split(',')
        .filter((item) => item !== '')
    },

    tools () {
      return this.proficiencies.tools.split(',')
        .filter((item) => item !== '')
    },

    skills () {
      return this.proficiencies.skills.split(',')
        .filter((item) => item !== '')
    },

    languages () {
      return this.proficiencies.languages.split(',')
        .filter((item) => item !== '')
    },

    other () {
      return this.proficiencies.other.split(',')
        .filter((item) => item !== '')
    }

  },

  methods: {
    handleInput (field, value) {
      const proficiencies = this.proficiencies
      proficiencies[field] = value.join(',')
      this.$store.commit('update_character_field', {
        field: 'proficiencies',
        value: proficiencies
      })
      this.updateProficiency(field, value)
    },

    updateProficiency (field, value) {
      const update = {}
      update[field] = value.join(',')

      this.$db.ref(
        `/characters/${this.user.uid}/${this.characterId}/proficiencies`
      ).update(update)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
