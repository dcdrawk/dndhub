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
import Race from './views/character/Race'
import Stats from './views/character/Stats'
import Feats from './views/character/Feats'
import Armor from './views/character/Armor'
import Weapons from './views/character/Weapons'
import Spells from './views/character/Spells'

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
    },
    {
      path: '/character/race',
      name: 'Race',
      component: Race
    },
    {
      path: '/character/stats',
      name: 'Stats',
      component: Stats
    },
    {
      path: '/character/feats',
      name: 'Feats',
      component: Feats
    },
    {
      path: '/character/armor',
      name: 'Armor',
      component: Armor
    },
    {
      path: '/character/weapons',
      name: 'Weapons',
      component: Weapons
    },
    {
      path: '/character/spells',
      name: 'Spells',
      component: Spells
    }
  ]
})
