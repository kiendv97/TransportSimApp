import Vue from 'vue'
import Router from 'vue-router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
const Login = () => import('../views/login');
const HomePage  = () => import('../views/homepage');
const Main = () => import('@/views/main.vue');
const Profile =() => import('@/views/profile.vue');
const ChangePassword =() => import('@/views/change_password.vue');
const DetailOrder = () =>import('@/views/detail-order.vue');
Vue.use(Vuetify)
Vue.use(Router)
export default new Router(
  
    {
    mode: 'history',
    routes: [
        
        {
            path: '/detail',
            name: 'detail',
            component: DetailOrder
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/homepage',
            name: 'HomePage',
            component: HomePage
        },
        {
            path: '/main',
            name: 'Main',
            component: Main
        },
        {
            path: '/profile',
            name: 'Profile',
            component: Profile
        },
        {
            path: '/change-password',
            name: 'change Password',
            component: ChangePassword
        }
    ]
})
