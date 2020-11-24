<template>
  <div class="navbar">
    <div class="title">{{title}}</div>
    <i @click ="topSearch" v-show="title === '书桌'" class="iconfont icon-sousuo search-btn"></i>
  </div>
</template>
<script>
import {reactive,toRefs,inject} from 'vue'
import {useRouter} from 'vue-router'
export default {
  setup(){
    const router = useRouter()

    const title=inject('title')
    const state = reactive({
      title
    })

    const topSearch = ()=>{
      router.push('/search')
    }
    return {
      ...toRefs(state),
      topSearch
    }
  }
  
}
</script>
<style lang="less" scoped>
.navbar{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 8vh;
  background-color: #fff;
  z-index: 99;
  .title{
    width:100%;
    text-align: center;
    line-height: 46px;
    // font-weight: 700;
  }
  .search-btn{
    position: absolute;
    right: 8vw;
    top:1.2vh;
  }
  
}
</style>