import { createStore } from 'vuex'

export default createStore({
  state: {
    userInfo: {},
  },
  getters: {
    getUserInfo(state:any) {
      return state.userInfo
    },
    // getDatePicker(state: string) {
      // return state.datePicker
    // }
  },
  mutations: {
    setUserInfo(state: any,userInfo) {
      state.userInfo=userInfo
    },
  },
  actions: {
  },
  modules: {
  }
})
