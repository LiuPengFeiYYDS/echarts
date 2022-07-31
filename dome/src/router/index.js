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
  },
  {
    path: '/hot',
    name: 'hot',
    component: () => import('../views/HotPage.vue')
  },
  {
    path: '/Pank',
    name: 'Pank',
    component: () => import('../views/RankPage.vue')
  },
  {
    path: '/Map',
    name: 'Map',
    component: () => import('../views/MapPage.vue')
  },
  {
    path: '/ScreenPage',
    name: 'ScreenPage',
    component: () => import('../views/ScreenPage.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
