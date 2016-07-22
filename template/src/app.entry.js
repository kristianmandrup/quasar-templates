import $ from 'jquery'

window.jQuery = window.$ = $
import 'velocity-animate'
import 'velocity-animate/velocity.ui'

import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.use(Vuex) // State Management
Vue.use(VueRouter) // Router
Vue.use(VueResource) // Ajax Requests

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

/*
quasar.boot.app(() => {
  router.start(Vue.extend({}), '#quasar-app')
})
*/

router.start(Vue.extend({}), '#quasar-app')
