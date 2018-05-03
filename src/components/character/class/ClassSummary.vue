<template>
  <div>
    <!-- Primary Class Card -->
    <v-card flat>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout row wrap>
            <!-- Primary Class Name -->
            <v-flex xs12 md6>
              <custom-select
                label="Class"
                :value="primaryClass.name"
                :items="classes"
                item-text="name"
                item-value="name"
                :custom="primaryClass.custom.name"
                @input="updateClass(primaryClassId, 'name', $event)"
                @customize="customizeClass(primaryClassId, 'name', !primaryClass.custom.name)"
              />
            </v-flex>

            <!-- Primary Class Subclass -->
            <v-flex xs12 md6>
              <custom-select
                :disabled="!primaryClass.name"
                :label="getSubclassLabel(primaryClass.name) || 'Subclass'"
                :value="primaryClass.subclass"
                :items="getSubclassOptions(primaryClass.name)"
                item-value="title"
                item-text="title"
                :custom="primaryClass.custom.subclass"
                @input="updateClass(primaryClassId, 'subclass', $event)"
                @customize="customizeClass(primaryClassId, 'subclass', !primaryClass.custom.subclass)"
              />
            </v-flex>

            <v-flex xs12 v-if="character.enableMulticlass">
              <v-text-field
                label="Class Level"
                type="number"
                :value="primaryClass.level"
                @input="updateClass(primaryClassId, 'level', $event)"
              />
            </v-flex>

            <!-- Enable Multiclass Switch -->
            <v-flex xs12 md6>
              <v-switch
                color="accent"
                label="Enable Multiclass"
                :input-value="character.enableMulticlass"
                :true-value="true"
                :false-value="false"
                @change="updateCharacter('enableMulticlass', $event)"
              ></v-switch>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>

    <v-divider/>

    <!-- Enable Multiclass -->
    <v-card
      v-if="character.enableMulticlass"
      flat
    >
      <v-card-title class="title ml-1">
        Multiclass
      </v-card-title>

      <div
        v-for="(classObject, key, index) in multiclassArray"
        :key="index"
      >
        <v-card-text>
          <v-container grid-list-md>
            <v-layout row wrap>
              <!-- Multiclass Name-->
              <v-flex xs12 md6>
                <custom-select
                  label="Class"
                  :value="classObject.name"
                  :items="classes"
                  item-text="name"
                  item-value="name"
                  :custom="classObject.custom.name"
                  @input="updateClass(key, 'name', $event)"
                  @customize="customizeClass(index, 'name', !classObject.custom.name)"
                />
              </v-flex>

              <!-- Multiclass Subclass -->
              <v-flex xs12 md6>
                <custom-select
                  :label="getSubclassLabel(classObject.name) || 'Subclass'"
                  :value="classObject.subclass"
                  :items="getSubclassOptions(classObject.name)"
                  item-text="title"
                  item-value="title"
                  :custom="classObject.custom.subclass"
                  @input="updateClass(key, 'subclass', $event)"
                  @customize="customizeClass(index, 'subclass', !classObject.custom.subclass)"
                />
              </v-flex>

              <v-flex xs12>
                <v-text-field
                  label="Class Level"
                  type="number"
                  :value="classObject.custom.level"
                  @input="updateClass(key, 'level', $event)"
                />
              </v-flex>

              <!-- Multiclass Delete -->
              <v-flex class="pa-0">
                <v-btn
                  outline
                  color="warning"
                  class="ma-0"
                  @click="removeClass(key)"
                >
                  <v-icon>delete</v-icon>
                  delete
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-divider/>
      </div>

      <!-- Add Multiclass -->
      <v-btn
        depressed
        color="primary"
        class="ml-3"
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
  name: 'class-summary',

  // Components
  components: {
    CustomSelect
  },

  // Mixins
  mixins: [
    character,
    classes
  ],

  computed: {
    user () {
      return this.$store.state.user
    },

    characterClasses () {
      const classKey = Object.keys(this.character.classes)[0]
      return this.character
        ? this.character.classes[classKey]
        : {}
    },

    primaryClassId () {
      return this.character
        ? Object.keys(this.character.classes)[0]
        : {}
    },

    primaryClass () {
      return this.primaryClassId
        ? this.character.classes[this.primaryClassId]
        : {}
    },

    multiclassArray () {
      if (!this.character) return
      const classes = Object.assign({}, this.character.classes)
      delete classes[this.primaryClassId]
      return classes
    },

    classURL () {
      return `characters/${this.user.uid}/${this.characterId}/classes/`
    }
  },

  methods: {
    /**
     * Handle the customize event
     */
    customizeClass (id, field, value) {
      const update = {}
      update[field] = value
      this.$db.ref(`${this.classURL}/${id}/custom`)
        .update(update)
      this.$store.commit('customize_class', {
        id: id,
        field: field,
        value: value
      })
    },

    /**
     * Update the characters class
     */
    async updateClass (id, field, value) {
      try {
        const update = {}
        update[field] = value
        this.$db
          .ref(`${this.classURL}/${id}`)
          .update(update)
      } catch (error) {

      } finally {
        const classes = this.character.classes
        classes[id][field] = value
        this.$store.commit('update_character_field', {
          field: 'classes',
          value: classes
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
