export default defineNuxtPlugin((nuxtApp) => {
    if (!process.client) return

    const send = (err: any, ctx: string) => {
        const message = typeof err === 'string' ? err : (err?.message || JSON.stringify(err))
        window.clarity?.('event', 'js_error', { message, context: ctx })
        window.gtag?.('event', 'exception', {
            description: `${ctx}: ${message}`,
            fatal: false,
        })
        console.error(`[GlobalError] ${ctx}`, err)
    }

    window.onerror = (msg, src, line, col, error) => { send(error || msg, 'window.onerror'); return false }
    window.onunhandledrejection = (e) => { send(e.reason, 'unhandledrejection') }

    nuxtApp.vueApp.config.errorHandler = (err, instance, info) => {
        const name = instance?.$?.type?.name || 'Unknown'
        send(err, `vue:${name} [${info}]`)
    }

})
