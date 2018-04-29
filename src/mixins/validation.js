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
     * @function validateField
     * @desc wait for nextTick and validate a specific field
     * @param {string} field - name of the input field
     */
    validateField (field) {
      this.$nextTick(() => {
        this.$validator.validate(field)
      })
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
          console.warn('Validation failed')
          // throw new Error('Validation failed')
        }
      } catch (error) {
        console.warn(error)
      }
    }
  }
}
