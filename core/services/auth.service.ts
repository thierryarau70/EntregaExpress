import { authRepository } from '../../core/repositories/auth.repository'


export function authService() {
    const repo = authRepository()
    return {
        async login(email: string, password: string) {
            return await repo.login({ email, password })
        },
    }
}