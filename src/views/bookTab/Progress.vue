<template>
  <div>
    <nav class="nav">
      <van-icon name="arrow-left" @click="goBack"/>
    </nav>
    <div class="main">
      <van-form action="" @submit="onSubmit" >
        <van-button class="confirm" native-type="submit">保存</van-button>
        <div class="progress-input">
          <van-field center input-align="center" name="now_p" v-model="now_p" disabled />
          <text>至</text>
          <van-field center input-align="center" name="current_p" v-model="current_p" />
        </div>
        <van-field class="radio" name="r_status" >
          <template #input>
            <van-radio-group v-model="r_status">
              <van-radio name="读完" checked-color="#E7BEA7">本书已读完</van-radio>
              <van-radio name="弃读" checked-color="#E7BEA7">弃读</van-radio>
              <van-radio name="闲置" checked-color="#E7BEA7">放回书架(闲置)</van-radio>
            </van-radio-group>
          </template>
      </van-field>
    
      </van-form>
      <button class="back" @click="goBack">退出</button>

    </div>
  </div>
</template>
<script>
import {Icon, Form,Field,RadioGroup, Radio,Button } from 'vant'
import {reactive,toRefs,onMounted} from 'vue'
import {useRouter} from 'vue-router'
import {getBook,editBook} from '@/api/index'
export default {
  name:'VantComponent',
  components:{
    [Icon.name]:Icon,
    [Form.name]:Form,
    [Field.name]:Field,
    [RadioGroup.name]:RadioGroup,
    [Radio.name]:Radio,
    [Button.name]:Button
  },
  setup(){
    const router= useRouter()
    const state=reactive({
      r_status:'',
      now_p:0,
      pages:0,
      current_p:null
    })

    onMounted(async()=>{
      console.log(router.currentRoute.value.params.id)
      const {data:res} = await getBook(router.currentRoute.value.params.id)
      console.log(res.data)
      state.r_status=res.data.r_status
      state.now_p=res.data.current_p
    })

    const goBack=()=>{
      router.go(-1)
    }
    const onSubmit=async (val)=>{
      console.log(val)//{now_p: "10", current_p: "12", r_status: "2"}
      const bid=router.currentRoute.value.params.id
      const res=await editBook(bid,val)
      console.log(res)
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
.main{
  margin-top: 3vh;
  box-sizing: border-box;
  padding: 0 5%;
  .confirm{
    border:none;
    position: fixed;
    right :1vw;
    top:1vh;
  }
  .progress-input{
    display: flex;
    justify-content: space-between;
    margin-bottom:3vh;
    .van-field{
      flex:3;
      background-color: #fafafa;
      border-radius:4px;
      height: 8vh;
      width:30vw;
      text-align: center;
    }
    >text{
      flex:1;
      line-height: 8vh;
      text-align: center;
    }
  }
  .radio{
    .van-radio{
      box-sizing: border-box;
      width: 100vw;
      margin:2vh 25%;
  }
  }
  .back{
    border: 1px solid #E7BEA7;
    color: #E7BEA7;
    border-radius: 4px;
    display:block ;
    width: 60%;
    height:5vh;
    margin: 3vh auto;
    background: #fff;
  }
}
</style>