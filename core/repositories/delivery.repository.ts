import type { Delivery, DeliveryRequest } from '../../core/types/delivery'
import { useApi } from '../../core/http/api'


export function deliveryRepository() {
    const api = useApi()
    return {
        create: (payload: DeliveryRequest) => api.post<Delivery>('/deliveries', payload).then(r => r.data),
        listNearby: () => api.get<Delivery[]>('/deliveries/nearby').then(r => r.data),
        accept: (id: string) => api.post<Delivery>(`/deliveries/${id}/accept`, {}).then(r => r.data),
        confirmPickup: (id: string) => api.post<Delivery>(`/deliveries/${id}/pickup`, {}).then(r => r.data),
        confirmDelivered: (id: string) => api.post<Delivery>(`/deliveries/${id}/deliver`, {}).then(r => r.data),
    }
}