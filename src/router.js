import Vue from 'vue'
import Router from 'vue-router'

/**
 * Auth Views
 */
import SignIn from './views/auth/SignIn'
import CreateAccount from './views/auth/CreateAccount'

/**
 * User Views
 */
import Profile from './views/user/Profile'
import Characters from './views/user/Characters'

/**
 * Character Views
 */
import General from './views/character/General'
import CharacterClass from './views/character/Class'

Vue.use(Router)

export default new Router({
  routes: [
    /**
     * Auth Routes
     */
    {
      path: '/',
      name: 'Sign In',
      component: SignIn
    },
    {
      path: '/create-account',
      name: 'Create Account',
      component: CreateAccount
    },
    /**
     * User Routes
     */
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/characters',
      name: 'Characters',
      component: Characters
    },

    /**
     * Character Routes
     */
    {
      path: '/character/general',
      name: 'Genral Info',
      component: General
    },
    {
      path: '/character/class',
      name: 'Class',
      component: CharacterClass
    }
  ]
})
