<template>
  <div class="page">
    <div class="nav">
      <van-icon class="icon-arr" @click="backArr" name="arrow-left" />
    </div>
    <!--基本信息-->
      <van-form @submit="onSubmit" :model="newBook">
      <van-button style="border:none" native-type="submit">保存</van-button>
      <div class="b_img">
        <div> 
            <van-field  name="b_img" label="点击上传封面">
                <template #input>
                    <van-uploader v-model="newBook.b_img" />
                </template>
            </van-field>
        </div>
    </div>
      <van-field
        v-model="newBook.b_name"
        name="b_name"
        label="书名"
        placeholder="请输入书名(必填)"
        input-align="right"
        :rules="[{ required: true, message: '书名为必填项' }]"
      />
      <van-field
        v-model="newBook.author"
        name="author"
        label="作者"
        placeholder="请输入作者名(必填)"
        input-align="right"
        :rules="[{ required: true, message: '作者名为必填项' }]"
      />
      <van-field
        v-model="newBook.publisher"
        name="publisher"
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
        :value="newBook.publish_date"
        @click="show = true"
      />
      <van-calendar color="#E7BEA7" :show="show" :min-date="minDate" :max-date="maxDate" @confirm="confirmPubDate"/>

      <van-field
        v-if="flag==true"
        v-model="newBook.isbn"
        name="isbn"
        label="ISBN"
        placeholder="请输入ISBN"
        input-align="right"
      />
      <van-field
        v-if="flag==true"
        v-model="newBook.b_price"
        name="b_price"
        label="价格"
        placeholder="请输入价格"
        input-align="right"
      />
      <div class="donw-up">
        <van-icon @click="flag=true" v-if="flag==false" name="arrow-down" />
        <van-icon @click="flag=false" v-else name="arrow-up" />  
      </div>
      <!--进度信息-->
      <div class="divide"></div>
      <div class="form-title">进度信息</div>
      <van-field
        v-model="newBook.cate_Name"
        readonly
        clickable
        input-align="right"
        :value="newBook.cate_Name"
        name="cate_Name"
        label="书籍类型"
        placeholder="点击选择书籍类型"
      />
      <van-popup :show="showPickBook" position="bottom">
        <van-picker
          show-toolbar
          :columns="bookCate"
          @confirm="confirmBookCate"
          @cancel="showPickBook = false"
        />
      </van-popup>
      <van-field
        v-model="newBook.pages"
        name="pages"
        label="总页码"
        placeholder="请输入总页码(必填)"
        input-align="right"
      />
      <van-field
        v-model="newBook.current_p"
        name="current_p"
        label="当前页码"
        placeholder="请输入当前页码"
        input-align="right"
      />
      <!--书籍管理-->
      <div class="divide"></div>
      <div class="form-title">书籍管理</div>
      <van-field
        v-model="newBook.r_status"
        name="r_status"
        label="阅读状态"
        placeholder="请选择阅读状态"
        input-align="right"
      />
      <van-field
        v-model="newBook.b_desk"
        name="b_desk"
        label="书架"
        placeholder="请选择书架"
        input-align="right"
      />
    </van-form>
  </div>
</template>
<script>
import {reactive,toRefs} from 'vue'
import { Icon,Form,Field,Uploader,Button,Picker,Calendar,Popup,Toast } from 'vant';
import {useRouter} from 'vue-router'
import {addBook} from '@/api/index'
export default {
  name:'VantComponent',
  components:{
    [Icon.name]:Icon,
    [Form.name]:Form,
    [Field.name]:Field,
    [Uploader.name]:Uploader,
    [Button.name]:Button,
    [Picker.name]:Picker,
    [Calendar.name]:Calendar,
    [Popup.name]:Popup,
    [Toast.name]:Toast
  },
  setup(){
    const router = useRouter()
    const state=reactive({
      flag:false,
      newBook:{},
      show: false,
      minDate: new Date(1500, 0, 1),
      maxDate: new Date(),
      showPickBook:false,
      bookCate:['1','2','3'],
    })
    const backArr=()=>{
      router.go(-1)
    }
    const onSubmit=async (form)=>{
      // console.log(form)
      const res = await addBook({form})
      console.log(res)
      if(res.meta.status !== 200){
        Toast('添加失败,本书可能已被添加过啦~~')
      }else{
        Toast('添加成功>_<~~')
        router.go(-1)
      }
    }
    const confirmPubDate=(date) =>{
      console.log(date)
      state.show=false
    }
    const confirmBookCate=(cate)=>{
      console.log(cate)
      state.showPickBook=false
    }

    return {
      ...toRefs(state),
      backArr,
      onSubmit,
      confirmPubDate,
      confirmBookCate
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
  >div{
    position: absolute;
    top: 55%;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #ccc;
    width: 12vh;
    height: 14vh;
    border-radius: 5px;
    overflow: hidden;    
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