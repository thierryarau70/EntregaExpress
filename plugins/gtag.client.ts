// plugins/gtag.client.ts
export default defineNuxtPlugin(() => {
    if (!process.client) return

    const GA_ID = 'G-44VGHSMZ3K'

    // injeta script
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
    document.head.appendChild(script)

    // inicializa
    window.dataLayer = window.dataLayer || []
    function gtag(...args: any[]) { (window as any).dataLayer.push(args) }
    gtag('js', new Date())
    gtag('config', GA_ID)

    // hook de pageview
    useRouter().afterEach((to) => {
        gtag('event', 'page_view', { page_path: to.fullPath })
    })
})
