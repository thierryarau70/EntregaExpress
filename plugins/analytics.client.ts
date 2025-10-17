// plugins/analytics.client.ts
export default defineNuxtPlugin((nuxtApp) => {
    const track = (name: string, props?: Record<string, any>) => {
        if (!process.client) return
        try {
            // evento nomeado
            window.clarity?.('event', name)
            // opcional: guardar últimos props como “set” (facilita segmentação)
            if (props) {
                Object.entries(props).forEach(([k, v]) => {
                    // cuidado com PII — não envie dados sensíveis
                    window.clarity?.('set', `evt_${name}_${k}`.slice(0, 63), String(v).slice(0, 120))
                })
            }
        } catch {}
    }

    // pageview (Clarity geralmente pega sozinho; reforçamos)
    nuxtApp.hook('page:finish', () => {
        const path = window.location.pathname + window.location.search
        window.clarity?.('set', 'page', path)
        track('page_view', { path })
    })

    // diretiva v-track: <button v-track:click="'nome_evento'">
    nuxtApp.vueApp.directive('track', {
        mounted(el, binding) {
            const eventName: string = binding.value || el.getAttribute('data-track') || 'click'
            const domEvent = binding.arg || 'click'
            const handler = () => track(eventName)
            el.__clarityHandler__ = handler
            el.addEventListener(domEvent, handler)
        },
        unmounted(el) {
            if (el.__clarityHandler__) {
                el.removeEventListener('click', el.__clarityHandler__)
            }
        }
    })

    // expõe $track
    return {
        provide: {
            track
        }
    }
})

declare module '#app' {
    interface NuxtApp {
        $track: (name: string, props?: Record<string, any>) => void
    }
}
declare global {
    interface HTMLElement {
        __clarityHandler__?: () => void
    }
}
