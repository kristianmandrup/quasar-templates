function load (name) {
  if (process.env.NODE_ENV === 'development') {
    return require('component/' + name + '.vue')
  }
  else {
    return (resolve) => {
      require('bundle?lazy!component/' + name + '.vue')(resolve)
    }
  }
}

export default {
  // Not found
  '*': {
    component: load('404')
  },

  // Default
  '/': {
    component: load('index')
  }
}
