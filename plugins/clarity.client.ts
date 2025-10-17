// plugins/clarity.client.ts
export default defineNuxtPlugin(() => {
    // Não injeta nada automaticamente; só disponibiliza a função abaixo se você quiser
})

declare global {
    interface Window {
        clarity?: (...args: any[]) => void
        __clarityLoaded?: boolean
    }
}

export function useClarity() {
    const { public: { clarityId } } = useRuntimeConfig()
    if (!clarityId) return
    if (typeof window === 'undefined') return
    if (window.__clarityLoaded || typeof window.clarity === 'function') return

        ;(function (c: any, l: any, a: any, r: any, i: any, t?: any, y?: any) {
        c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) }
        t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i
        y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y)
    })(window, document, 'clarity', 'script', clarityId)

    window.__clarityLoaded = true
}
