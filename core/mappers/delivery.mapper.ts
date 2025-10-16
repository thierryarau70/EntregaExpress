import type { Delivery } from '../../core/types/delivery'


// Ajuste aqui se a API devolver chaves diferentes
export const deliveryMapper = {
    toModel(apiData: any): Delivery {
        return {
            id: String(apiData.id),
            from: { lat: apiData.from?.lat, lng: apiData.from?.lng },
            to: { lat: apiData.to?.lat, lng: apiData.to?.lng },
            status: apiData.status,
            courierId: apiData.courierId ?? undefined,
        }
    },
}