import Vue from 'vue'
import Router from 'vue-router'

/**
 * Auth Views
 */
import SignIn from './views/auth/SignIn'

/**
 * User Views
 */
import Profile from './views/user/Profile'
import CharacterList from './views/user/CharacterList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: SignIn
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
