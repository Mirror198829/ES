import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/async',
    name: 'Async',
    component: () => import('../views/async.vue')
  },
  {
    path: '/vue',
    name: 'Vue',
    component: () => import('../views/vue.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
