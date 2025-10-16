import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

const iconRetinaUrl = new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).toString()
const iconUrl       = new URL('leaflet/dist/images/marker-icon.png', import.meta.url).toString()
const shadowUrl     = new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).toString()

L.Icon.Default.mergeOptions({ iconRetinaUrl, iconUrl, shadowUrl })

export default defineNuxtPlugin(() => {
    return { provide: { L } }
})
