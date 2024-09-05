import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import body from "../components/app-body.vue"
import AppProje from "@/components/app-proje.vue"
import AppTask from "@/components/app-task.vue"
import AppSetting from "@/components/app-setting.vue"
import loginPage from "../components/login-page.vue"
 import AppLayout from "../components/app-layout"
 import LayoutLogin  from "../components/layout-login.vue"
 import users from "@/components/users.vue"
const routes = [
  {
    path: '/',
    name: 'login', 
    component: loginPage,
     meta: { layout: LayoutLogin }


  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: body,
     meta: { layout: AppLayout}

  },
  {
    path: '/users',
    name: 'users',
    component: users,
     meta: { layout: AppLayout}

  },
  {
    path :'/proje',
    name : 'proje',
    component :AppProje,
    meta: { layout: AppLayout}

  },
  {
    path :'/task',
    name : 'task',
    component :AppTask ,
    meta: { layout: AppLayout}

  },
  {
    path :'/setting',
    name : 'setting',
    component :AppSetting,
    meta: { layout: AppLayout}

  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
