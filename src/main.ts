import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../src/assets/css/global.css'
import '../src/assets/font/iconfont.css'
import './assets/font/iconfont.js'

import { Popup, Cell, Search,Overlay,Tab,Tabs} from 'vant';

createApp(App).use(Popup).use(Cell).use(Search).use(Overlay).use(Tab).use(Tabs)

createApp(App).use(store).use(router).mount('#app')


