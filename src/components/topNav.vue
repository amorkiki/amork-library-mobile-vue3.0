<template>
  <div class="navbar">
    <div class="title">{{title}}</div>
    <i v-show="title === '书桌'" class="iconfont icon-sousuo search-btn"></i>
  </div>
</template>
<script>
import {reactive,toRefs,inject} from 'vue'
export default {
  setup(){
    const title=inject('title')
    const state = reactive({
      title
    })
    return {
      ...toRefs(state)
    }
  }
  
}
</script>
<style lang="less" scoped>
.navbar{
  position: relative;
  width: 100%;
  height: 46px;
  // background-color: #eee;
  .title{
    width:100%;
    text-align: center;
    line-height: 46px;
    // font-weight: 700;
  }
  .search-btn{
    position: absolute;
    right: 15px;
    top:10px;
  }
  
}
</style>