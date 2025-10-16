import { useToast as usePrimeToast } from 'primevue/usetoast'


export function useToast() {
    const toast = usePrimeToast()
    return {
        success: (summary: string, detail?: string) => toast.add({ severity: 'success', summary, detail, life: 3500 }),
        info: (summary: string, detail?: string) => toast.add({ severity: 'info', summary, detail, life: 3500 }),
        warn: (summary: string, detail?: string) => toast.add({ severity: 'warn', summary, detail, life: 4500 }),
        error: (summary: string, detail?: string) => toast.add({ severity: 'error', summary, detail, life: 5500 }),
    }
}