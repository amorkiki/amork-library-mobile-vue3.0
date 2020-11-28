<template>
  <div class="s-page">
    <nav class="nav">
      <van-icon name="arrow-left" @click="goBack"/>
    </nav>
    <van-form @submit="onSubmit">
      <van-button class="confirm" native-type="submit">保存</van-button>
      <div class="form-title">页码</div>
        <van-field
          v-model="page_num"
          name="page_num"
          type="digit"
          placeholder="请输入页码"
        />
      <div class="form-title">书摘/心得</div>
        <van-field
          v-model="snipping"
          autosize
          type="textarea"
          rows="4"
          name="snipping"
          placeholder="请输入内容..."
        />
    </van-form>
  </div>
</template>
<script>
import {Icon,Form,Field,Button} from 'vant'
import {reactive,toRefs,onMounted} from 'vue'
import {useRouter} from 'vue-router'
export default {
  name:'VantComponent',
  components:{
    [Icon.name]:Icon,
    [Form.name]:Form,
    [Field.name]:Field,
    [Button.name]:Button
  },
  setup(){
    const router = useRouter()
    const state = reactive({

    })
    const goBack=()=>{
      router.go(-1)
    }
    const onSubmit=(val)=>{
      console.log(val)
    }
    return {
      ...toRefs(state),
      goBack,
      onSubmit
    }
  }
  
}
</script>
<style lang="less" scoped>
.nav{
  width:100vw;
  height: 8vh;
  padding: 0 5%;
  box-sizing: border-box;
  .van-icon{
    line-height: 8vh;
  }
}
.van-form{
  padding: 1vh 5%;
  box-sizing: border-box;
  .form-title{
    font-size: 18px;
    margin: 2vh 0;
  }
  .van-field{
    background-color: #fafafa;
    border-radius:3px;
  }
  .confirm{
    border: none;
    position:fixed ;
    right: 1vw;
    top: 1vh;
  }
}
</style>