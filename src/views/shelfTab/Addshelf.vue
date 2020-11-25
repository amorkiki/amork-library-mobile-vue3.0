<template>
  <div>
  
    <nav class="nav">
      <button @click="cancelAdd">取消</button>
      <div>书架名称</div>
      <button @click="confirmAdd">确定</button>
    </nav>
    <div class="add-input">
      <van-field
        name="shelf_name"
        placeholder="输入书架名"
        input-align="center"
        auto-focus="true"
        autosize
        confirm-type="确定"
        custom-style="custom"
        size="large"
        v-model="shelf_name"
      />
    </div>
  </div>
</template>
<script>
import {onMounted, reactive,toRefs} from 'vue'
import {useRouter} from 'vue-router'
import {Field,Toast} from 'vant'
import {addShelf} from '@/api/index'
export default {
  name:'VantComponent',
  components:{
    [Field.name]:Field,
    [Toast.name]:Toast
  },
  setup(){
    const router = useRouter()
    const state=reactive({
      shelf_name:''
    })
    const confirmAdd=async ()=>{
      // console.log(state.shelf_name)
      let shelf = state.shelf_name
      const res = await addShelf({shelf_name:shelf})  //直接填shelf_name或者shelf是错误的，必须用json
      // console.log(res)
      Toast('添加成功~')
      router.go(-1)
    }
    const cancelAdd=()=>{
      state.shelf_name=''
      router.go(-1)
    }

    return{
      ...toRefs(state),
      confirmAdd,
      cancelAdd
    }
  }
  
}
</script>
<style lang="less" scoped>
.nav{
  width: 100vw;
  height: 8vh;
  box-sizing: border-box;
  padding: 0 5%;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  >button{
    font-size:8px;
    border: none;
    background-color: #fff;
  }
  >button:nth-child(1){
    color:#ccc;
  }
  >div{
    line-height: 8vh;
  }
}
.add-input{
  width: 100vw;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(50%);
  
}
</style>