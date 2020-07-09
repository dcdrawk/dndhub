import { extend } from 'vee-validate'
import { required, email, confirmed } from 'vee-validate/dist/rules'
import en from 'vee-validate/dist/locale/en'

// Add the required rule
extend('required',
  {
    ...required,
    message: en.messages['required']
  }
)

// Add the email rule
extend('email', email)
extend('confirmed', confirmed)
