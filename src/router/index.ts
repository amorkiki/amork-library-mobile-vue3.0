import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Bookdesk from '../views/Bookdesk.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Bookdesk',
    component: () => import(/* webpackChunkName: "about" */ '../views/Bookdesk.vue')
  },
  {
    path: '/notesheet',
    name: 'Notesheet',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Notesheet.vue')
  },
  {
    path: '/me',
    name: 'Me',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Me.vue')
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  }
]



const router = createRouter({
  history: createWebHashHistory(),
  routes
})
// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  // console.log(tokenStr)  //ok
  if (!tokenStr) return next('/')
  next()
})

export default router
