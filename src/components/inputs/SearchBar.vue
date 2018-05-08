<template>
  <v-card flat>
    <v-card-text class="pl-3 pr-3 pt-0 pb-0">
      <v-text-field
        class="pt-2 pb-2"
        clearable
        hide-details
        placeholder="Search"
        prepend-icon="search"
        color="accent"
        :value="value"
        @input="handleInput"
      />
    </v-card-text>
    <v-divider/>
  </v-card>
</template>

<script>
import debounce from 'debounce'
/**
 * <component></component>
 * @desc description
 */
export default {
  // Name
  name: 'search-bar',

  // Props
  props: {
    value: String
  },

  // Methods
  methods: {
    handleInput (event) {
      this.$emit('input', event)
    }
  },

  created () {
    this.handleInput = debounce(this.handleInput, 500)
  }
}
</script>

<style lang="scss">
// .
</style>
