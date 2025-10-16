import { deliveryService } from '../../core/services/delivery.service'
import { useDeliveryStore } from '../../stores/delivery'
import { useToast } from '../../composables/useToast'


export function useDeliveryHandler() {
    const svc = deliveryService()
    const store = useDeliveryStore()
    const toast = useToast()


    async function create(from: {lat:number;lng:number}, to: {lat:number;lng:number}) {
        try {
            const d = await svc.create(from, to)
            store.setCurrent(d)
            toast.success('Entrega solicitada!')
        } catch (e: any) {
            toast.error('Erro ao solicitar entrega', e?.response?.data?.message)
        }
    }


    return { create }
}