<template>
  <div>
    <nav class="nav">
      <van-icon @click="goBack" name="arrow-left" />
      <div class="notes-num">书摘(2条)</div>
      <van-icon name="share-o" />
      <van-icon @click="deleteBtn" name="delete" />
      <van-icon name="ellipsis" />
    </nav>
    <!--书籍信息-->
    <div class="book-info">
      <div class="title">书籍信息</div>
      <div class="book-detail">
        <div class="above-info">
          <div><img src="https://tva1.sinaimg.cn/large/0081Kckwgy1gl3ruy2umij30u016a15r.jpg" alt=""></div>
          <div>
            <div class="book-main">
              <div class="b-title">{{bookDetail.b_name}}<button class="b-status">正在读</button></div>
            </div>
            <div class="book-sub">
              <div class="sub">作者：{{bookDetail.author}}</div>
              <div class="sub">出版社：{{bookDetail.publish}}</div>
              <div class="sub">出版时间:</div>
            </div>
          </div>
        </div>
        <div class="below-btns">
          <button>记录进度</button>
          <button>记录书摘</button>
          <button>编辑信息</button>
          <button>放回书架</button>
        </div>
      </div>
    </div>
    <!--阅读报告-->
    <div class="read-info">
    <div class="title">阅读报告</div>
    <div>
      <div class="circle">
        <van-circle :current-rate="bookDetail.progress" layer-color="#F9F1DC" color="#E7BEA7" :stroke-width="90" :speed="100" :text="bookDetail.progress+'%'" />
      </div>
      <div class="notice">
        <van-notice-bar
          left-icon="volume-o"
          text="与书为友 不见忧愁，与书为伴 情境恬淡。立即开始阅读吧~"
          background="#F7F8FA"
          color="#E7BEA7"
        />
      </div>
    </div>
    </div>
    <!--按钮点击后的弹框-->
  </div>
</template>
<script>
import {reactive,toRefs,onMounted} from 'vue'
import {Icon,Circle,NoticeBar,Toast,Dialog} from 'vant'
import {useRouter} from 'vue-router'
import {getBook,deleteBook} from '@/api/index'
export default {
  name:'VantComponent',
  components:{
    [Icon.name]:Icon,
    [Circle.name]:Circle,
    [NoticeBar.name]:NoticeBar,
    [Toast.name]:Toast,
    [Dialog.name]:Dialog
  },
  
  setup(){
    const router = useRouter()
    const state = reactive({
      currentRate:13,
      bookDetail:[]

    })

    const goBack=()=>{
      router.go(-1)
    }
    onMounted(() => {
      getBookData()
      // console.log(router.currentRoute.value.params.id)
    })
    // 获取图书明细
    const getBookData=async()=>{
      const {data:res} = await getBook(router.currentRoute.value.params.id)
      console.log(res)
      if(res.meta.success===true){
        state.bookDetail=res.data
      }else{
        Toast('获取图书失败')
      }
    }
    // 点击删除按钮
    const deleteBtn=()=>{
      Dialog.confirm({
        title: '删除书籍',
        message: '书籍删除后，该书籍下的所有数据将被清空哦~',
        confirmButtonColor:'#E7BEA7',
        cancelButtonColor:'#ccc',
      })
      .then(async() => {
          // on confirm
          // console.log(router.currentRoute.value.params.id)
          await deleteBook(router.currentRoute.value.params.id) 
          router.go(-1)
        }).then(()=>{
          Toast('成功删除~~')
        })
        .catch((err) => {
          err
        });
    }
    return{
      ...toRefs(state),
      goBack,
      deleteBtn,
      deleteBook
      
    }

  }
}
</script>
<style lang="less" scoped>
.nav{
  width:100vw;
  height: 8vh;
  box-sizing:border-box;
  padding: 0 5%;
  display: flex;
  justify-content: space-between;
  .van-icon{
    line-height: 8vh;
  }
  .van-icon:nth-child(1){
    margin-right:38vw;
  }
  >div{
    font-size: 8px;
    line-height: 8vh;
  }
}
.book-info,
.read-info{
  box-sizing: border-box;
  margin: 0 5vw;
  width: 90vw;
  border-bottom: 1px solid #eee;
  .title{
    height: 6vh;
    font-size: 18px;
    line-height: 6vh;
  }
}
.book-info{
  .book-detail{
    display: flex;
    flex-direction: column;
    .above-info{
      >div:nth-child(1){
        float: left;
        width: 30%;
        height: 18vh;
        border: 1px solid #eee;
        border-radius:3px;
        overflow: hidden;
        >img{
          width: 100%;
          height: 100%;
        }      
      }
      >div:nth-child(2){
        float: right;
        width: 60vw;
        height: 18vh;
        .book-main{
          height: 6vh;
          margin-bottom:1vh;
          .b-title{
            float: left;
            >button{
            border: none;
            font-size: 10px;
            color: #fff;
            border-radius:5px;
            margin-left: 2vw;
            background-color: #E7BEA7;
          }
          }
          
          
        }
        .book-sub{
          font-size: 8px;
          color: #ccc;
        }
      }
    }
    .below-btns{
      display: flex;
      justify-content: space-between;
      margin:2vh 0;
      >button{
        border:none;
        font-size: 8px;
        background-color: #E7BEA7;
        color:#fff;
        border-radius:5px;
        padding: 2% 4%;

      }
    }
  }
}
.read-info{
  box-sizing: border-box;
  .circle{
    width: 30vw;
    margin:3vh auto;
  }
  
}
</style>