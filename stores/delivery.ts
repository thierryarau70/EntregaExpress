import { defineStore } from 'pinia'
import type { Delivery } from '../core/types/delivery'


export const useDeliveryStore = defineStore('delivery', {
    state: () => ({ current: null as Delivery | null, list: [] as Delivery[] }),
    actions: {
        setCurrent(d: Delivery | null) { this.current = d },
        setList(l: Delivery[]) { this.list = l },
    },
})