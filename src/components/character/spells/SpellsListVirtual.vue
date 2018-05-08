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

    <!-- <div class="text-xs-center">
      <v-pagination
        :length="paginatorLength"
        :total-visible="6"
        v-model="page"
        color="secondary"
      />
    </div> -->

    <!-- Spells List -->
    <v-list
      v-if="filteredItems.length > 0"
      two-line
      dense
      class="elevation-1 spell-llist"
    >
      <virtual-scroller class="scroller" :items="displayedItems" itemHeight="60">
        <!-- <recycle-list
          class="scroller"
          :items="items"
          :itemHeight="60"
        > -->
        <template slot-scope="props">
          <!-- List Tile -->
          <v-list-tile
            class="list-tile"
            :key="props.itemKey"
            @click="handleShowDialog(props.item)"
          >
            <!-- Content -->

            <v-list-tile-content>
              <!-- Name -->
              <v-list-tile-title>
                {{ props.item.name }}

                <!-- <v-icon
                  v-if="item.proficient"
                  color="accent"
                  class="ml-2"
                >
                  add_box
                </v-icon> -->
              </v-list-tile-title>
              <v-list-tile-sub-title class="">
                {{ props.item.class }}
              </v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-content>
              <!-- Trait Name -->
              <v-list-tile-title class="right-text">
                {{ props.item.level }}
              </v-list-tile-title>
              <!-- Character Details -->
              <v-list-tile-sub-title class="right-text">
                {{ props.item.school }}
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

          <!-- <v-divider
            v-if="index < filteredItems.displayedItems - 1"
            :key="`${index}-divider`"
          ></v-divider> -->
        </template>
        <!-- </recycle-list> -->
      </virtual-scroller>
    </v-list>

    <!-- {{ paginatorLength }} -->
    <v-card
      class="text-xs-right pagination flex justify-space-between elevation-3 darken-4"
    >
      <span class="pl-3">
        Page {{ page }} / {{ paginatorLength }}
      </span>
      <span>
        <v-btn
          raised
          color="primary"
          icon
          :disabled="disablePrev"
          class="pagination__button"
          @click="firstPage()"
        >
          <v-icon>first_page</v-icon>
        </v-btn>
        <v-btn
          raised
          color="primary"
          icon
          :disabled="disablePrev"
          class="pagination__button"
          @click="prevPage()"
        >
          <v-icon>chevron_left</v-icon>
        </v-btn>
        <v-btn
          raised
          color="primary"
          icon
          class="pagination__button"
          @click="nextPage()"
        >
          <v-icon>chevron_right</v-icon>
        </v-btn>
        <v-btn
          raised
          color="primary"
          icon
          class="pagination__button"
          @click="lastPage()"
        >
          <v-icon>last_page</v-icon>
        </v-btn>
      </span>
    </v-card>

    <spells-dialog
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
 * <spells-list></spells-list>
 * @desc A list of spells
 */
import character from '../../../mixins/character'
import SpellsDialog from './SpellsDialog'
import SearchBar from '../../inputs/SearchBar'

export default {
  // Name
  name: 'spells-list',

  // Components
  components: {
    SpellsDialog,
    SearchBar
  },

  // Mixins
  mixins: [
    character
  ],

  // Data
  data () {
    return {
      endpoint: 'spells',
      dialogEvent: 'new-spells',
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
      search: undefined,

      // Pagination
      page: 1,
      perPage: 100
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
    },

    displayedItems () {
      return this.filteredItems.slice(
        (this.page - 1) * this.perPage,
        this.page * this.perPage
      )
    },

    paginatorLength () {
      return Math.ceil(this.filteredItems.length / this.perPage)
    },

    disablePrev () {
      return this.page === 1
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
      console.log('spells known add item...')
      console.log(`${this.endpoint}/${this.characterId}`)
      this.$db.ref(`${this.endpoint}/${this.characterId}`)
        .push(item)
      this.$bus.$emit('toast', `Added ${item.name} to Spells`)
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
    },

    /**
     * Next Page
     * Go to the next page
     */
    nextPage () {
      this.page++
    },

    /**
     * Last Page
     * Go to the next page
     */
    lastPage () {
      this.page = this.paginatorLength
    },

    /**
     * Last Page
     * Go to the next page
     */
    firstPage () {
      this.page = 1
    },

    /**
     * Prev Page
     * Go to the previous page
     */
    prevPage () {
      this.page--
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
  // opacity: .54;
  // color: rgba(0,0,0,.54);
  text-align: right;
}
.spell-llist {
  margin-bottom: 44px;
  flex-grow: 1;
  min-height: 100vh;
}
.pagination {
  position: fixed;
  bottom: 0;
  left: 0;
  // top: calc(100vh - 50px);
  width: 100%;
  border-top: 1px solid #555;
  &__button {
    max-width: 48px;
  }
}

::-webkit-scrollbar {
    -webkit-appearance: none;
}
::-webkit-scrollbar:vertical {
    width: 12px;
}
::-webkit-scrollbar:horizontal {
    height: 12px;
}
::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, .5);
    border-radius: 10px;
    border: 2px solid #ffffff;
}
::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: #ffffff;
}
</style>
