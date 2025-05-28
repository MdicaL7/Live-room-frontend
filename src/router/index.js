import { createRouter, createWebHistory } from 'vue-router'
console.log("API BASE:", import.meta.env.VITE_API_BASE)

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