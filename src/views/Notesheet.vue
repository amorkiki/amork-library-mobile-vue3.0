<template>
  <div>
    <!--导航栏-->
    <top-nav></top-nav>
    <!--底部导航栏-->
    <bottom-nav></bottom-nav>
  </div>
  
</template>
<script>
import {reactive,toRefs,onMounted,provide} from 'vue'
import TopNav from '@/components/topNav'
import BottomNav from '@/components/bottomNav.vue'
export default {
  components:{
    TopNav,
    BottomNav
  },

  setup(){
    // 传递数据给子组件
    provide('title', '书摘')
  }
}
</script>
<style scoped lang="less">

</style>
