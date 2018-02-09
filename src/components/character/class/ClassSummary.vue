<template>
  <div>
    <v-card flat>
      <v-card-text>
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
                item-value="title"
                :custom="character.custom.subclass"
                @input="updateCharacter('subclass', $event)"
                @customize="customizeCharacter('subclass', !character.custom.subclass)"
              />
            </v-flex>

            <v-flex xs12 md6>
              <v-checkbox
                color="secondary"
                label="Enable Multiclass"
                :true-value="true"
                :false-value="false"
                :input-value="character.enableMulticlass"
                @change="updateCharacter('enableMulticlass', $event)"
              />
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>

    <v-divider/>

    <v-card
      v-if="character.enableMulticlass"
      flat
    >
      <v-card-title class="title">
        Multiclass
      </v-card-title>

      <v-card-text
        v-for="(classObject, index) in character.multiclass"
        :key="index"
      >
        <v-container grid-list-md>
          <v-layout row wrap>

            <v-flex xs12 md6>
              <custom-select
                label="Class"
                :value="classObject.name"
                :items="classes"
                item-text="name"
                item-value="name"
                :custom="character.custom.multiclass[index].class"
                @input="updateMulticlass(index, 'class', $event)"
                @customize="customizeMulticlass(index, 'class', !character.custom.multiclass[index].class)"
              />
              {{ character.multiclass[index].name }}
            </v-flex>

            <!-- <v-flex xs12 md6>
              <custom-select
                :disabled="!character.class"
                :label="subclassLabel || 'Subclass'"
                :value="character.subclass"
                :items="subclassOptions"
                item-value="title"
                :custom="character.custom.subclass"
                @input="updateCharacter('subclass', $event)"
                @customize="customizeCharacter('subclass', !character.custom.subclass)"
              />
            </v-flex> -->
          </v-layout>
        </v-container>
      </v-card-text>

      <v-btn
        flat
        @click="addMulticlass()"
      >
        Add Multiclass
      </v-btn>
    </v-card>
  </div>
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
