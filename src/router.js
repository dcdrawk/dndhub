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
import CharacterList from './views/user/CharacterList'

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
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/character-list',
      name: 'CharacterList',
      component: CharacterList
    }
  ]
})
