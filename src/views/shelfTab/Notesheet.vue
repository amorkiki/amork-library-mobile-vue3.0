<template>
  <div class="page">
    <!--导航栏-->
    <top-nav></top-nav>
    <!--导航占位盒子-->
    <div class="box"></div>
    <!--顶部数据span-->
    <div class="b-datas">
      <div>共藏{{bookInfo.length}}本书</div>
      <button @click="show=true" style="border:none;background:none">编辑</button>
    </div>
    <!--这个actionsheet如果放在上面的div里，布局会受到div里float left的影响-->
    <van-action-sheet
      :show="show"
      :actions="actions"
      cancel-text="取消"
      close-on-click-action
      @cancel="cancelEdit"
      @select="editSheet"
    />
      <!--添加按钮-->
      <add-btn></add-btn>
    <!--书架列表-->
    <div class="shelf" v-for="item in shelfInfo" :key="item._id">
      <div class="b1"></div>
      <div class="b1"></div>
      <div class="b1"></div>
      <div class="b1"></div>
      <div class="name">{{item.shelf_name}}</div>
    </div>
    <!--笔记列表-->
    <!--笔记本-->
    <div class="notebook" v-for="item in bookInfo" :key="item._id">
      <img src="https://tva1.sinaimg.cn/large/0081Kckwly1gl0q0wlvrjj305w08f0tg.jpg" :alt="item.b_title">
      <div class="title">{{item.b_name}}</div>
      <div class="note-icon"><van-icon name="bookmark" color="#D8AE98" /></div>
    </div> 
    <!--底部导航栏-->
    <div class="box2"></div>
    <bottom-nav></bottom-nav>
  </div>
  
</template>
<script>
import {reactive,toRefs,onMounted,provide} from 'vue'
import {Icon,ActionSheet} from 'vant'
import TopNav from '@/components/topNav'
import BottomNav from '@/components/bottomNav'
import AddBtn from '@/components/addBtn'
import {getBookList,getBookshelf} from '@/api/index'
import {useRouter} from 'vue-router'
export default {
  name:'VantComponent',
  components:{
    [ActionSheet.name]:ActionSheet,
    [Icon.name]:Icon,
    TopNav,
    BottomNav,
    AddBtn,
  },
  setup(){
    const router = useRouter()
    const state=reactive({
      bookInfo:[],
      shelfInfo:[],
      show:false,
      actions: [{ name: '书架设置',disabled:'true' },{ name: '新建书架' }, { name: '管理书架' }],
    })
      // 请求图书列表
    const getBookListData= async()=>{
      const {data:res} = await getBookList({ role : 'manager', id : '5f3d469cf6f9b8cd2e0e0c2d'})
      // console.log(res.data)
      state.bookInfo = res.data
    }
    //请求书架列表
    const getBookshelfData=async()=>{
      const res = await getBookshelf()
      // console.log(res.data)
      state.shelfInfo=res.data
      // console.log( state.shelfInfo)

    }

    onMounted(() => {
      getBookListData()
      getBookshelfData()
      
    })
    const cancelEdit=()=>{
      state.show=false
    }
    const editSheet=(ac,i)=>{
      if(i===1){
        // console.log('新建书架')
        router.push('/addshelf')
      }
      if(i===2){
        // console.log('管理书架')
        router.push('/editshelf')
      }
    }

    // 传递数据给子组件
    provide('title', '书摘')
    return{
      ...toRefs(state),

      cancelEdit,
      editSheet
    }
  }
}
</script>
<style scoped lang="less">
.box{
  height: 8vh;
  width: 100vw;
  z-index: 99;
}
.box2{
  height: 9vh;
  width: 100vw;
  float: left;
}
.b-datas{
  box-sizing: border-box;
  width: 90vw;
  height: 6vh;
  margin: 0 auto;
  color: #222222;
  font-size: 12px;
  :nth-child(1){
    float: left;
  }
  :nth-child(2){
    float: right;
  }
}
.notebook{
  float: left;
  position: relative;
  width: 20vw;
  border: 0.5px solid #eee;
  border-radius: 3px;
  color: #8C8D8E;
  background-color: #eee;
  height: 15vh;
  margin-left: 10vw;
  margin-bottom: 5vh;
  >img{
    border:none;
    height: 100%;
    width: 100%;
  }
  .title{
    width: 100%;
    // height: 12px;
    text-align: center;
    position: absolute;
    left: 0;
    bottom: -3vh;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color:#222222;
    font-size: 8px;
  }
  .note-icon{
    position: absolute;
    right: 4%;
    top: -4%;
    z-index: 1;
  }
}
.shelf{
  box-sizing: border-box;
  float: left;
  position: relative;
  width: 20vw;
  height: 15vh;
  margin-left: 10vw;
  margin-bottom: 5vh;
  .b1{
  width: 46%;
  height: 46%;
  float: left;
  background-color: #eee;
  margin:2%;
  border-radius: 2px;
  }
  .name{
    width: 100%;
    text-align: center;
    position: absolute;
    left: 0;
    bottom: -3vh;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color:#222222;
    font-size: 8px;
  }
}

</style>
