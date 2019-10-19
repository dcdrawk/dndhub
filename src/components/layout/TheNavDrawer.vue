<template>
  <!-- Nav Drawer -->
  <v-navigation-drawer
    app
    fixed
    temporary
    :value="open"
    class="the-nav-drawer"
    @input="handleInput($event)"
  >
    <!-- Nav Drawer List -->
    <v-list>
      <v-list-item>
        <v-list-item-content>
          <!-- Nav Drawer List Title -->
          <v-list-item-title class="title">
            DnDHub
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- Default / User Menu -->
      <v-list-item
        v-for="(item, index) in menu"
        :key="index"
        :to="item.href"
      >
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
          <v-list-item-subtitle>{{ item.subtitle }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider class="mb-2" />
    <v-list subheader>
      <!-- Character Menu -->
      <v-list-item
        v-if="user && character"
        class="mb-2"
      >
        <v-list-item-content>
          <!-- Nav Drawer List Title -->
          <v-list-item-subtitle>
            Selected Character
          </v-list-item-subtitle>
          <v-list-item-title class="title">
            {{ character.name }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <div v-if="user && character">
        <v-list-item
          v-for="(item, index) in characterMenu"
          :key="`character-menu-${index}`"
          active-class="secondary--text"
          :to="item.href"
        >
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
            <v-list-item-subtitle>{{ item.subtitle }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </div>
      <v-divider
        v-if="user && character"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  // Name
  name: 'TheNavDrawer',

  // Props
  props: {
    open: Boolean
  },

  // Data
  data () {
    return {
      /**
       * Default Menu
       * Show when not logged in
       */
      defaultMenu: [{
        title: 'Sign In',
        icon: 'person',
        href: '/',
        active: false
      }, {
        title: 'Create Account',
        icon: 'assignment',
        href: '/create-account',
        active: false
      }],

      /**
       * User Menu
       * Include any user-specific routes
       */
      userMenu: [{
        title: 'Profile',
        icon: 'person',
        href: '/profile',
        active: false
      }, {
        title: 'Characters',
        icon: 'person',
        href: '/characters',
        active: false
      }],

      /**
       * Character Menu
       * Include any character-specific routes
       */
      characterMenu: [{
        title: 'General',
        icon: 'person',
        href: '/character/general',
        active: false
      }, {
        title: 'Class',
        icon: 'person',
        href: '/character/class',
        active: false
      }, {
        title: 'Race',
        icon: 'person',
        href: '/character/race',
        active: false
      }, {
        title: 'Stats',
        icon: 'person',
        href: '/character/stats',
        active: false
      }, {
        title: 'Feats',
        icon: 'person',
        href: '/character/feats',
        active: false
      }, {
        title: 'Armor',
        icon: 'person',
        href: '/character/armor',
        active: false
      }, {
        title: 'Weapons',
        icon: 'person',
        href: '/character/weapons',
        active: false
      }, {
        title: 'Spells',
        icon: 'person',
        href: '/character/spells',
        active: false
      }, {
        title: 'Inventory',
        icon: 'person',
        href: '/character/inventory',
        active: false
      }, {
        title: 'Quest Log',
        icon: 'person',
        href: '/character/quests',
        active: false
      }]
    }
  },

  // Computed
  computed: {
    /**
     * menu
     * return the userMenu if logged in
     * otherwise, return the default menu
     */
    menu () {
      return this.user
        ? this.userMenu
        : this.defaultMenu
    },

    /**
     * character
     * the currently selected character
     */
    character () {
      return this.$store.state.character
    },

    /**
     * user
     * the current user
     */
    user () {
      return this.$store.state.user
    }
  },

  // Methods
  methods: {
    /**
     * handleInput
     * @desc handle the input event when the drawer opens / closes
     * @param {Object} event
     */
    handleInput (event) {
      this.$emit(event ? 'open' : 'close')
    }
  }
}
</script>

<style scoped lang="scss">
.the-nav-drawer {
  z-index: 7;
}
</style>
