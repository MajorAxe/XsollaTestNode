<template lang="pug">
  el-menu.el-menu-vertical-demo(:default-active='activeTab')
    el-menu-item(index='1')
      router-link(:to="{ path: '/', exact: true }")
        i.el-icon-document
        |Добавить заказ
    el-menu-item(index='2')
      router-link(:to="{ path: '/list', exact: true }")
        i.el-icon-goods
        |Список заказов
</template>

<script>
  export default {
    name: 'Sidebar',
    computed: {
      activeTab () {
        if (this.$route.path === '/') return '1'
        return '2'
      }
    }
  }
</script>

<style lang="stylus">
  .el-menu-item
    text-align center
    padding 0 !important
    height auto !important
  .el-menu a
    display inline-block
    width 100%
    color inherit
    text-decoration none
</style>