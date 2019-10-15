<template>
  <div class="spell-list-container" v-if="filteredItems">
    <search-bar
      v-model="search"
      filter
      @toggle-filter="showFilter = !showFilter"
    />

    <spells-filters
      v-show="showFilter"
      :filter="filter"
      @filter-level="filter.level = $event"
      @filter-class="filter.class = $event"
      @filter-school="filter.school = $event"
    ></spells-filters>

    <p
      v-if="filteredItems.length === 0"
      class="pt-3 text-xs-center no-items"
    >
      No Items Found
    </p>

    <!-- Spells List -->
    <v-list
      v-if="filteredItems.length > 0"
      two-line
      dense
      class="elevation-1 spell-list"
    >
      <virtual-scroller class="scroller" :items="displayedItems" itemHeight="61">
        <template slot-scope="props">
          <!-- List Tile -->
          <v-list-item
            class="list-tile"
            :key="props.itemKey"
            @click="handleShowDialog(props.item)"
          >
            <!-- Content -->

            <v-list-item-content>
              <!-- Name -->
              <v-list-item-title>
                {{ props.item.name }}
                <span
                  v-if="props.item.ritual == 1"
                  class="spell-list__symbol cyan--text font-weight-bold"
                >R</span>

                <!-- Concentration -->
                <span
                  v-if="props.item.concentration == 1"
                  class="spell-list__symbol orange--text font-weight-bold"
                  color="secondary"
                >
                  C
                </span>

              </v-list-item-title>
              <v-list-item-subtitle class="">
                {{ props.item.class }}
              </v-list-item-subtitle>
            </v-list-item-content>

            <!-- Spell Level / School -->
            <v-list-item-content>
              <v-list-item-title class="right-text">
                {{ props.item.level }}
              </v-list-item-title>
              <v-list-item-subtitle class="right-text">
                {{ props.item.school }}
              </v-list-item-subtitle>
            </v-list-item-content>

            <!-- Feat Add -->
            <v-list-item-action v-if="browse">
              <v-btn
                icon
                color="accent"
                @click.stop="addItem(props.item)"
              >
                <v-icon>add</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>

          <v-divider></v-divider>
        </template>
      </virtual-scroller>
    </v-list>

    <div class="pagination">
      <v-card
        class="text-xs-right flex justify-space-between elevation-3 darken-4"
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
            :disabled="disableNext"
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
            :disabled="disableNext"
            @click="lastPage()"
          >
            <v-icon>last_page</v-icon>
          </v-btn>
        </span>
      </v-card>
    </div>

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
 * <spells-list-virtual></spells-list-virtual>
 * @desc A list of spells using virtual list
 */
import character from '../../../mixins/character'
import SpellsDialog from './SpellsDialog'
import SearchBar from '../../inputs/SearchBar'
import SpellsFilters from './SpellsFilters'

export default {
  // Name
  name: 'spells-list-virtual',

  // Components
  components: {
    SpellsDialog,
    SearchBar,
    SpellsFilters
  },

  // Mixins
  mixins: [
    character
  ],

  // Props
  props: {
    items: Array,
    browse: Boolean
  },

  // Data
  data () {
    return {
      endpoint: 'spells',
      dialogEvent: 'new-spell',
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
      filter: {
        level: undefined,
        school: undefined,
        class: undefined
      },
      showFilter: false,
      selectedItem: undefined,
      newItem: false,
      showDialog: false,
      search: undefined,

      // Pagination
      page: 1,
      perPage: 50
    }
  },

  // Computed
  computed: {
    filteredItems () {
      const array = this.items
      return array.filter((item) => {
        return this.search && item.name
          ? item.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1
          : true
      }).filter((item) => {
        if (!this.filter.class) return true
        if (!item.class) return false
        return item.class.indexOf(this.filter.class) > -1
      }).filter((item) => {
        if (!this.filter.level) return true
        if (!item.level) return false
        return item.level.indexOf(this.filter.level) > -1
      }).filter((item) => {
        if (!this.filter.school) return true
        if (!item.school) return false
        return item.school.indexOf(this.filter.school) > -1
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
    },

    disableNext () {
      return this.page === this.paginatorLength
    }
  },

  watch: {
    paginatorLength (newVal, oldVal) {
      if (this.page > newVal) {
        this.page = Math.max(newVal, 1)
      }
    }
  },

  // Methods
  methods: {
    /**
     * Adds the item to firebase
     * @param {Object} - item
     */
    addItem (item) {
      this.$db
        .ref(`${this.endpoint}/${this.characterId}`)
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
  text-align: right;
}

.spell-list-container {
  position: relative;
  min-height: 100vh;
  margin-bottom: 44px;
}

.spell-list {
  flex-grow: 1;

  &__symbol {
    margin-left: 10px;
    // top: -2px;
    // min-width: 32px;
    // height: 22px;
  }
}

.pagination {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;

  &__button {
    max-width: 48px;
  }

  .card {
    max-width: 1200px;
    margin: auto;
    border-top: 1px solid #555;
  }
}
</style>

<style>
.tab-transition .pagination {
  display: none;
}
</style>
