import axios from 'axios'


export function useApi() {
    const { public: { apiBase } } = useRuntimeConfig()
    const api = axios.create({ baseURL: apiBase, withCredentials: true })


// Token via cookie
    const token = useCookie<string | null>('auth_token')
    api.interceptors.request.use((req) => {
        if (token.value) req.headers.Authorization = `Bearer ${token.value}`
        return req
    })


    api.interceptors.response.use(
        (res) => res,
        (err) => {
// Padronize logs/tratamento aqui
            return Promise.reject(err)
        },
    )


    return api
}