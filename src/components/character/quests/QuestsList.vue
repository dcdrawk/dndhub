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

    <!-- Weapons List -->
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
              <v-icon
                v-if="item.completed"
                color="green"
                class="ml-0"
              >
                check_circle
              </v-icon>
            </v-list-item-title>
            <!-- AC -->
            <v-list-item-subtitle>
              Summary: {{ item.summary || 'N/A' }}
            </v-list-item-subtitle>
          </v-list-item-content>

          <!-- Feat Add -->
          <v-list-item-action v-if="browse">
            <v-btn
              icon
              color="accent"
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

    <QuestsDialog
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
 * <weapons-list></weapons-list>
 * @desc A list of weapons
 */
import character from '../../../mixins/character'
import QuestsDialog from './QuestsDialog'
import SearchBar from '../../inputs/SearchBar'

export default {
  // Name
  name: 'QuestList',

  // Components
  components: {
    QuestsDialog,
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
    browse: Boolean,
    active: Boolean,
    showCompleted: {
      type: Boolean,
      default: false
    }
  },

  // Data
  data () {
    return {
      endpoint: 'quests',
      dialogEvent: 'new-quest',
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
        return this.showCompleted ? item.completed === true : !item.completed
      }).filter((item) => {
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
      if (this.active) return
      // this.newItem = true
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
      console.log('weapons known add item...')
      console.log(`${this.endpoint}/${this.characterId}`)
      this.$db.ref(`${this.endpoint}/${this.characterId}`)
        .push(item)
      this.$bus.$emit('toast', `Added ${item.name} to Weapons`)
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
  // opacity: .54;
  // color: rgba(0,0,0,.54);
  text-align: right;
}
</style>
