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
        xl="2"
      >
        <!-- Title -->
        <h3 class="text-h6 text-center mb-4">
          Create a new DnDHub Account
        </h3>

        <ValidationObserver
          ref="observer"
          v-slot="{ invalid }"
        >
          <form autocomplete="off">
            <!-- Email field -->
            <ValidationProvider
              v-slot="{ errors }"
              name="Email"
              rules="required|email"
            >
              <v-text-field
                v-model="email"
                type="email"
                label="Email"
                autocomplete="off"
                name="email"
                outlined
                color="secondary"
                :error-messages="errors[0]"
              />
            </ValidationProvider>

            <!-- Display Name -->
            <ValidationProvider
              v-slot="{ errors }"
              name="Display Name"
              rules="required"
            >
              <v-text-field
                v-model="displayName"
                type="text"
                label="Display Name"
                outlined
                color="secondary"
                :error-messages="errors[0]"
              />
            </ValidationProvider>

            <!-- Password Field -->
            <ValidationProvider
              v-slot="{ errors }"
              name="Password"
              rules="required"
              vid="password"
            >
              <v-text-field
                v-model="password"
                type="password"
                label="Password"
                name="password"
                autocomplete="new-password"
                outlined
                color="secondary"
                :error-messages="errors[0]"
              />
            </ValidationProvider>

            <!-- Confirm Password -->
            <ValidationProvider
              v-slot="{ errors }"
              name="Confirm Password"
              rules="confirmed:password"
            >
              <v-text-field
                v-model="confirmPassword"
                type="password"
                label="Confirm Password"
                name="confirm_password"
                outlined
                color="secondary"
                :error-messages="errors[0]"
              />
            </ValidationProvider>
          </form>
        </ValidationObserver>

        <!-- Error Message -->
        <small
          v-if="error"
          class="error--text"
        >
          {{ error }}
        </small>

        <!-- Sign In Button -->
        <v-btn
          class="mt-4"
          color="secondary"
          :loading="loading"
          block
          @click="createAccount()"
        >
          Create Account
        </v-btn>

        <!-- Sign In Link -->
        <p class="account-text">
          Already Have an account?
          <router-link
            class="font-weight-medium secondary--text"
            to="/"
          >
            Sign In
          </router-link>
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import validation from '../../mixins/validation'
export default {
  // Name
  name: 'SignIn',

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
    // submit () {
    //   // this.$validator.validateAll()
    // },
    /**
     * Create Account
     * @desc create a new user in firebase
     * on success: update users displayName and go to profile
     */
    async createAccount () {
      try {
        // await this.validate()
        await this.$_validation_validate()
        this.loading = true
        this.error = undefined

        const data = await this.$firebase.auth()
          .createUserWithEmailAndPassword(
            this.email,
            this.password
          )
        // console.log(data)
        await data.user.updateProfile({
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
