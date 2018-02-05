export default {
  methods: {
    /**
     * @function getErrors
     * @desc return the error for a specific field
     * @param {string} field - name of the input field
     * @returns {array} Array with first error
     */
    getErrors (field) {
      return this.errors.first(field)
        ? [this.errors.first(field)]
        : undefined
    },

    /**
     * @function validate
     * @desc validate all fields
     */
    async validate () {
      try {
        const result = await this.$validator.validateAll()
        if (result) {
          return true
        } else {
          throw new Error('Validation failed')
        }
      } catch (error) {
        throw new Error('Validation failed')
      }
    }
  }
}
