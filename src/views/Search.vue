<template>
  <div class="page">
    <van-search show-action v-model="value" placeholder="搜索本地书籍或笔记" @search="onSearch"
    @cancel="onCancel"></van-search>
    <van-tabs v-model="active" @click="onClick" swipeable color="#E7BEA7">
      <van-tab title="书籍">
        <book-list :list="searchbook"></book-list>
      </van-tab>
      <van-tab title="笔记">内容 2</van-tab>
    </van-tabs>
  </div>
</template>
<script>
import {reactive, toRefs,onMounted} from 'vue'
import {useRouter} from 'vue-router'
import {Search,Toast,Tab,Tabs} from 'vant';
import BookList from '@/components/bookList.vue';
import {searchBookList} from '@/api/index'
export default {
  name: 'VantComponent',
  components:{
    BookList,
    [Search.name]: Search,
    [Toast.name]: Toast,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  },
  setup(){
    const router = useRouter()
    const state=reactive({
      value:"",
      active: 2,
      title:'',
      searchbook:[]
    })

    const onSearch= async (query)=> {
      // console.log(val)
      const {data:res} = await searchBookList(query)
      console.log(res)
      if (res.data.length === 0){
        Toast('没找到呀~');
      }else{
        state.searchbook=res.data
      }
    }
    const onCancel=(val)=> {
      // Toast('取消');
      router.go(-1)
    }

    const onClick= (name, title)=> {
      Toast(title);
    }

    return {
      ...toRefs(state),
      onSearch,
      onCancel,
      onClick
    }
  }
}
</script>
<style lang="less" scoped>
</style>