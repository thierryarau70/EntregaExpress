// composables/useAnalytics.ts
export const useAnalytics = () => {
    const nuxt = useNuxtApp()
    const track = (name: string, props?: Record<string, any>) => nuxt.$track?.(name, props)
    const set = (key: string, value: string | number | boolean) => {
        if (process.client) window.clarity?.('set', key, value)
    }
    const identify = (id: string) => {
        if (process.client) window.clarity?.('identify', id)
    }
    return { track, set, identify }
}
