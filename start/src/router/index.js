import { createWebHistory, createRouter } from 'vue-router'

import BaseLayout from '@/views/BaseLayout.vue'
import CounterPage from '@/views/CounterPage.vue'
import CounterPinia from '@/views/CounterPinia.vue'
import UserList from '@/views/UserList.vue'
import UserForm from '@/views/UserForm.vue'

const routes = [
    {
        path: '',
        redirect: '/counter'
    },
    {
        component: BaseLayout,
        children: [
            {
                path: '/counter',
                name: 'counter',
                component: CounterPage,
            },
            {
                path: '/counter-pinia',
                name: 'counter-pinia',
                component: CounterPinia,
            },
            {
                path: '/users',
                name: 'users',
                component: UserList,
            },
            {
                path: '/add',
                name: 'add',
                component: UserForm,
            }
        ],
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
