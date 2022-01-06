import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Blogs from '../views/Blogs.vue'
import BlogEdit from '../views/BlogEdit.vue'
import BlogDetail from '../views/BlogDetail.vue'
import ConTypeEdit from '../views/ConTypeEdit.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: {name: "Blogs"}
  },
  {
    path: '/blogs',
    name: 'Blogs',
    component: Blogs
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/blog/add',
    name: 'BlogAdd',
    component: BlogEdit,
    meta: {
      requireAuth: true
    }
  },{
    path: '/conType/add',
    name: 'ConTypeAdd',
    component: ConTypeEdit,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/blog/:recordId',
    name: 'BlogDetail',
    component: BlogDetail
  },
  {
    path: '/blog/:recordId/edit',
    name: 'BlogEdit',
    component: BlogEdit,
    meta: {
      requireAuth: false
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
