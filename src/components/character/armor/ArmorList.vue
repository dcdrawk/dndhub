<template>
  <div v-if="filteredItems">
    <search-bar
      v-model="search"
    />

    <p
      v-if="filteredItems.length === 0"
      class="pt-3 text-xs-center"
    >
      No Items Found
    </p>

    <!-- Armor List -->
    <v-list
      v-if="filteredItems.length > 0"
      two-line
      dense
      class="elevation-1"
    >
      <template v-for="(item, index) in filteredItems">
        <!-- List Tile -->
        <v-list-item
          class="list-tile"
          :key="item.title"
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
              AC: {{ item.ac }}
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-content>
            <!-- Trait Name -->
            <v-list-item-title class="right-text">
              Type: {{ item.armorType }}
            </v-list-item-title>
            <!-- Character Details -->
            <v-list-item-subtitle class="right-text">
              Weight: {{ item.weight }}
              <!-- Cost: {{ item.cost }} -->
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
        ></v-divider>
      </template>
    </v-list>

    <armor-dialog
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
 * <armor-list></armor-list>
 * @desc A list of armor
 */
import character from '../../../mixins/character'
import ArmorDialog from './ArmorDialog'
import SearchBar from '../../inputs/SearchBar'

export default {
  // Name
  name: 'ArmorList',

  // Components
  components: {
    ArmorDialog,
    SearchBar
  },

  // Mixins
  mixins: [
    character
  ],

  // Data
  data () {
    return {
      endpoint: 'armor',
      dialogEvent: 'new-armor',
      tableHeaders: [
        {
          text: 'Name',
          align: 'left',
          value: 'name'
        },
        { text: 'AC',
          value: 'ac',
          align: 'right'
        },
        { text: 'test',
          value: 'ac',
          align: 'right'
        },
        { text: 'test',
          value: 'ac',
          align: 'right'
        }
      ],
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

  // Props
  props: {
    items: Array,
    browse: Boolean
  },

  // Methods
  methods: {
    /**
     * Adds the item to firebase
     * @param {Object} - item
     */
    addItem (item) {
      console.log('armor known add item...')
      console.log(`${this.endpoint}/${this.characterId}`)
      this.$db.ref(`${this.endpoint}/${this.characterId}`)
        .push(item)
      this.$bus.$emit('toast', `Added the ${item.name} Armor`)
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
  },

  // Created
  created () {
    // Listen for events from the parent component
    this.$bus.$on(this.dialogEvent, () => {
      if (this.browse) return
      // this.newItem = true
      this.handleShowDialog()
    })
  },

  destroyed () {
    this.$bus.$off(this.dialogEvent)
  }
}
</script>

<style scoped lang="scss">
.right-text {
  // color: rgba(0,0,0,.54);
  // opacity: .5;
  text-align: right;
}
</style>
