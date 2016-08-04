import $ from 'jquery'
import 'hammerjs'

window.jQuery = window.$ = $
import 'velocity-animate'
import 'velocity-animate/velocity.ui'

import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VueTouch from 'vue-touch'
import Quasar from 'quasar'

require('./themes/app.' + __THEME + '.styl')

Vue.use(Vuex) // State Management
Vue.use(VueRouter) // Router
Vue.use(VueResource) // Ajax Requests
Vue.use(VueTouch) // Touch events
Vue.use(Quasar) // Install Quasar Framework

let router = new VueRouter()

import routes from './routes'

Quasar.start(() => {
  router.map(routes)
  router.start(Vue.extend({}), '#quasar-app')
})
