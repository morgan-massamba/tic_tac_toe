import { createRouter, createWebHistory } from 'vue-router'
import Lobby from '../components/Lobby.vue'

const routes = [
  {
    path: '/',
    name: 'Lobby',
    component: Lobby
  },
  {
    path: '/board',
    name: 'Board',
    component: () => import('../components/Board.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
