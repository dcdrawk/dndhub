<template>
  <v-card>
    <v-card-text class="pl-3 pr-3 pt-0 pb-0 grey lighten-4">
      <v-text-field
        class="pt-2 pb-2"
        clearable
        hide-details
        placeholder="Search"
        prepend-icon="search"
        :value="value"
        @input="$emit('input', $event)"
      />
    </v-card-text>

  </v-card>
</template>

<script>
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
  }
}
</script>

<style scoped lang="scss">
</style>
