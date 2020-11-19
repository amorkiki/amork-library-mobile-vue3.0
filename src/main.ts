import { createApp } from 'vue'
import App from './App.vue'
// import axios from 'axios'
import router from './router'
import store from './store'
import '../src/assets/css/global.css'
import '../src/assets/font/iconfont.css'
import './assets/font/iconfont.js'

// 通过axios请求拦截器，添加token
// axios.interceptors.request.use(config => {
//   console.log(config)
//   config.headers.Authorization = window.sessionStorage.getItem('token')
//   return config
// })

// createApp(App).use(axios)

// axios挂载到vue的原型对象上
// createApp.prototype.axios = axios

createApp(App).use(store).use(router).mount('#app')


