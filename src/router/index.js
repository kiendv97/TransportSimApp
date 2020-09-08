import Vue from 'vue';
import Router from 'vue-router';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import Login from '../views/login';
import HomePage from '../views/homepage';
import Main from '@/views/main.vue';
import Profile from '@/views/profile.vue';
import ChangePassword from '@/views/change_password.vue';
import DetailOrder from '@/views/detail-order.vue';
Vue.use(Vuetify);
Vue.use(Router);
let router = new Router(

    {
        mode: 'history',
        routes: [

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
    });

export default router;
