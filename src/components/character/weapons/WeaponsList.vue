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
                v-if="item.proficient"
                color="accent"
                class="ml-0"
              >
                star
              </v-icon>
            </v-list-item-title>
            <!-- AC -->
            <v-list-item-subtitle>
              Dmg: {{ item.damage }}
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-content>
            <!-- Trait Name -->
            <v-list-item-title class="right-text">
              {{ item.weaponType }}
            </v-list-item-title>
            <!-- Character Details -->
            <v-list-item-subtitle class="right-text">
              Weight: {{ item.weight }}
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

    <weapons-dialog
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
import WeaponsDialog from './WeaponsDialog'
import SearchBar from '../../inputs/SearchBar'

export default {
  // Name
  name: 'WeaponsList',

  // Components
  components: {
    WeaponsDialog,
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
      endpoint: 'weapons',
      dialogEvent: 'new-weapons',
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
