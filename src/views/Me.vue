<template>
  <div>
  <!--导航栏-->
    <top-nav></top-nav>
  <!--点我登录-->
  <div class="login">
    <label @click="skipTplogin">
    <img class="avatar" src="https://tva1.sinaimg.cn/large/0081Kckwly1gki6rsg52vj31400u07wi.jpg" alt="">
    <div class="userName">{{userInfo.name ? userInfo.name : '点我登录'}}</div>
    </label>
  </div>
  <!--底部导航栏-->
  <bottom-nav></bottom-nav>
  </div>
  
</template>
<script>
import {reactive,toRefs,onMounted,provide} from 'vue'
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'
import TopNav from '@/components/topNav'
import BottomNav from '@/components/bottomNav.vue'
export default {
  components:{
    TopNav,
    BottomNav
  },

  setup(){
    const state=reactive({
      userInfo:useStore().getters.getUserInfo
    })

    // 编程式导航
    const router = useRouter()

    const skipTplogin=()=>{
      router.push('/login')
    }
    // 传递数据给子组件
    provide('title', '个人中心')

    return {
      ...toRefs(state),
      skipTplogin
    }
  }

  
  
}
</script>
<style scoped lang="less">
.login{
  width: 100%;
  height: 300px;
  .avatar{
    display: block;
    width: 80px;
    height: 80px;
    border-radius: 40px;
    margin:50px auto 0;
  }
  .userName{
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
}
</style>
