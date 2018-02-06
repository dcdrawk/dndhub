<template>
  <!-- Toolbar -->
  <v-toolbar
    class="the-toolbar"
    app
    fixed
    dark
    color="primary"
  >
    <!-- Toolbar Side Icon -->
    <v-toolbar-side-icon
      @click="$emit('toggle')"
    />

    <!-- Toolbar Title -->
    <v-toolbar-title class="white--text">
      {{ $route.name }}
    </v-toolbar-title>

    <!-- Spacer -->
    <v-spacer/>

    <!-- Toolbar Menu (if a user is signed in)-->
    <v-menu v-if="user" attach light left>
      <!-- Menu Activator -->
      <v-btn color="primary" class="menu-toggle" dark icon slot="activator">
        <v-icon>more_vert</v-icon>
      </v-btn>

      <!-- Menu List -->
      <v-list light>
        <!-- Sign Out -->
        <v-list-tile
          @click="signOut()"
        >
          <v-list-tile-title>
            Sign Out
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>

<script>
export default {
  // Name
  name: 'the-toolbar',

  // Computed
  computed: {
    user () {
      return this.$store.state.user
    }
  },

  // Methods
  methods: {
    /**
     * Sign Out
     * @desc Sign the user out and go to the sign-in page
     * @returns nothing
     */
    async signOut () {
      try {
        await this.$firebase.auth().signOut()
        this.$router.push('/')
      } catch (error) {
        console.warn(error)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.the-toolbar {
  z-index: 6;
}
</style>
