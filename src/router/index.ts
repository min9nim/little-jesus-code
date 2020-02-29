import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import createLogger from 'if-logger'

const logger = createLogger().addTags('store')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index,
  },
  {
    path: '/code',
    name: 'code',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "code" */ '../views/Code.vue'),
  },
  {
    path: '/list',
    name: 'list',
    component: () => import(/* webpackChunkName: "list" */ '../views/List.vue'),
  },
]

logger.verbose('process.env.BASE_URL:', process.env.BASE_URL)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
