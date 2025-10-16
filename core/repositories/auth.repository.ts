import type { LoginPayload, LoginResponse } from '../../core/types/auth'
import { useApi } from '../../core/http/api'


export function authRepository() {
    const api = useApi()
    return {
        login: (payload: LoginPayload) => api.post<LoginResponse>('/auth/login', payload).then(r => r.data),
    }
}