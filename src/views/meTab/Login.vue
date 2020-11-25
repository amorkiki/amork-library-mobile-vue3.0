<template>
  <div class="login">
  <i class="iconfont icon-shanchu back" @click="skipBack"></i>
    <text class="login-title">账号登录</text>
    <form :model="userInfo">
      <div class="input">
        <input type="text" placeholder="用户名" v-model="userInfo.name">
      </div>
      <div class="input">
        <input type="password" placeholder="密码" v-model="userInfo.pass">
      </div>
      <button class="login-btn" @click="login(userInfo)">注册/登录</button>
    </form>
  </div>
</template>
<script>
import {reactive,toRefs} from 'vue'
import{logIn} from '@/api/index'
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'


export default {

  setup(){
    const state = reactive({
      userInfo:{ //用户信息
        name: 'admin@123.com',
        pass: '123456'
      }  
    })
    const router = useRouter()
    const store = useStore()

    const login=  async (userInfo)=>{
      const res = await logIn({email:userInfo.name, password:userInfo.pass})
      // console.log(userInfo)  //Proxy {name: "admin@123.com", pass: "123456"}
      
      if (res.meta.status !== 200) {
          console.log('哎呀>_<没有登录成功')
        } else {
          console.log('成功登录喽~^_^~')
          console.log(res)
          window.sessionStorage.setItem('token', res.meta.token)
          // 用户信息存入vuex
          store.commit('setUserInfo',res.data)
          // 页面跳转
          router.push('/me')
        }
      // console.log(res.meta.token)

    }


    const skipBack=()=>{
      router.go(-1)
    }
    return {
      ...toRefs(state),
      skipBack,
      login
    }
  }
  
}
</script>
<style lang="less" scoped>
.login{
  width: 100%;
  height: 100%;

  .back{
    position: fixed;
    left: 12%;
    top: 8%;
  }

  .login-title{
    display: inline-block;
    margin: 100px auto 20px;
    line-height: 60px;
    height: 60px;
    width: 100%;
    text-align: center;
    font-weight: 700;
    font-size: 20px;
  }

  .input{
    display: block;
    margin: 0 auto;
    border-bottom:1px solid #E5E5E5;
    height: 60px;
    width:70% ;
  }

  .input input{
    border: none;
    margin: 20px 0;
  }
  .input input:focus{
    border-color: #fff;
    outline: 0;
  }

  .login-btn{
    display: block;
    margin: 15px auto;
    width:70% ;
    height: 40px;
    background-color: #3797D6;
    color: #fff;
    border:none;
    border-radius: 25px;
  }

}

</style>