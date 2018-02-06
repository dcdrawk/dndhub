<template>
  <v-dialog
    :value="showDialog"
    fullscreen
    transition="dialog-bottom-transition"
    :overlay="false"
    scrollable
    @input="handleInput($event)"
  >
    <v-card tile>
      <!-- Dialog Toolbar -->
      <v-toolbar card dark color="primary">
        <!-- Close Button -->
        <v-btn
          icon
          dark
          @click.native="$emit('close')"
        >
          <v-icon>close</v-icon>
        </v-btn>

        <!-- Dialog Title -->
        <v-toolbar-title>
          Create New Character
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <!-- <v-toolbar-items>
          <v-btn dark flat @click.native="dialog = false">Save</v-btn>
        </v-toolbar-items> -->
        <!-- <v-menu bottom right offset-y>
          <v-btn slot="activator" dark icon>
            <v-icon>more_vert</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile v-for="(item, i) in items" :key="i" @click="test">
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu> -->
      </v-toolbar>
      <v-card-text>
        <v-container grid-list-md>

        <v-layout row wrap>
          <v-flex xs12>
            <v-text-field
              label="Character Name"
              type="number"
              required
              v-model="character.name"
              v-validate="'required'"
              data-vv-name="name"
              :error-messages="errors.collect('name')"
            />
          </v-flex>

          <v-flex xs6>
            <v-text-field
              label="Level"
              type="number"
              required
              v-model="character.level"
              v-validate="'required'"
              data-vv-name="level"
              :error-messages="errors.collect('level')"
            />
          </v-flex>

          <v-flex xs6>
            <v-text-field
              label="Experience"
              type="number"
              required
              v-model="character.experience"
              v-validate="'required'"
              data-vv-name="experience"
              :error-messages="errors.collect('experience')"
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
              @input="character.class = $event"
              @customize="handle_customize('class')"
            />
          </v-flex>

          <v-flex xs12>
            <custom-select
              v-if="character.class"
              :label="subclassLabel || 'Subclass'"
              :value="character.subclass"
              :items="subclassOptions"
              item-text="title"
              item-value="title"
              :custom="character.custom.subclass"
              @customize="handle_customize('subclass')"
            />
            <!-- <v-select
              v-if="character.class"
              :label="subclassLabel || 'Subclass'"
              v-model="character.subclass"
              :items="subclassOptions"
              item-text="title"
              item-value="title"
              bottom
            /> -->
          </v-flex>
        </v-layout>
        </v-container>
        <!-- test -->
      </v-card-text>

      <div style="flex: 1 1 auto;"/>
    </v-card>
  </v-dialog>
</template>

<script>
import classes from '../../mixins/classes'
import CustomSelect from '../inputs/CustomSelect'
export default {
  // Name
  name: 'new-character',

  // Components
  components: {
    CustomSelect
  },

  // Mixins
  mixins: [
    classes
  ],

  // Props
  props: {
    showDialog: Boolean

  },

  // Data
  data () {
    return {
      character: {
        name: undefined,
        experience: 0,
        level: 1,
        alignment: undefined,
        background: undefined,
        class: undefined,
        subclass: undefined,
        custom: {}
      // race: undefined,

      }
    }
  },

  // Computed
  computed: {
    computedProperty () {
      return 'something'
    }
  },

  // Watch
  watch: {
    watchProperty (newValue, oldValue) {
      return newValue
    }
  },

  // Methods
  methods: {
    handle_customize (field) {
      this.$set(
        this.character.custom,
        field,
        !this.character.custom[field]
      )
      // this.character.custom[field] = !this.character.custom[field]
    }
  }
}
</script>

<style scoped lang="scss">
</style>
