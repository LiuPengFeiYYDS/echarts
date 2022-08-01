import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'ScreenPage',
    component: () => import('../views/ScreenPage.vue')
  },
  {
    path: '/seller',
    name: 'seller',
    component: () => import('../views/sellerPage.vue')
  },
  {
    path: '/trend',
    name: 'trend',
    component: () => import('../views/TrendPage.vue')
  },
  {
    path: '/hot',
    name: 'hot',
    component: () => import('../views/HotPage.vue')
  },
  {
    path: '/Rank',
    name: 'Rank',
    component: () => import('../views/RankPage.vue')
  },
  {
    path: '/Map',
    name: 'Map',
    component: () => import('../views/MapPage.vue')
  },
  {
    path: '/Stock',
    name: 'Stock',
    component: () => import('../views/StockPage.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
