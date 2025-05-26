import { createWebHistory, createRouter } from 'vue-router'

import LoginPage from "@/views/LoginPage.vue";
import HomePage from "@/views/HomePage.vue";
import AddPage from '@/views/AddPage.vue';
import BaseLayout from '@/views/BaseLayout.vue';
import DetailPage from '@/views/DetailPage.vue';

const routes = [
    {
        path: '',
        redirect: '/home'
    },
    {
        path: '/login',
        name: 'login  ',
        component: LoginPage,
        beforeEnter: () => {
            if (localStorage.email) {
                return { name: 'home' }
            }

            return null
        },
    },
    {
        component: BaseLayout,
        children: [
            { path: '/home', name: 'home', component: HomePage },
            { path: '/add', name: 'add', component: AddPage },
            { path: '/detail/:id', name: "detail", component: DetailPage }
        ],
        beforeEnter: () => {
            if (!localStorage.email) {
                return { path: 'login' }
            }

            return null
        },
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
