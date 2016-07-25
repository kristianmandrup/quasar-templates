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
