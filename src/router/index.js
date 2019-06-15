import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Ad from '@/components/Ads/Ad'
import AdList from '@/components/Ads/AdList'
import NewAd from '@/components/Ads/NewAd'
import Login from '@/components/Auth/Login'
import Registration from '@/components/Auth/Registration'
import Orders from '@/components/User/Orders'
import store from '../store'

Vue.use(Router)

const routerOptions = [
  { path: '', name: 'home', component: Home },
  { path: '/ad/:id', props: true, name: 'ad', component: Ad },
  { path: '/list', name: 'list', component: AdList, meta: { requiresAuth: true } },
  { path: '/new', ame: 'newAd', component: NewAd, meta: { requiresAuth: true } },
  { path: '/login', name: 'login', component: Login },
  { path: '/registration', name: 'Registration', component: Registration },
  { path: '/orders', name: 'Orders', component: Orders, meta: { requiresAuth: true } }
]

const router = new Router({
  mode: 'history',
  routes: [...routerOptions]
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = !(store.getters.user === null || store.getters.user === undefined)
  if (requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
