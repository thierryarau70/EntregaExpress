import { deliveryRepository } from '../../core/repositories/delivery.repository'
import { deliveryMapper } from '../../core/mappers/delivery.mapper'


export function deliveryService() {
    const repo = deliveryRepository()
    return {
        async create(from: {lat:number;lng:number}, to: {lat:number;lng:number}) {
            const data = await repo.create({ from, to })
            return deliveryMapper.toModel(data)
        },
        async listNearby() {
            const list = await repo.listNearby()
            return list.map(deliveryMapper.toModel)
        },
        async accept(id: string) { return deliveryMapper.toModel(await repo.accept(id)) },
        async confirmPickup(id: string) { return deliveryMapper.toModel(await repo.confirmPickup(id)) },
        async confirmDelivered(id: string) { return deliveryMapper.toModel(await repo.confirmDelivered(id)) },
    }
}