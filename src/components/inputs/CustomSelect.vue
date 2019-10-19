<template>
  <div class="custom-select">
    <!-- Select -->
    <v-select
      menu-props="bottom"
      v-if="!custom && items || disabled"
      class="pb-0"
      color="secondary"
      item-color="white"
      :label="label"
      :items="items"
      :item-text="itemText"
      :item-value="itemValue"
      :value="value"
      :disabled="disabled"
      :error-messages="errorMessages"
      @input="$emit('input', $event)"
    ></v-select>

    <!-- Input Field -->
    <v-text-field
      v-else
      ref="input"
      class="pb-0"
      color="secondary"
      :readonly="disabled"
      :name="name"
      :label="label"
      :value="value"
      @input="$emit('input', $event)"
    ></v-text-field>

    <!-- Edit / Cancel Button -->
    <v-btn
      v-if="showAction && items"
      icon
      class="mr-0 mt-3 edit-button"
      :disabled="disabled"
      @click="customize()"
    >
      <v-icon v-if="!custom" color="grey">
        edit
      </v-icon>
      <v-icon v-else color="grey">
        close
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
/**
 * <custom-select></custom-select>
 * @desc Select with optional text input field
 */
export default {
  // Name
  name: 'CustomSelect',

  // Props
  props: {
    items: Array,
    itemText: String,
    itemValue: String,
    value: String,
    custom: Boolean,
    label: String,
    name: String,
    disabled: Boolean,
    errorMessages: [Object, Array],
    showAction: {
      type: Boolean,
      default: true
    }
  },

  // Methods
  methods: {
    /**
     * Customize
     * @desc Emit a 'customize' event and focus the input field
     * @emits customize
     */
    customize () {
      this.$emit('customize')
      this.$nextTick(() => {
        if (!this.custom) return
        this.$refs.input.focus()
      })
    }
  }
}
</script>

<style scoped lang="scss">
.custom-select {
  display: flex;
}
</style>
