import Vue from 'vue'
import VueRouter from 'vue-router'
// import Vuex from 'vuex'
// import VueResource from 'vue-resource'
// import VueTouch from 'vue-touch'
import Quasar from 'quasar'
import 'velocity-animate'
import 'velocity-animate/velocity.ui'

/*
  If overriding Quasar style, leave uncommented
  just the first line.

  If NOT overriding Quasar style, leave uncommented
  just the second line. This option make compiling faster.

  WARNING!
  Leave just one of the two require() calls below
  uncommented.
 */
// require('./themes/app.' + __THEME + '.styl')
require('quasar/dist/quasar.' + __THEME + '.css')

Vue.use(VueRouter) // Router
// Vue.use(Vuex) // State Management
// Vue.use(VueResource) // Ajax Requests
// Vue.use(VueTouch) // Touch events
Vue.use(Quasar) // Install Quasar Framework

let router = new VueRouter()

import routes from './routes'

Quasar.start(() => {
  router.map(routes)
  router.start(Vue.extend({}), '#quasar-app')
})
