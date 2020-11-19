<template>
  <div class="bottom-bar">
    <div class="nav-desk" @click="skipToDesk">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-shuzhuo"></use>
      </svg>
      <div>书桌</div>
    </div>

    <div class="nav-notes" @click="skipToNotes">
      <svg class="notes" aria-hidden="true">
        <use xlink:href="#icon-biji"></use>
      </svg>
      <div>书摘</div>
    </div>
    <div  class="nav-me" @click="skipToMe">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-wode"></use>
      </svg>
      <div>我的</div>
    </div>
    
  </div>
</template>
<script>
import {reactive,inject,toRefs} from 'vue'
import {useRouter} from 'vue-router'
export default {
  setup(){

    // 编程式导航
    const router = useRouter()

    const skipToDesk=()=>{
      router.push('/')
    }
    const skipToNotes=()=>{
      router.push('/notesheet')
    }
    const skipToMe=()=>{
      router.push('/me')
    }

    return{
      skipToDesk,
      skipToNotes,
      skipToMe
    }
    
  }
}
</script>
<style lang="less" scoped>
.icon {
  width: 30px;
  height: 30px;
  fill: currentColor;
  overflow: hidden;
}
.notes{
  box-sizing: border-box;
  width: 25px;
  height: 25px;
  fill: currentColor;
  overflow: hidden;
  margin: 2px;
  
}
.bottom-bar{
  position: fixed;
  bottom: 0;
  height: 58px;
  display: flex;
  width:100% ;
  background-color: #fff;
  box-shadow: -2px 1px 1px 3px rgba(225, 225, 225, .5);
  .nav-desk,
  .nav-notes,
  .nav-me{
    text-align: center;
    color: #A5AEB7;
    font-size: 12px;
    flex: 1;
    margin-top: 5px;
    
  }
  // .nav-notes{
  //   float: left;
  // }
  // .nav-me{
  //   float: left;
  // }
}
</style>