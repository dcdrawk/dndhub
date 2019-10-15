<template>
  <!-- Toolbar -->
  <v-app-bar
    class="the-toolbar"
    app
    fixed
    dark
    color="primary"
    scroll-off-screen
  >
    <!-- Toolbar Side Icon -->
    <v-app-bar-nav-icon
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
      <template v-slot:activator="{ on }">
        <!-- Menu Activator -->
        <v-btn color="primary" class="menu-toggle" dark icon slot="activator">
          <v-icon>more_vert</v-icon>
        </v-btn>
      </template>

      <!-- Menu List -->
      <v-list light>
        <!-- Sign Out -->
        <v-list-item
          @click="signOut()"
        >
          <v-list-item-title>
            Sign Out
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
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
