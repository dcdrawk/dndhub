<template>
  <v-layout column justify-center>
    <transition appear name="slide-y-reverse-transition" mode="out-in">
      <v-flex v-if="!user || loading" class="loading" xs12  key="loading">
        <v-progress-circular indeterminate color="secondary"></v-progress-circular>
      </v-flex>

      <v-flex v-else xs12>
        <!-- Character List -->
        <v-list
          v-if="characters"
          two-line
          class="character-list"
        >
          <!-- List Tile -->
          <v-list-tile
            v-for="(item, index) in characters"
            :key="index"
            @click="selectCharacter(item)"
          >
            <!-- Checkbox -->
            <v-list-tile-action>
              <v-checkbox
                color="secondary"
                true-value="testdd"
                :input-value="characterId === item['.key']"

              />
            </v-list-tile-action>

            <!-- Content -->
            <v-list-tile-content>
              <!-- Character Name -->
              <v-list-tile-title>
                {{ item.name }}
              </v-list-tile-title>

              <!-- Character Details -->
              <v-list-tile-sub-title>
                Level {{ item.level }} {{ item.race }} {{ item.class }}
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider/>
        </v-list>

      </v-flex>

    </transition>

    <!-- Floating Action Button -->
    <v-btn
      color="secondary"
      dark
      fab
      fixed
      bottom
      right
    ><v-icon>add</v-icon>
    </v-btn>
  </v-layout>
</template>

<script>
export default {
  // Name
  name: 'testcomponent',

  // Components
  components: {},

  // Props
  props: {},

  // Data
  data () {
    return {
      characters: undefined,
      loading: false
    }
  },

  // Computed
  computed: {
    user () {
      return this.$store.state.user
    },
    characterId () {
      return this.$store.state.character
        ? this.$store.state.character['.key']
        : undefined
    }
  },

  // Watch
  watch: {
    user: {
      immediate: true,
      handler: function (newValue, oldValue) {
        if (!newValue) return
        this.getCharacters()
      }
    }
  },

  // Methods
  methods: {
    getCharacters () {
      this.loading = true
      this.$bindAsArray(
        'characters',
        this.$db.ref(`characters/${this.user.uid}`),
        null,
        () => {
          this.loading = false
        }
      )
    },

    selectCharacter (character) {
      this.$store.commit('select_character', character)
    }
  }
}
</script>

<style scoped lang="scss">
.character-list {
  margin-bottom: 72px;
}
.loading {
  padding: 32px 16px;
  text-align: center;
}
</style>
