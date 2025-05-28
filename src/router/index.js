import { createRouter, createWebHistory } from 'vue-router'

// 懒加载页面
const Home = () => import('@/pages/Home.vue')
const LiveRoom = () => import('@/pages/LiveRoom.vue')

const routes = [
  { path: '/', component: Home },
  { path: '/liveRoom/:id', component: LiveRoom }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router