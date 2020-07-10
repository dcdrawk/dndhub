<template>
  <v-container>
    <v-row
      row
      wrap
    >
      <v-col
        v-if="user"
        xs12
      >
        <!-- Signed In As -->
        <v-alert
          type="success"
          :value="true"
          class="signed-in-as"
        >
          Signed in as <strong>{{ user.email }}</strong>
        </v-alert>

        <v-alert type="warning">
          This Page is a Work-In-Progress.
        </v-alert>

        <!-- Display Name Field -->
        <v-text-field
          label="Display Name"
          required
          :value="readonly ? user.displayName : userCopy.displayName"
          :readonly="readonly"
          filled
          color="secondary"
          @input="userCopy.displayName = $event"
        />

        <div>
          <!-- Edit Button -->
          <v-btn
            v-if="readonly"
            text
            outlined
            @click="enableEditing()"
          >
            Edit
          </v-btn>

          <!-- Cancel Button -->
          <v-btn
            v-if="!readonly"
            class="mr-2"
            text
            outlined
            @click="cancelEditing()"
          >
            Cancel
          </v-btn>

          <!-- Save Button  -->
          <v-btn
            v-if="!readonly"
            color="secondary"
            @click="updateUser()"
          >
            Save
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import validation from '../../mixins/validation'

export default {
  // Name
  name: 'Profile',

  // Mixins
  // mixins: [validation],

  // Data
  data () {
    return {
      readonly: true,
      userCopy: undefined,
      loading: false
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
     * Enable Editing
     * @desc make a copy of the user, make text fields editable
     */
    enableEditing () {
      this.userCopy = { ...this.user }
      this.readonly = false
    },

    /**
     * Cancel Editing
     * @desc make text fields readOnly
     */
    cancelEditing () {
      this.readonly = true
    },

    /**
     * Update User
     * @desc update the user in firebase
     */
    async updateUser () {
      try {
        // await this.validate()
        this.loading = true
        await this.$firebase.auth().currentUser
          .updateProfile(this.userCopy)
        this.$store.commit('update_user', this.userCopy)
        this.$bus.$emit('toast', 'Profile updated.')
        this.readonly = true
      } catch (error) {
        console.warn(error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="scss">
.signed-in-as {
  width: 100%;
  text-align: center;
  margin-bottom: 16px;
}
</style>
