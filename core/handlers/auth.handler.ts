import { authService } from '../../core/services/auth.service'
import { useAuthStore } from '../../stores/auth'
import { useToast } from '../../composables/useToast'


export function useAuthHandler() {
    const svc = authService()
    const auth = useAuthStore()
    const toast = useToast()


    async function login(email: string, password: string) {
        try {
            const res = await svc.login(email, password)
            auth.setToken(res.token)
            auth.setUser(res.user)
            toast.success('Login realizado')
            await navigateTo('/deliveries/new')
        } catch (e: any) {
            toast.error('Falha no login', e?.response?.data?.message || 'Verifique suas credenciais')
        }
    }


    return { login }
}