<template>
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

    <v-flex xs12>
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

    <v-flex xs12>
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

    <v-flex xs12>
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

    <v-flex xs12>
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

    <v-flex xs12>
      <custom-select
        label="Alignment"
        :value="character.alignment"
        :items="alignments"
        item-text="name"
        item-value="name"
        :custom="character.custom.alignment"
        @input="updateCharacter('alignment', $event)"
        @customize="customizeCharacter('alignment', !character.custom.alignment)"
      />
    </v-flex>

    <v-flex xs12>
      <custom-select
        label="Background"
        :value="character.background"
        :items="backgrounds"
        item-text="name"
        item-value="name"
        :custom="character.custom.background"
        @input="updateCharacter('background', $event)"
        @customize="customizeCharacter('background', !character.custom.background)"
      />
    </v-flex>
  </v-layout>
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
  name: 'general',

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
  ],

  // Computed
  computed: {
    alignments () {
      return this.$store.state.gameData.alignments
    },
    backgrounds () {
      return this.$store.state.gameData.backgrounds
    }
  }
}
</script>

<style scoped lang="scss">
</style>
