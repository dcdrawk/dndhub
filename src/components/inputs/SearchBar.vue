<template>
  <v-card>
    <v-card-text class="pl-3 pr-3 pt-0 pb-0">
      <v-text-field
        class="pt-2 pb-2"
        clearable
        hide-details

        placeholder="Search"
        prepend-icon="search"
        :value="value"
        @input="$emit('input', $event)"
      />

      <!-- <div v-if="items">
        <p
          v-if="items.length === 0"
          class="text-xs-center pb-3 ma-0"
        >
          No Feats found.
        </p>
      </div> -->
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
    value: String,
    items: Array
  }
}
</script>

<style scoped lang="scss">
</style>
