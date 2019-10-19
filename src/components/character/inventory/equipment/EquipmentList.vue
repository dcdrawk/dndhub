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
        <v-list-tile
          class="list-tile"
          :key="item.title"
          @click="handleShowDialog(item)"
        >
          <!-- Content -->
          <v-list-tile-content>
            <!-- Name -->
            <v-list-tile-title>
              {{ item.name }}
            </v-list-tile-title>
            <!-- AC -->
            <v-list-tile-sub-title>
              Quantity: {{ item.quantity }}
            </v-list-tile-sub-title>
          </v-list-tile-content>

          <v-list-tile-content>
            <!-- Trait Name -->
            <v-list-tile-title
              v-if="item.value"
              class="right-text"
            >
              Weight: {{ item.value }}
            </v-list-tile-title>
            <!-- Character Details -->
            <v-list-tile-sub-title
              v-if="item.value"
              class="right-text"
            >
              Value: {{ item.value }}
              <!-- Cost: {{ item.cost }} -->
            </v-list-tile-sub-title>
          </v-list-tile-content>

          <!-- Feat Add -->
          <v-list-tile-action v-if="browse">
            <v-btn
              icon
              color="accent"
              @click.stop="addItem(item)"
            >
              <v-icon>add</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
        <v-divider
          v-if="index < filteredItems.length - 1"
          :key="`${index}-divider`"
        ></v-divider>
      </template>
    </v-list>

    <EquipmentDialog
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
import character from '@/mixins/character'
import EquipmentDialog from './EquipmentDialog'
import SearchBar from '@/components/inputs/SearchBar'

export default {
  // Name
  name: 'EquipmentList',

  // Components
  components: {
    EquipmentDialog,
    SearchBar
  },

  // Mixins
  mixins: [
    character
  ],

  // Data
  data () {
    return {
      endpoint: 'equipment',
      dialogEvent: 'new-equipment',
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
    items: {
      type: Array,
      default: () => []
    },
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
      this.$bus.$emit('toast', `Added ${item.name} to Equipment`)
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
