<template>
  <div>
    <v-card flat class="mb-1">
      <v-card-text>
        <v-container grid-list-md>
          <v-layout row wrap>

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
              <!-- {{ primaryClass }} -->
            </v-flex>

            <v-flex xs12 md6>
              <custom-select
                :disabled="!primaryClass.name"
                :label="getSubclassLabel(primaryClass.name) || 'Subclass'"
                :value="character.subclass"
                :items="getSubclassOptions(primaryClass.name)"
                item-value="title"
                item-text="title"
                :custom="primaryClass.custom.subclass"
                @input="updateClass(primaryClassId, 'subclass', $event)"
                @customize="customizeClass(primaryClassId, 'subclass', !primaryClass.custom.subclass)"
              />
            </v-flex>

            <!-- {{ getSubclassOptions(primaryClass.name) }} -->

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

    <!-- <v-divider/> -->

    <v-card
      v-if="character.enableMulticlass"
      flat
    >
      <v-card-title class="title">
        Multiclass
      </v-card-title>

      <div
        v-for="(classObject, key, index) in multiclassArray"
        :key="index"
      >

      <v-card-text>
        <v-container grid-list-md>
          <v-layout row wrap>

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

            <v-flex>
              <v-btn
                flat
                icon
                class="ma-0"
                @click="removeClass(key)"
              >
                <v-icon>
                  delete
                </v-icon>
              </v-btn>
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
        <v-divider/>
      </div>

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
      console.log(classes[this.primaryClassId])
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
      this.$db.ref(`${this.classURL}/custom`)
        .update(update)
      this.$store.commit('customize_class', {
        id: id,
        field: field,
        value: value
      })
    },

    // removeClass (id) {

    // },

    async updateClass (id, field, value) {
      try {
        const update = {}
        update[field] = value
        this.$db
          .ref(this.classURL)
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
