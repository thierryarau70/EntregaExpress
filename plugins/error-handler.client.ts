export default defineNuxtPlugin((nuxtApp) => {
    if (!process.client) return

    const sendErrorToClarity = (err: any, context?: string) => {
        try {
            const message =
                typeof err === 'string'
                    ? err
                    : err?.message || JSON.stringify(err)

            window.clarity?.('event', 'js_error', {
                message,
                context,
            })

            window.gtag?.('event', 'exception', {
                description: `${context || 'App'}: ${message}`,
                fatal: false,
            })
        } catch (e) {
            console.warn('Erro ao enviar log para Clarity/GA4:', e)
        }
    }

    window.onerror = function (msg, src, line, col, err) {
        sendErrorToClarity(err || msg, 'window.onerror')
        return false
    }

    window.onunhandledrejection = function (event) {
        sendErrorToClarity(event.reason, 'unhandledrejection')
    }

    nuxtApp.vueApp.config.errorHandler = (err, instance, info) => {
        const componentName = instance?.$?.type?.name || 'Unknown'
        sendErrorToClarity(err, `Vue error (${componentName}) [${info}]`)
        console.error(' Vue Error Capturado:', err)
    }

    console.log(' Global error handler inicializado com Clarity + GA4')
})
