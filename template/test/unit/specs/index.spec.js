import Vue from 'vue'
import Index from 'src/components/index'
import test from 'mocha-test-dsl'
import { vm as check } from '../checkers'

test('component')
  .that('index.vue')
  .will('render text', () => {
    const vm = new Vue({
      template: '<div><index></index></div>',
      components: { Index }
    }).$mount()

    check(vm)
      .element
      .contains('Quasar App')
  })
  .run()
