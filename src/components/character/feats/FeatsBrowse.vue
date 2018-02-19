<template>
  <div>
    <!-- Character List -->
    <v-list
      v-if="items"
      two-line
      dense
      class="elevation-1"
    >
      <template v-for="(item, index) in items">
        <!-- Traits List -->
        <v-list-tile
          :key="item.title"
          @click="handleShowDialog(item)"
        >
          <!-- Content -->
          <v-list-tile-content>
            <!-- Trait Name -->
            <v-list-tile-title>
              {{ item.name }}
            </v-list-tile-title>

            <!-- Character Details -->
            <v-list-tile-sub-title>
              {{ item.description }}
            </v-list-tile-sub-title>

            <!-- Feat Add -->
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn
              icon
              @click.stop="addItem(item)"
            >
              <v-icon>add</v-icon>
            </v-btn>
            <!-- {{ item.name }} -->
          </v-list-tile-action>
        </v-list-tile>
        <v-divider :key="`${index}-divider`"></v-divider>
      </template>
    </v-list>

    <p
      v-else
      class="ma-4 text-xs-center"
    >
      No Known Feats
    </p>
    <feats-dialog
      :show-dialog="showDialog"
      :item="selectedItem"
      :browse="true"
      @add-item="handleAddItem()"
      @close="showDialog = false"
    />
  </div>
</template>

<script>
/**
 * <class-features></class-features>
 * @desc A character's class features
 */
import character from '../../../mixins/character'
import FeatsDialog from './FeatsDialog'

export default {
  // Name
  name: 'feats-browse',

  // Components
  components: {
    FeatsDialog
  },

  // Mixins
  mixins: [
    character
  ],

  // Data
  data () {
    return {
      endpoint: 'feats',
      dialogEvent: 'new-feat',
      defaultItem: {
        name: '',
        description: ''
      },
      selectedItem: undefined,
      showDialog: false
    }
  },

  // Computed
  computed: {
    items () {
      return this.$store.state.gameData.feats.map((item) => {
        return item
      })
    }
  },

  // Methods
  methods: {
    /**
     * Push the item to firebase
     * @param {Object] - item}
     */
    addItem (item) {
      this.$db.ref(`${this.endpoint}/${this.characterId}`)
        .push(item)
      this.$bus.$emit('toast', `Added the ${item.name} Feat`)
    },

    /**
     * Handing adding the item
     */
    handleAddItem () {
      this.addItem(this.selectedItem)
      this.showDialog = false
    },

    /**
     * Handle Show Dialog
     * Select the feature and show the dialog
     * @param {Object} feature
     */
    handleShowDialog (item) {
      this.selectedItem = item
      this.showDialog = true
    }
  }
}
</script>

<style scoped lang="scss">
.class-features {
  min-height: 100vh;
}
.source {
  opacity: 0.5;
}
</style>
