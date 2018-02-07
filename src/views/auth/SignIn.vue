<template>
  <v-container>
    <v-layout row wrap justify-center>
      <v-flex xs12 md6 lg4 xl2>
        <!-- Signed In As -->
        <v-alert
          v-if="user"
          type="success"
          :value="true"
          class="mb-4"
        >
          Signed in as <strong>{{ user.email }}</strong>
        </v-alert>
        <!-- Title -->
        <h3 class="title">
          Welcome to DnDHub
        </h3>

        <!-- Subheading -->
        <p class="subheading">
          Make characters<br>
          Join friends<br>
          Start adventures
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

        <p class="text-xs-center mt-4">
          Don't have an account yet? <router-link to="create-account">Create one</router-link>.
        </p>

        <!-- Create Account -->
        <!-- <v-btn
          flat
          block
          color="primary"
          to="create-account"
        >
          Create Account
        </v-btn> -->
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

  // Computed
  computed: {
    user () {
      return this.$store.state.user
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
        this.$bus.$emit(
          'toast',
          `Signed In as ${this.email}`
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
