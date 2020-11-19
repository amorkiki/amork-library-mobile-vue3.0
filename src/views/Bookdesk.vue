<template>
  <div class="page">
  <!--导航栏-->
    <top-nav></top-nav>
  <!--列表-->
    <div class="book-list" v-for="item in bookList" :key="item._id">
      <img src="https://tva1.sinaimg.cn/large/0081Kckwly1gkuggn63ooj304p06ngmm.jpg" />
      <div class="b-details">
        <div class="b-title"><text>{{item.b_name}}</text></div>
        <div class="progress">阅读进度：{{item.current_p}}/{{item.pages}}
        <div class="progress-bar"><div class="bar" :style="'width:'+(item.current_p/item.pages).toFixed(2)*100+'%'"></div></div>
        <div class="progress-num">{{(item.current_p/item.pages).toFixed(2)*100 == NaN ? 0 :(item.current_p/item.pages).toFixed(2)*100 }}%</div>
        </div>
        <div class="btns">
        <button>记录进度</button>
        <button>记录书摘</button>
        </div>
      
      </div>
    </div>

  <!--底部导航栏-->
  <bottom-nav></bottom-nav>
  <!--添加按钮-->
  <add-btn></add-btn>
  </div>
</template>
<script>
import {reactive,toRefs,onMounted,provide} from 'vue'
import { setup } from 'vue-class-component'
import {useStore} from 'vuex'
import {getBookList} from '@/api/index'
import TopNav from '@/components/topNav'
import BottomNav from '@/components/bottomNav.vue'
import AddBtn from '@/components/addBtn'
export default {
  components:{
    TopNav,
    BottomNav,
    AddBtn
  },
  setup(){
    const state=reactive({
      userInfo:useStore().getters.getUserInfo,
      bookList:[],
      progress_num:0
      
    })
    // 请求图书列表
    const getBookListData= async()=>{
      const {data:res} = await getBookList({ role : 'manager', id : '5f3d469cf6f9b8cd2e0e0c2d'})
      console.log(res.data)
      state.bookList = res.data
      state.progress_num=(res.data.current_p/res.data.pages).toFixed(2)
      
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
.book-list{
  display: flex;
  box-sizing: border-box;
  width: 100%;
  margin-top: 20px;
  height: 180px;
  // background-color: yellow;
  padding: 0 25px;
  >img{
    float: left;
    width: 110px;
    height: 80%;
    background-color: #CCDAFC;
    border-radius: 8px;
    border: 1px solid #eee;
  }
  .b-details{
    float: left;
    margin-left: 20px;
    height: 60%;
    width: 190px;
    background-color: #fff;
    .b-title{
      position: relative;
      height: 35px;
      // line-height: 30px;
      padding: 0 10px;
      font-size: 15px;
      >text{
        position: absolute;
        bottom: 0;
        left: 0;
        
      }
    }
    .progress{
      color: #98A2AC;
      font-size: 10px;
      margin-top: 10px;
      .progress-bar{
        float: left;
        margin-top: 6px;
        height:4px;
        border-radius: 3px;
        width: 78%;
        background-color: #F0F7FB;
        .bar{
          overflow: hidden;
          height: 4px;
          background-color:  #E7BEA7;
          border-radius: 3px;
          // border: 1px solid #DDB69D;
        }
      }
      .progress-num{
        float:left;
        margin-left: 3px;
        color: #98A2AC;
        font-size: 10px;  
      }
    }
    .btns button{
      border: none;
      background-color: #E7BEA7;
      margin-right: 27px;
      margin-top: 8px;
      padding: 5px 10px;
      font-size: 1px;
      color: #fff;
      border-radius: 5px;
    }

  }
}

</style>
