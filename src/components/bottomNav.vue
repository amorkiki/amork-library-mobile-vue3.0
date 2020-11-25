<template>
  <div class="bottom-bar">
    <div class="nav-desk" @click="skipToDesk">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-shuzhuo"></use>
      </svg>
      <div :class="flag==1 ? 'active':'' ">书桌</div>
    </div>

    <div class="nav-notes" @click="skipToNotes">
      <svg class="notes" aria-hidden="true">
        <use xlink:href="#icon-biji"></use>
      </svg>
      <div :class="flag == 2 ? 'active': '' ">书摘</div>
    </div>
    <div  class="nav-me" @click="skipToMe">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-wode"></use>
      </svg>
      <div :class="flag==3 ? 'active':'' ">我的</div>
    </div>
    
  </div>
</template>
<script>
import {reactive,inject,toRefs} from 'vue'
import {useRouter} from 'vue-router'
export default {
  setup(){
    const state=reactive({
      flag:1
    })

    // 编程式导航
    const router = useRouter()

    const skipToDesk=()=>{
      state.flag=1
      router.push('/')
      // console.log(state.flag)
    }
    const skipToNotes=()=>{
      state.flag=2
      router.push('/notesheet')
      // console.log(state.flag)


    }
    const skipToMe=  ()=>{
      state.flag=3
      router.push('/me')
      // console.log(state.flag)

    }
    // const saveFlag=(flag)=>{
    //   window.sessionStorage.setItem('flag', flag)
    // }

    return{
      ...toRefs(state),
      skipToDesk,
      skipToNotes,
      skipToMe,
      // saveFlag
    }
    
  }
}
</script>
<style lang="less" scoped>
.active{
  color: #E7BEA7 ;
}
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
  z-index: 99;
  position: fixed;
  bottom: 0;
  height: 10vh;
  display: flex;
  justify-content: space-between;
  width:100vw ;
  background-color: #fff;
  box-shadow: -2px 1px 1px 3px rgba(225, 225, 225, .5);
  .nav-desk,
  .nav-notes,
  .nav-me{
    text-align: center;
    color: #A5AEB7;
    font-size: 10px;
    flex: 1;
    margin-top: 5px; 
  }
}
</style>