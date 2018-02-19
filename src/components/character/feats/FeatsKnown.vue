<template>
  <div v-if="filteredItems">
    <search-bar
      v-model="search"
      :items="filteredItems"
    />

    <!-- Character List -->
    <v-list
      v-if="filteredItems.length > 0"
      two-line
      dense
      class="elevation-1"
    >
      <!-- Traits List -->
      <v-list-tile
        v-for="(item, key) in filteredItems"
        :key="key"
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
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

    <feats-dialog
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
  name: 'feats-known',

  // Components
  components: {
    FeatsDialog,
    SearchBar
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
      search: undefined,
      newItem: false,
      items: undefined,
      selectedItem: undefined,
      showDialog: false
    }
  },

  // Computed
  computed: {
    filteredItems () {
      if (!this.items) return
      const array = this.items.filter((item) => {
        return this.search
          ? item.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1
          : true
      }).sort((a, b) => {
        if (a.name < b.name) return -1
        if (a.name > b.name) return 1
        return 0
      })
      return array
    }
  },

  // Methods
  methods: {
    /**
     * Get Items
     * retrieve the list of items
     */
    getItems () {
      this.$db.ref(
        `${this.endpoint}/${this.characterId}`
      ).on('value', (snapshot) => {
        const value = snapshot.val()

        const items = Object.values(value || [])
          .map((item, index) => {
            item.id = Object.keys(snapshot.val())[index]
            return item
          })
        this.items = items
      })
    },

    /**
     * Adds the item to firebase
     * @param {Object} - item
     */
    addItem (item) {
      console.log('feats known add item...')
      this.$db.ref(`${this.endpoint}/${this.characterId}`)
        .push(item)
      this.$bus.$emit('toast', `Added the ${item.name} Feat`)
    },

    /**
     * Adds the item from the dialog
     * @param {Object} - item
     */
    handleAddItem (item) {
      console.log('known add item')
      this.addItem(item)
      this.showDialog = false
    },

    /**
     * Handle Show Dialog
     * Select the feature and show the dialog
     * @param {Object} feature
     */
    handleShowDialog (feature) {
      this.selectedItem = feature
      this.newItem = false
      this.showDialog = true
    }
  },

  // Created
  created () {
    this.getItems()
    // Listen for events from the parent component
    this.$bus.$on(this.dialogEvent, () => {
      this.selectedItem = {...this.defaultItem}
      this.newItem = true
      this.showDialog = true
    })
  }
}
</script>

<style scoped lang="scss">
.tab-content {
  min-height: 100vh;
}
</style>
