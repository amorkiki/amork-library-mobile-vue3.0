<template>
  <div @click="goDetails(item._id)" class="book-list" v-for="item in list" :key="item._id">
      <div class="img"> <img src="https://tva1.sinaimg.cn/large/0081Kckwgy1gl3ruy2umij30u016a15r.jpg" /></div>
      <div class="b-details">
        <div class="b-title"><text>{{item.b_name.length>20? item.b_name.substr(0,20)+'...':item.b_name}}</text></div>
        <div class="progress">
          <div>阅读进度：{{item.current_p}}/{{item.pages}}</div>
          <div class="progress-bar"><div class="bar" :style="'width:'+(item.current_p/item.pages).toFixed(2)*100+'%'"></div></div>
          <text class="progress-num">{{(item.current_p/item.pages).toFixed(2)*100 >100 ? 100 :(item.current_p/item.pages).toFixed(2)*100 }}%</text>
        </div>
        <div class="btns">
        <button>记录进度</button>
        <button>记录书摘</button>
        <button>编辑此书</button>
        </div>
      </div>
    </div>
    <div class="box"></div>
</template>
<script>
import {reactive,toRefs,inject,onMounted} from 'vue'
import {useRouter} from 'vue-router'
export default {
  props: {
    list: Array,
  },
  setup(){
    const router = useRouter()
    const state=reactive({})

    const goDetails=(id)=>{
      // console.log(id)
      router.push(`/bookdetail/${id}`)
    }
    return {
      goDetails
    }

  }
  
}
</script>
<style lang="less" scoped>
.book-list{
  box-sizing: border-box; //去掉的话，topNav就不固定了 ？？？
  width: 100vw;
  height: 22vh;
  // background-color: yellow;
  padding: 0 4%;
  .img{
    float: left;
    width: 22vw;
    height: 14vh;
    background-color: #fff;
    border-radius: 8px;
    border: 1px solid #eee;
    overflow: hidden;
    margin-top: 1vh;
    >img{
      height: 100%;
      width: 100%;
    }
  }
  .b-details{
    box-sizing: border-box;
    float: left;
    flex-direction: column;
    display: flex;
    justify-content: space-between;
    margin-left: 3vw;
    margin-top: 1vh;
    height: 16vh;
    width: 64vw;
    // background-color: #fff;
    .b-title{
      flex: 1;
      padding-left: 3vw;
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
      color:#222222;
    }
    .progress{
      flex: 1;
      // margin-top: 1vh;
      color: #98A2AC;
      font-size: 10px;
      .progress-bar{
        margin:1vh 1vh 0 0;
        float: left;
        height: 0.6vh;
        width: 50vw;
        background-color: #F0F7FB;
        border-radius:5px ;
        .bar{
          width: 100%;
          height: 0.6vh;
          background-color: #E7BEA7;
          border-radius:5px ;
        }
      }
      text{
        float: left;
      }
    }
    .btns{
      flex: 1;
      display: flex;
      justify-content: space-between;
      >button{
        flex: 1;
        border:none;
        background-color: #E7BEA7;
        margin:2px;
        padding: 2px;
        font-size: 8px;
        color: #fff;
        border-radius: 8px;
      }
    }
  }
}
</style>