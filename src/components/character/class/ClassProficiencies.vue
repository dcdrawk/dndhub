<template>
  <div>
    <v-card
      flat
      class="mb-1">
      <v-card-text>
        <v-container
          grid-list-md
          class="pa-0">
          <v-layout
            row
            wrap>
            <v-flex
              xs12
              md6>
              <v-combobox
                multiple
                label="Armor"
                :value="armor"
                chips
                deletable-chips
                @input="handleInput('armor', $event)"
              />
            </v-flex>

            <v-flex
              xs12
              md6>
              <v-combobox
                multiple
                label="Weapons"
                :value="weapons"
                chips
                deletable-chips
                @input="handleInput('weapons', $event)"
              />
            </v-flex>

            <v-flex
              xs12
              md6>
              <v-combobox
                label="Tools"
                :value="tools"
                multiple
                chips
                deletable-chips
                @input="handleInput('tools', $event)"
              />
            </v-flex>

            <v-flex
              xs12
              md6>
              <v-combobox
                label="Languages"
                :value="languages"
                multiple
                chips
                deletable-chips
                @input="handleInput('languages', $event)"
              />
            </v-flex>

            <v-flex
              xs12
              md6>
              <v-combobox
                label="Skills"
                :value="skills"
                multiple
                chips
                deletable-chips
                @input="handleInput('skills', $event)"
              />
            </v-flex>

            <v-flex
              xs12
              md6>
              <v-combobox
                label="Other"
                :value="other"
                multiple
                chips
                deletable-chips
                @input="handleInput('other', $event)"
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
 * <class-proficiencies></class-proficiencies>
 * @desc A character's class proficiencies
 */

export default {
  // Name
  name: 'ClassProficiencies',

  // Computed
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

  // Methods
  methods: {
    /**
     * Handle Input
     */
    handleInput (field, value) {
      const proficiencies = this.proficiencies
      proficiencies[field] = value.join(',')
      this.$store.commit('update_character_field', {
        field: 'proficiencies',
        value: proficiencies
      })
      this.updateProficiency(field, value)
    },

    /**
     * Update Proficiency
     */
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
