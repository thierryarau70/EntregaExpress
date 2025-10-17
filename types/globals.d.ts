export {}

declare global {
    interface Window {
        dataLayer?: any[]
        gtag?: (...args: any[]) => void
        clarity?: (...args: any[]) => void
    }
}
