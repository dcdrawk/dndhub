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
      <v-list-tile>
        <v-list-tile-content>

        <!-- Nav Drawer List Title -->
        <v-list-tile-title class="title">
          DnDHub
        </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <!-- Default / User Menu -->
      <v-list-tile
        v-for="(item, index) in menu"
        :key="index"
        :to="item.href"
      >
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-divider/>

      <!-- Character Menu -->
      <v-list-tile
        v-if="user && character"
      >
        <v-list-tile-content>

        <!-- Nav Drawer List Title -->
        <v-list-tile-title class="title">
          {{ character.name }}
        </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile
        v-if="user && character"
        v-for="(item, index) in characterMenu"
        :key="`character-menu-${index}`"
        :to="item.href"
      >
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider
        v-if="user && character"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  // Name
  name: 'the-nav-drawer',

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
        href: 'character/general',
        active: false
      }, {
        title: 'Class',
        icon: 'person',
        href: '/todo',
        active: false
      }, {
        title: 'Race',
        icon: 'person',
        href: '/todo',
        active: false
      }, {
        title: 'Feats',
        icon: 'person',
        href: '/todo',
        active: false
      }, {
        title: 'Stats',
        icon: 'person',
        href: '/todo',
        active: false
      }, {
        title: 'Armor',
        icon: 'person',
        href: '/todo',
        active: false
      }, {
        title: 'Weapons',
        icon: 'person',
        href: '/todo',
        active: false
      }, {
        title: 'Spells',
        icon: 'person',
        href: '/todo',
        active: false
      }, {
        title: 'Equipment',
        icon: 'person',
        href: '/todo',
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
