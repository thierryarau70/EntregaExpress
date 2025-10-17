// nuxt.config.ts
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
    ssr: false,

    typescript: { strict: true, shim: false },

    modules: [
        '@pinia/nuxt',
        '@vueuse/nuxt',
        '@nuxtjs/tailwindcss',
        '@nuxt/content',
        '@nuxt/eslint',
        '@nuxt/fonts',
        '@nuxt/icon',
        '@nuxt/image',
    ],

    css: [
        '@primevue/themes/aura',
        'primeicons/primeicons.css',
        '../assets/css/tailwind.css',
    ],

    runtimeConfig: {
        public: {
            apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3000/api',
            wsBase: process.env.NUXT_PUBLIC_WS_BASE || 'ws://localhost:3000/ws',
            clarityId: process.env.NUXT_PUBLIC_CLARITY_ID || 'trm15wdkr4'

        },
    },

    build: { transpile: ['primevue'] },

    app: {
        head: {
            title: 'Entrega Express',
            meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
        },
    },

    vite: {
        server: {
            watch: {
                usePolling: true,
                interval: 200,
            },
            hmr: {
                protocol: 'ws',
                host: 'localhost',
            },
        },
    },

    tailwindcss: {
        exposeConfig: true,
    },
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
})
