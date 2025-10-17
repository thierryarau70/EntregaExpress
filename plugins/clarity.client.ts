// plugins/clarity.client.ts
export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()
    if (!process.client || !config.public.clarityId) return

        // log opcional
        // console.log('[Clarity] init', config.public.clarityId)

        ;(function (c, l, a, r, i, t, y) {
        c[a] =
            c[a] ||
            function () {
                ;(c[a].q = c[a].q || []).push(arguments)
            }
        t = l.createElement(r)
        t.async = 1
        t.src = 'https://www.clarity.ms/tag/' + i
        y = l.getElementsByTagName(r)[0]
        y.parentNode.insertBefore(t, y)
    })(window, document, 'clarity', 'script', config.public.clarityId)

    // segurança de tipo
    declare global {
        interface Window {
            clarity?: (...args: any[]) => void
        }
    }
})
