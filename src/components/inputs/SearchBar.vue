<template>
  <v-card flat>
    <v-card-text class="pl-3 pr-3 pt-0 pb-0 d-flex">
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
      <v-btn
        v-if="filter"
        class="filter-button"
        flat
        icon
        @click="$emit('toggle-filter')"
      >
        <v-icon>filter_list</v-icon>
      </v-btn>
    </v-card-text>
    <v-divider />
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
  name: 'SearchBar',

  // Props
  props: {
    value: {
      type: String,
      default: undefined
    },
    filter: Boolean
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
.filter-button {
  max-width: 36px;
  min-width: 36px;
}
</style>
