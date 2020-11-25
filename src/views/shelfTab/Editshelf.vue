<template>
  <div>
    <nav class="nav">
      <van-icon  @click="backGo" size="20"  name="arrow-left" />
      <div>书架分类</div>
    </nav>
    <div class="box"></div>
    <!--书架列表-->
    <div class="shelf-card" v-for="item in shelfInfo" :key="item._id">
      <div class="card-left"><img src="" alt=""></div>
      <div class="card-right">
        <div class="shelf-name">{{item.shelf_name}}</div>
        <div class="book-num">2本</div>
      </div>
    </div>
    <!--新增按钮-->
    <div class="box2"></div>
    <div class="bottom-btn"><van-button @click="addShelf" color="#F8C8B9" block>新增书架</van-button></div>
  </div>
</template>
<script>
import {Icon,Button} from 'vant'
import {useRouter} from 'vue-router'
import {getBookshelf} from '@/api/index'
import { reactive,toRefs,onMounted } from 'vue'
export default {
  name:'VantComponent',
  components:{
    [Icon.name]:Icon,
    [Button.name]:Button
  } , 
  setup(){
    const router = useRouter()
    const state=reactive({
      shelfInfo:[]
    })
    const backGo = ()=>{
      router.go(-1)
    }
    onMounted(async()=>{
      const res=await getBookshelf()
      // console.log(res)
      state.shelfInfo=res.data
    })
    const addShelf=()=>{
      router.push('/addshelf')
    }
    return{
      ...toRefs(state),
      backGo,
      addShelf
    }
  }
}
</script>
<style lang="less" scoped>
.box{
  width: 100vw;
  height: 8vh;
}
.box2{
  width: 100vw;
  height: 6vh;
  float: left;
}
.nav{
  position: fixed;
  left: 0;
  top:0;
  z-index: 99;
  width: 100vw;
  height: 8vh;
  box-sizing: border-box;
  padding: 0 5%;
  background-color: #fff;
  line-height: 8vh;
  text-align: center;
  .van-icon{
    float: left;
    line-height: 8vh;
  }
}
.shelf-card{
  float: left;
  box-sizing: border-box;
  padding:2vh 4vw 5vh 5vw;
  width: 90vw;
  height:20vh;
  margin: 3vh 5vw 0;
  background-color: #fff;
  border-radius:1vh;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, .2);
  display:flex;
  justify-content: space-between;
  .card-left{
    width: 16vw;
    height: 100%;
    background-color: #eee;
    border-radius: 1vw;
    overflow: hidden;
  }
  .card-right{
    box-sizing: border-box;
    padding: 3% 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .shelf-name{
      font-size: 18px;
    }
    .book-num{
      color:rgb(184, 181, 181);
      text-align: right;
    }
  }

}
.bottom-btn{
  box-sizing: border-box;
  width: 100vw;
  height: 6vh;
  position: fixed;
  left: 50%;
  bottom: 0;
  z-index: 99;
  transform: translateX(-50%);
  border-radius:1vw;
  overflow: hidden;
  padding:1vw;
  background: #fff;
  .van-button{
  width: 98vw;
  height: 100%;
  }
}

</style>