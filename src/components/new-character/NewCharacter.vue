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
        test
      </v-card-text>

      <div style="flex: 1 1 auto;"/>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  // Name
  name: 'new-character',

  // Components
  components: {},

  // Mixins
  mixins: {},

  // Props
  props: {
    showDialog: Boolean
  },

  // Data
  // data () {
  // },

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
    myFunction () {
      return 'something'
    }
  }
}
</script>

<style scoped lang="scss">
</style>
