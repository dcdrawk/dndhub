<template>
  <v-container grid-list-md>
    <v-layout row wrap>

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
    <v-flex xs12 md6>
      <v-checkbox
        color="secondary"
        label="Enable Multiclass"
        :true-value="true"
        :false-value="false"
        :input-value="character.enableMulticlass"
        @change="updateCharacter('enableMulticlass', $event)"
      />
      {{ character.enableMulticlass }}
    </v-flex>
  </v-container>
</template>

<script>
/**
 * <class-summary></class-summary>
 * @desc A character's class and optional multiclasses
 */
import classes from '../../../mixins/game-data/classes'
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
    classes
  ]
}
</script>

<style scoped lang="scss">
</style>
