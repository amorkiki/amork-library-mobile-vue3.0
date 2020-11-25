<template>
    <div>
      <button @click="actionShow" :class=" index ? 'add-btn' :'add-box'" > <i class="iconfont icon-jiahao1"></i></button>
      <van-action-sheet
      :show="show"
      :actions="actions"
      cancel-text="取消"
      close-on-click-action
      @cancel="onCancel"
      @select="selectSheet"
      />
      
    </div>
</template>
<script>
import {reactive,inject,toRefs} from 'vue'
import { ActionSheet} from 'vant';
import {useRouter} from 'vue-router'
export default {
  props:{
    index:Boolean
  },
  name: 'VantComponent',
  components:{
    [ActionSheet.name]: ActionSheet
  },
  setup(){
    const router=useRouter()
    const state=reactive({
      show:false,
      actions: [{ name: '添加书籍',disabled:'true' },{ name: '扫码藏书' }, { name: '搜索书籍' }, { name: '手动录入' }],
    })
    const actionShow = ()=>{
      state.show=true
    }

     // cancel btn
    const onCancel=()=>{
      state.show=false
    }
    const selectSheet=(ac,i)=>{
      // console.log(ac ,i) //Proxy {name: "手动录入"} , 3
      if (i == 3){
        router.push('/handadd')
      }
    }
    return {
      ...toRefs(state),
      actionShow,
      onCancel,
      selectSheet,
    }
  }
}
</script>
<style lang="less" scoped>
.add-btn{
  position: fixed;
  right: 3%;
  bottom: 12%;
  border:1px solid #DDB69D;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  color: #EDF1F0;
  background-color: #E7BEA7;
  box-shadow: 1px 2px 2px 2px rgba(225, 225, 225,.6);
  .icon-jiahao1:before{
    position: absolute;
    left: 17px;
    top: 15px;
  }
}
.add-box{
  float: left;
  width: 20vw;
  border: 0.5px solid #eee;
  border-radius: 3px;
  color: #8C8D8E;
  background-color: #eee;
  height: 15vh;
  margin-left: 10vw;
  margin-bottom: 5vh;
}
</style>