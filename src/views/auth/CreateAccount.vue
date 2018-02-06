<template>
  <v-container>
    <v-layout row wrap justify-center>
      <v-flex xs12 md6 lg2>

        <!-- Title -->
        <h3 class="title">
          Create a new DnDHub Account
        </h3>
        <form>
          <!-- Email field -->
          <v-text-field
            type="email"
            label="Email"
            v-validate="'required|email'"
            data-vv-name="email"
            :error-messages="errors.collect('email')"
            v-model="email"
          />

          <!-- Display Name -->
          <v-text-field
            type="text"
            label="Display Name"
            v-validate="'required'"
            data-vv-name="display_name"
            :error-messages="errors.collect('display_name')"
            v-model="displayName"
          />

          <!-- Password Field -->
          <v-text-field
            type="password"
            label="Password"
            v-validate="'required|confirmed:confirm_password'"
            data-vv-name="password"
            :error-messages="errors.collect('password')"
            v-model="password"
          />

          <!-- Confirm Password -->
          <v-text-field
            type="password"
            label="Confirm Password"
            v-validate="'required|confirmed:confirm_password'"
            data-vv-name="confirm_password"
            :error-messages="errors.collect('confirm_password')"
            v-model="confirmPassword"
          />
        </form>

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
          @click="createAccount()"
        >
          Create Account
        </v-btn>

        <!-- Create Account -->
        <p class="account-text">
          Already Have an account?
        </p>
        <v-btn
          flat
          block
          color="primary"
        >
          Sign In
        </v-btn>
      </v-flex>
      <v-flex xs12 class="actions">
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import validation from '../../mixins/validation'
export default {
  // Name
  name: 'sign-in',

  // Mixins
  mixins: [validation],

  // Data
  data () {
    return {
      name: undefined,
      email: undefined,
      displayName: undefined,
      password: undefined,
      confirmPassword: undefined,
      loading: false,
      valid: false,
      error: undefined
    }
  },

  // Methods
  methods: {
    submit () {
      this.$validator.validateAll()
    },
    /**
     * Create Account
     * @desc create a new user in firebase
     * on success: update users displayName and go to profile
     */
    async createAccount () {
      try {
        await this.validate()
        this.loading = true
        this.error = undefined

        const data = await this.$firebase.auth()
          .createUserWithEmailAndPassword(
            this.email,
            this.password
          )
        await data.updateProfile({
          displayName: this.displayName
        })
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

.account-text {
  margin-top: 30px;
  text-align: center;
}
</style>
