<template>
  <div>
    <v-row
      row
      wrap
      class="pr-4 pl-4 pt-0 pb-0"
    >
      <v-col
        xs8
        cols="8"
        class="pt-0 pb-0"
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
      </v-col>
      <v-col cols="2">
        <v-btn
          small
          fab
          text
          outlined
          color="accent"
          @click="handleSubtract"
        >
          <v-icon>remove</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="2">
        <v-btn
          small
          fab
          text
          outlined
          color="secondary"
          @click="handleAdd"
        >
          <v-icon>add</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-divider class="mb-2" />
  </div>
</template>

<script>
export default {
  // Name
  name: 'SpellsSlotInput',

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

  // Watch
  watch: {
    watchProperty (newValue, oldValue) {
      return newValue
    }
  },

  // Methods
  methods: {
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
