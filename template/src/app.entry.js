import $ from 'jquery'
import 'hammerjs'

window.jQuery = window.$ = $
import 'velocity-animate'
import 'velocity-animate/velocity.ui'

import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Quasar from 'quasar-framework'

Vue.use(Vuex) // State Management
Vue.use(VueRouter) // Router
Vue.use(VueResource) // Ajax Requests
Vue.use(Quasar) // Install Quasar Framework

var router = new VueRouter()

function load (name) {
  if (process.env.NODE_ENV === 'development') {
    return require('view/' + name + '.vue')
  }
  else {
    return (resolve) => {
      require('bundle?lazy!view/' + name + '.vue')(resolve)
    }
  }
}

router.map({
  // Not found
  '*': {
    component: load('404')
  },

  // Default
  '/': {
    component: load('index')
  }
})

Quasar.start(() => {
  router.start(Vue.extend({}), '#quasar-app')
})
