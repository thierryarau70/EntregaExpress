export type LatLng = { lat: number; lng: number }
export type DeliveryStatus = 'SOLICITADA' | 'ACEITA' | 'EM_COLETA' | 'EM_ROTA' | 'CONCLUIDA'


export interface DeliveryRequest { from: LatLng; to: LatLng }
export interface Delivery {
    id: string
    from: LatLng
    to: LatLng
    status: DeliveryStatus
    courierId?: number
}