import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import ToastService from 'primevue/toastservice'
import DialogService from 'primevue/dialogservice'
import ConfirmDialog from 'primevue/confirmdialog'
import 'primeicons/primeicons.css'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(PrimeVue, { theme: { preset: Aura } })
    nuxtApp.vueApp.use(ToastService)
    nuxtApp.vueApp.use(DialogService)
    nuxtApp.vueApp.component('ConfirmDialog', ConfirmDialog)
})
