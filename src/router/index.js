import Vue from 'vue';
import Router from 'vue-router';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import Login from '../views/login2';
import HomePage from '../views/homepage';
import Main from '@/views/main.vue';
import Profile from '@/views/profile.vue';
import ChangePassword from '@/views/change-password';
import DetailOrder from '@/views/detail-order2.vue';
Vue.use(Vuetify);
Vue.use(Router);
let routers = [

    {
        path: '/detail',
        name: 'Detail',
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
let router = new Router(

    {
        mode: 'history',
        routes: routers
    });
router.beforeEach((to, from, next) => {
    if (routers.find(item => item.path == to.path)) {
        console.log(localStorage.getItem('access_token'));
        if (to.path !== '/login' && !localStorage.getItem('access_token')) {
            next({ path: '/login' })
        } else {
            next()
        }
    } else {
        next({ path: '/main' })
    }
})
export default router;
