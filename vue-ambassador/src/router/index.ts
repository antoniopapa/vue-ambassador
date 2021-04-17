import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import Layout from '@/views/Layout.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import Profile from '@/views/Profile.vue';
import ProductsFrontend from '@/views/ProductsFrontend.vue';
import ProductsBackend from '@/views/ProductsBackend.vue';
import Stats from '@/views/Stats.vue';
import Rankings from '@/views/Rankings.vue';

const routes: Array<RouteRecordRaw> = [
    {path: '/login', component: Login},
    {path: '/register', component: Register},
    {
        path: '',
        component: Layout,
        children: [
            {path: '', component: ProductsFrontend},
            {path: '/backend', component: ProductsBackend},
            {path: '/profile', component: Profile},
            {path: '/stats', component: Stats},
            {path: '/rankings', component: Rankings},
        ]
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
