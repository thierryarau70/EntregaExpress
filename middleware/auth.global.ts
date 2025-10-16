import { useAuthStore } from '@/stores/auth'

export default defineNuxtRouteMiddleware((to) => {
    const auth = useAuthStore()

    const publicPages = ['/', '/login', '/register']
    if (publicPages.includes(to.path)) return

    if (!auth.isAuthenticated()) {
        return navigateTo('/login')
    }

    if (auth.isAuthenticated() && to.path === '/login') {
        return navigateTo('/deliveries/new')
    }
})
