<template>
  <div class="page">
  <!--导航栏-->
    <top-nav></top-nav>
    <!--占位盒子-->
    <div class="box"></div>
  <!--列表-->
    <book-list :list="bookList" ></book-list>
    <div class="box"></div>
  <!--添加按钮-->
  <add-btn :index='true'></add-btn>  
  <!--底部导航栏-->
    <bottom-nav></bottom-nav>
  </div>
</template>

<script>
import {reactive,toRefs,onMounted,provide} from 'vue'
import { setup } from 'vue-class-component'
import {useStore} from 'vuex'
import {getBookList} from '@/api/index'
import TopNav from '@/components/topNav'
import AddBtn from '@/components/addBtn'
import BottomNav from '@/components/bottomNav.vue'
import BookList from '@/components/bookList.vue'

export default {
  components:{
    TopNav,
    BottomNav,
    AddBtn,
    BookList
  },
  setup(){
    const state=reactive({
      userInfo:useStore().getters.getUserInfo,
      bookList:[]
    })
    // 请求图书列表
    const getBookListData= async()=>{
      const {data:res} = await getBookList({ role : 'manager', id : '5f3d469cf6f9b8cd2e0e0c2d'})
      // console.log(res.data)
      state.bookList = res.data
    }

    onMounted(() => {
      getBookListData()
    })
     // 传递数据给子组件
    provide('title', '书桌')

    return {
      ...toRefs(state)
    }
  }
}
</script>
<style scoped lang="less">
.box{
  height: 8vh;
  width: 100vw;
}

</style>
