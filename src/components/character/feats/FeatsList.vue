<template>
  <div v-if="filteredItems">
    <search-bar
      v-model="search"
    />

    <p
      v-if="filteredItems.length === 0"
      class="py-3 text-center"
    >
      No Items Found
    </p>

    <!-- Feats List -->
    <v-list
      v-if="filteredItems.length > 0"
      two-line
      dense
      class="elevation-1"
    >
      <template v-for="(item, index) in filteredItems">
        <!-- List Tile -->
        <v-list-item
          :key="item.title"
          class="list-tile"
          @click="handleShowDialog(item)"
        >
          <!-- Content -->
          <v-list-item-content>
            <!-- Name -->
            <v-list-item-title>
              {{ item.name }}
            </v-list-item-title>
            <!-- AC -->
            <v-list-item-subtitle>
              {{ item.description }}
            </v-list-item-subtitle>
          </v-list-item-content>

          <!-- Feat Add -->
          <v-list-item-action v-if="browse">
            <v-btn
              icon
              color="secondary"
              @click.stop="addItem(item)"
            >
              <v-icon>add</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-divider
          v-if="index < filteredItems.length - 1"
          :key="`${index}-divider`"
        />
      </template>
    </v-list>

    <feats-dialog
      :browse="browse"
      :show-dialog="showDialog"
      :item="selectedItem"
      :new-item="newItem"
      @add-item="handleAddItem($event)"
      @close="showDialog = false"
    />
  </div>
</template>

<script>
/**
 * <feats-known></feats-known>
 * @desc A character's known feats
 */
import character from '../../../mixins/character'
import FeatsDialog from './FeatsDialog'
import SearchBar from '../../inputs/SearchBar'

export default {
  // Name
  name: 'FeatsTable',

  // Components
  components: {
    FeatsDialog,
    SearchBar
  },

  // Mixins
  mixins: [
    character
  ],

  // Props
  props: {
    items: {
      type: Array,
      default: () => []
    },
    browse: Boolean
  },

  // Data
  data () {
    return {
      endpoint: 'feats',
      dialogEvent: 'new-feat',
      selectedItem: undefined,
      newItem: false,
      showDialog: false,
      search: undefined
    }
  },

  // Computed
  computed: {
    filteredItems () {
      const array = this.items
      return array.filter((item) => {
        return this.search
          ? item.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1
          : true
      }).sort((a, b) => {
        if (a.name < b.name) return -1
        if (a.name > b.name) return 1
        return 0
      })
    }
  },

  // Created
  created () {
    // Listen for events from the parent component
    this.$bus.$on(this.dialogEvent, () => {
      if (this.browse) return
      this.handleShowDialog()
    })
  },

  destroyed () {
    this.$bus.$off(this.dialogEvent)
  },

  // Methods
  methods: {
    /**
     * Adds the item to firebase
     * @param {Object} - item
     */
    addItem (item) {
      this.$db.ref(`${this.endpoint}/${this.characterId}`)
        .push(item)
      this.$bus.$emit('toast', `Added the ${item.name} Feats`)
    },

    /**
     * Adds the item from the dialog
     * @param {Object} - item
     */
    handleAddItem (item) {
      this.addItem(item)
      this.showDialog = false
    },

    /**
     * Handle Show Dialog
     * Select the feature and show the dialog
     * @param {Object} feature
     */
    handleShowDialog (feature) {
      console.log(feature)
      if (this.showDialog) {
      } else {
        this.showDialog = true
        this.selectedItem = feature || {}
        this.newItem = typeof feature === 'undefined'
      }
    }
  }
}
</script>

<style scoped lang="scss">
.right-text {
  color: rgba(0,0,0,.54);
  text-align: right;
}
</style>
