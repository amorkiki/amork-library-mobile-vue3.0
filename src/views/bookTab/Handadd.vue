<template>
  <div class="page">
    <div class="nav">
      <van-icon class="icon-arr" @click="backArr" name="arrow-left" />
    </div>
    <!--基本信息-->
      <van-form @submit="onSubmit" :model="bookInfo">
      <van-button style="border:none" native-type="submit">保存</van-button>
      <div class="b_img">
        <van-field  class="b-cover" name="cover_img" clickable v-model="bookInfo.cover_img">
            <template #input >
                <van-uploader upload-text="本地上传"  max-count="1" />
            </template>
        </van-field>
    </div>
      <van-field
        v-model="bookInfo.b_name"
        name="b_name"
        label="书名"
        placeholder="请输入书名(必填)"
        input-align="right"
        :rules="[{ required: true, message: '书名为必填项' }]"
      />
      <van-field
        v-model="bookInfo.author"
        name="author"
        label="作者"
        placeholder="请输入作者名(必填)"
        input-align="right"
        :rules="[{ required: true, message: '作者名为必填项' }]"
      />
      <van-field
        v-model="bookInfo.publish"
        name="publish"
        label="出版社"
        input-align="right"
        placeholder="请输入出版社名称"
      />
      <van-field
        v-if="flag==true"
        name="publish_date"
        label="出版日期"
        placeholder="点击选择出版日期"
        readonly
        input-align="right"
        clickable
        v-model="bookInfo.publish_date"
        @click="pickDate"
      />
      <van-popup :show="showPubDatePicker" position="bottom" >
      <van-picker
        show-toolbar
        :columns="dateColumns"
        @cancel="showPubDatePicker = false"
        @confirm="confirmPubDate"
      />
      </van-popup>

      <van-field
        v-if="flag==true"
        v-model="bookInfo.isbn_num"
        name="isbn_num"
        label="ISBN"
        placeholder="请输入ISBN"
        input-align="right"
        type="digit"
      />
      <van-field
        v-if="flag==true"
        v-model="bookInfo.b_price"
        name="b_price"
        label="价格"
        placeholder="请输入价格"
        input-align="right"
        type="digit"
      />
      <div class="donw-up">
        <van-icon @click="flag=true" v-if="flag==false" name="arrow-down" />
        <van-icon @click="flag=false" v-else name="arrow-up" />  
      </div>
      <!--进度信息-->
      <div class="divide"></div>
      <div class="form-title">进度信息</div>
      <van-field
        v-model="bookInfo.pages"
        name="pages"
        label="总页码"
        placeholder="请输入总页码(必填)"
        input-align="right"
        type="digit"
      />
      <van-field
        v-model="bookInfo.current_p"
        name="current_p"
        label="当前页码"
        placeholder="请输入当前页码"
        input-align="right"
        type="digit"
      />
      <!--书籍管理-->
      <div class="divide"></div>
      <div class="form-title">书籍管理</div>
      <van-field
        readonly
        clickable
        v-model="bookInfo.r_status"
        name="r_status"
        label="阅读状态"
        placeholder="请选择阅读状态"
        input-align="right"
        @click="showStatusPicker = true"
      />
      <van-action-sheet
        v-model="bookInfo.r_status"
        :actions="rStatusActions"
        cancel-text="取消"
        description="书籍阅读状态"
        close-on-click-action
        :show="showStatusPicker"
        @cancel="cancelStatus"
        @select="selectStatus"
      />

      <van-field
        readonly
        clickable
        v-model="bookInfo.bookshelf"
        name="bookshelf"
        label="书架"
        placeholder="请选择书架"
        input-align="right"
        @click="showBookshelf"
      />
      <van-action-sheet
        v-model="bookInfo.bookshelf"
        :actions="bookshelfActions"
        cancel-text="+ 创建新书架"
        description="选择书架"
        close-on-click-action
        close-on-click-overlay
        :show="show"
        @cancel="addBookshelf"
        @select="selectBookshelf"

      />
    </van-form>
  </div>
</template>
<script>
import {onMounted, reactive,toRefs} from 'vue'
import { Icon,Form,Field,Uploader,Popup,Button,Picker,Toast,ActionSheet } from 'vant';
import {useRouter} from 'vue-router'
import {addBook,editBook,getBookshelf,getBook} from '@/api/index'
import getYear from'@/utils/getYear'
import getMonth from'@/utils/getMonth'
import getMonthDay from'@/utils/getMonthDay'
export default {
  name:'VantComponent',
  components:{
    [Icon.name]:Icon,
    [Form.name]:Form,
    [Field.name]:Field,
    [Uploader.name]:Uploader,
    [Button.name]:Button,
    [Picker.name]:Picker,
    [Popup.name]:Popup,
    [Toast.name]:Toast,
    [ActionSheet.name]:ActionSheet
  },
  setup(){
    const router = useRouter()
    const state=reactive({
      flag:false,
      bookInfo:{},
      showPubDatePicker: false,
      minDate: new Date(1500, 0, 1),
      maxDate: new Date(),
      dateColumns: [
        {
          values: [],
          defaultIndex: 3,
        },
        {
          values: [],
          defaultIndex: 2,
        },
        {
          values: [],
          defaultIndex: 1,
        }],
      showStatusPicker:false,
      rStatusActions:[{name:'正在阅读'},{name:'想读'},{name:'已读完'},{name:'弃读'},{name:'放回书架(闲置)'}],
      show:false,
      bookshelfActions:[]
    })
    // 返回箭头
    const backArr=()=>{
      router.go(-1)
    }
    // 上传封面
    // const afterRead=(file)=>{
    //   console.log(file)
    //  var cover_img= file.content.replace(/^data:image\/\w+;base64,/, '') // replace消除前缀，获取完整的base64码
      
    //   // state.bookInfo.cover_img=cover_img
    //   // console.log(state.bookInfo.cover_img)
    // }
    //判断是否为编辑操作
    onMounted(async()=>{
      // console.log(router.currentRoute.value.params.id)
      if(router.currentRoute.value.params.id){
        const {data:res} = await getBook(router.currentRoute.value.params.id)
        // console.log(res.data)
        state.bookInfo=res.data
      }
    })
    //提交表单
    const onSubmit=async (form)=>{
      // console.log(router.currentRoute.value.params.id)
      // if(router.currentRoute.value.params.id){
      //   console.log('edit')
      //   const b_id=router.currentRoute.value.params.id
      //   const res = await editBook({b_id,form})
      //   console.log(res)
      // }else{
        console.log('add')
        const res = await addBook({form})
        console.log(res)
        if(res.meta.status !== 200){
          Toast('添加失败,本书可能已被添加过啦~~')
        }else{
          Toast('添加成功>_<~~')
          router.go(-1)
        }
      // }
    }
    //点击选择出版时间拿到年月日数据
    const pickDate=()=>{
      state.showPubDatePicker=true
      state.dateColumns[0].values= getYear(1900)
      state.dateColumns[1].values= getMonth()
      state.dateColumns[2].values= getMonthDay()
    }
    //确认出版时间选择
    const confirmPubDate=(date) =>{
      // console.log(date) // ["周四", "晚上", "下午"]
      const str= date.join('')
      console.log(str)
      state.bookInfo.publish_date=str
      state.showPubDatePicker=false
    }
    // 取消选择状态
    const cancelStatus=()=>{
      state.showStatusPicker=false
    }
    // 确定选择状态
    const selectStatus=(ac,i)=>{
      // console.log(ac,i)
      state.showStatusPicker=false
      state.bookInfo.r_status=ac.name
    }
    // 点击弹出书架 
    const showBookshelf=async()=>{
      const res= await getBookshelf().then(res=>{
        // console.log(res.data)
        let arr =[]
        for(let i in res.data){
          arr.push(res.data[i].shelf_name)
        }
        // console.log(arr)
        let shelfArr=[]
        for(let i = 0;i<arr.length;i++){
          let j ={}
          j.name=arr[i]
          shelfArr.push(j)
        }
        // console.log(shelfArr)
        state.bookshelfActions=shelfArr
        state.show=true
      })
      
    }
    // 添加书架
    const addBookshelf=()=>{
      router.push('/addshelf')
    }
    // 选择书架
    const selectBookshelf=(ac,i)=>{
      state.bookInfo.bookshelf=ac.name
      state.show=false
    }
    return {
      ...toRefs(state),
      backArr,
      onSubmit,
      confirmPubDate,
      pickDate,
      cancelStatus,
      selectStatus,
      showBookshelf,
      addBookshelf,
      selectBookshelf
    }

  }
  
}
</script>
<style lang="less" scoped>
.page{
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
}
.nav{
  position: fixed;
  left: 0;
  top: 0;
  background-color: #fff;
  height:6vh;
  width: 100vw;
  z-index: 1;
  // line-height: 5vh;
  .icon-arr{
    margin:1vh 2vh;
  }

}
.van-button{
  position: fixed;
  right: 0;
  top:0;
  z-index: 99;
  background-color: #fff;
  color: #E7BEA7;
  }
.b_img{
  box-sizing: border-box;
  position: relative;
  width:100vw;
  height: 24vh;
  // background-color: yellow;
  .b-cover{
    position: absolute;
    top: 55%;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #F7F8FA;
    width: 12vh;
    height: 14vh;
    border-radius: 5px;
    overflow: hidden;
    padding: 2% 1%;
  }
}
.donw-up{
  text-align: center;
}
.divide{
  height: 2vh;
  width: 100vw;
  // background: yellow;
}
.form-title{
  box-sizing: border-box;
  padding: 0 3vw;
  width: 100vw;
  font-size: 16px;
  font-weight: 700;
}
.box{
  height:8vh;
  width: 100vw;
;
}
</style>