<template>
  <v-container>
    <v-layout row wrap justify-center>
      <v-flex xs12 md6 lg2>

        <!-- Title -->
        <h3 class="title">
          Welcome to DnDHub
        </h3>

        <!-- Subheading -->
        <p class="subheading">
          Create characters,
          track quests,
          join friends,
          and start adventures.
        </p>

        <!-- Email field -->
        <v-text-field
          type="email"
          label="Email"
          v-model="email"
        />

        <!-- Password Field -->
        <v-text-field
          type="password"
          label="Password"
          v-model="password"
          @keypress.enter="signIn()"
        />

        <!-- Error Message -->
        <small
          v-if="error"
          class="error--text"
        >
          {{ error }}
        </small>

        <!-- Sign In Button -->
        <v-btn
          color="primary"
          :loading="loading"
          block
          @click="signIn()"
        >
          Sign In
        </v-btn>

        <!-- Create Account -->
        <v-btn
          flat
          block
          color="primary"
          to="create-account"
        >
          Create Account
        </v-btn>
      </v-flex>
      <v-flex xs12 class="actions">
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  // Name
  name: 'sign-in',

  // Data
  data () {
    return {
      email: undefined,
      password: undefined,
      loading: false,
      error: undefined
    }
  },

  // Methods
  methods: {
    /**
     * Sign In
     * @desc sign the user into firebase
     * on success: go to profile
     * on fail: show error message
     */
    async signIn () {
      try {
        this.loading = true
        this.error = undefined
        await this.$firebase
          .auth()
          .signInWithEmailAndPassword(
            this.email,
            this.password
          )
        this.$router.push('profile')
      } catch (error) {
        console.warn(error)
        this.error = error.message
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="scss">
.title {
  margin: 16px 0 32px 0;
}

.title,
.subheading {
  text-align: center;
}
</style>
