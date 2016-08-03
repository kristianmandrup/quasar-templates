<template>
  <quasar-layout>
    <div slot="header" class="toolbar">
      <quasar-toolbar-title :padding="1">
        Quasar App
      </quasar-toolbar-title>
    </div>

    <div class="layout-view">
      <router-view class="layout-scroll-area"></router-view>
    </div>
  </quasar-layout>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>
