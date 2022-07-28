import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'seller',
    component: () => import('../views/sellerPage.vue')
  },
  {
    path: '/trend',
    name: 'trend',
    component: () => import('../views/TrendPage.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
