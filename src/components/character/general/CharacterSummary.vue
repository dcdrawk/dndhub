<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        <v-text-field
          label="Character Name"
          type="text"
          required
          :value="character.name"
          v-validate="'required'"
          data-vv-name="name"
          :error-messages="errors.collect('name')"
          @input="updateCharacter('name', $event)"
        />
      </v-flex>

      <v-flex xs6 class="pr-1">
        <v-text-field
          label="Level"
          type="number"
          required
          :value="character.level"
          v-validate="'required'"
          data-vv-name="level"
          :error-messages="errors.collect('level')"
          @input="updateCharacter('level', $event)"
        />
      </v-flex>

      <v-flex xs6 class="pl-2">
        <v-text-field
          label="Experience"
          type="number"
          required
          :value="character.experience"
          v-validate="'required'"
          data-vv-name="experience"
          :error-messages="errors.collect('experience')"
          @input="updateCharacter('experience', $event)"
        />
      </v-flex>

      <v-flex xs12 md6>
        <custom-select
          label="Race"
          :value="character.race"
          :items="races"
          item-text="name"
          item-value="name"
          :custom="character.custom.race"
          @input="updateCharacter('race', $event)"
          @customize="customizeCharacter('race', !character.custom.race)"
        />
      </v-flex>

      <v-flex xs12 md6>
        <custom-select
          :disabled="!character.race"
          label="Subrace"
          :value="character.subrace"
          :items="subraces"
          item-text="name"
          item-value="name"
          :custom="character.custom.subrace"
          @input="updateCharacter('subrace', $event)"
          @customize="customizeCharacter('subrace', !character.custom.subrace)"
        />
      </v-flex>

      <v-flex xs12 md6>
        <custom-select
          label="Class"
          :value="character.class"
          :items="classes"
          item-text="name"
          item-value="name"
          :custom="character.custom.class"
          @input="updateCharacter('class', $event)"
          @customize="customizeCharacter('class', !character.custom.class)"
        />
      </v-flex>

      <v-flex xs12 md6>
        <custom-select
          :disabled="!character.class"
          :label="subclassLabel || 'Subclass'"
          :value="character.subclass"
          :items="subclassOptions"
          item-text="title"
          item-value="title"
          :custom="character.custom.subclass"
          @input="updateCharacter('subclass', $event)"
          @customize="customizeCharacter('subclass', !character.custom.subclass)"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
/**
 * <general></general>
 * @desc A character's general / basic info
 */
import classes from '../../../mixins/game-data/classes'
import races from '../../../mixins/game-data/races'
import validation from '../../../mixins/validation'
import character from '../../../mixins/character'
import CustomSelect from '../../inputs/CustomSelect'

export default {
  // Name
  name: 'character-summary',

  // Components
  components: {
    CustomSelect
  },

  // Mixins
  mixins: [
    character,
    classes,
    races,
    validation
  ]
}
</script>

<style scoped lang="scss">
</style>
