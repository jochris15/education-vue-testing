import { createWebHistory, createRouter } from 'vue-router'

import BaseLayout from '@/views/BaseLayout.vue'
import CounterPage from '@/views/CounterPage.vue'
import CounterPinia from '@/views/CounterPinia.vue'

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
            }
        ],
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
