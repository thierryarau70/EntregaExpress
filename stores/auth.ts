import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as null | { name: string; email: string },
        token: null as string | null,
    }),

    actions: {
        // Login amocado
        async loginMock(email: string, password: string) {
            // Simula atraso da API
            await new Promise(res => setTimeout(res, 500))

            if (email === 'thierry@gmail.com' && password === '1234') {
                this.user = { name: 'Thierry Araújo', email }
                this.token = 'mocked-token-1234'
                return true
            }
            throw new Error('Credenciais inválidas')
        },

        logout() {
            this.user = null
            this.token = null
        },

        isAuthenticated() {
            return !!this.token
        },
    },
})
