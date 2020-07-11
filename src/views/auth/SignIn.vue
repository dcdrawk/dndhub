<template>
  <v-container>
    <v-row
      wrap
      justify="center"
    >
      <v-col
        xs="12"
        md="6"
        lg="4"
        xl="3"
      >
        <!-- Title -->
        <h3 class="text-h6 text-center">
          Welcome to DnDHub (Beta)
        </h3>

        <!-- Subheading -->
        <p class="subheading text-center">
          Craft characters, start adventures.
        </p>

        <!-- Signed In As -->
        <v-alert
          v-if="user"
          type="success"
          :value="true"
          class="mb-4 text-center"
        >
          Signed in as <strong>{{ user.email }}</strong>
        </v-alert>

        <div>
          <!-- Email field -->
          <v-text-field
            v-model="email"
            color="secondary"
            type="email"
            label="Email"
            name="email"
            outlined
          />

          <!-- Password Field -->
          <v-text-field
            v-model="password"
            color="secondary"
            type="password"
            label="Password"
            outlined
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
            color="secondary"
            :loading="loading"
            block
            @click="signIn()"
          >
            Sign In
          </v-btn>

          <p class="text-xs-center mt-4">
            Don't have an account yet?
            <router-link
              class="font-weight-medium secondary--text"
              to="create-account"
            >
              Create one
            </router-link>
          </p>
        </div>
      </v-col>
      <!-- <v-col
        xs12
        class="actions"
      /> -->
    </v-row>
  </v-container>
</template>

<script>
export default {
  // Name
  name: 'SignIn',

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
