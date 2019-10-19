<template>
  <div>
    <v-layout
      row
      wrap
    >
      <v-flex
        xs8
        class="pr-2"
      >
        <v-text-field
          :label="label"
          type="number"
          :value="value"
          :min="min"
          :max="max"
          readonly
          @input="$emit('input', $event)"
        />
      </v-flex>
      <v-flex xs2>
        <v-btn
          small
          fab
          @click="handleSubtract"
        >
          <v-icon>remove</v-icon>
        </v-btn>
      </v-flex>
      <v-flex xs2>
        <v-btn
          small
          fab
          color="secondary"
          @click="handleAdd"
        >
          <v-icon>add</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
    <v-divider class="mb-2" />
  </div>
</template>

<script>
export default {
  // Name
  name: 'SpellsSlotInput',

  // Components
  components: {},

  // Mixins
  mixins: {},

  // Props
  props: {
    label: {
      type: String,
      default: undefined
    },
    value: {
      type: Number,
      default: 0
    }
  },

  // Data
  data () {
    return {
      max: 10,
      min: 0
    }
  },

  // Computed
  // computed: {
  //   computedProperty () {
  //     return 'something'
  //   }
  // },

  // Watch
  watch: {
    watchProperty (newValue, oldValue) {
      return newValue
    }
  },

  // Methods
  methods: {
    // handleBlur () {
    //   if (this.value < this.min) {
    //     this.$emit('input', this.min)
    //   }
    //   if (this.value > this.max) {
    //     this.$emit('input', this.max)
    //   }
    // },

    handleAdd () {
      const newValue = this.value + 1
      if (newValue > this.max) return
      this.$emit('add', newValue)
    },

    handleSubtract () {
      const newValue = this.value - 1
      if (newValue < this.min) return
      this.$emit('subtract', newValue)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
