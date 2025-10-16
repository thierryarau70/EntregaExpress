<template>
  <div class="relative">
    <div class="absolute left-4 top-4 z-[400] bg-white/90 backdrop-blur px-3 py-2 rounded-lg shadow">
      <p class="text-xs text-gray-600">
        Arraste os marcadores para definir
        <span class="font-semibold">Coleta (A)</span> e
        <span class="font-semibold">Destino (B)</span>
      </p>
    </div>
    <div ref="mapEl" class="h-[420px] w-full rounded-xl overflow-hidden ring-1 ring-black/5"></div>
  </div>
</template>

<script setup lang="ts">
type LatLng = { lat: number; lng: number }

const props = withDefaults(defineProps<{
  pickup?: LatLng | null
  dropoff?: LatLng | null
}>(), {
  pickup: null,
  dropoff: null
})

const emit = defineEmits<{
  (e: 'update:pickup', value: LatLng): void
  (e: 'update:dropoff', value: LatLng): void
}>()

const mapEl = ref<HTMLDivElement>()
let map: any
let markerA: any
let markerB: any

const { $L } = useNuxtApp()

onMounted(() => {
  if (!mapEl.value) return

  const center = props.pickup || { lat: -23.55052, lng: -46.633308 }

  map = $L.map(mapEl.value, { zoomControl: false }).setView(center, 12)
  $L.control.zoom({ position: 'topright' }).addTo(map)

  $L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
  }).addTo(map)

  // marcador A
  markerA = $L.marker(props.pickup || center, { draggable: true })
      .addTo(map)
      .bindTooltip('Coleta (A)', { permanent: true, offset: [0, -30] })

  // marcador B
  const startB = props.dropoff || { lat: center.lat + 0.02, lng: center.lng + 0.02 }
  markerB = $L.marker(startB, { draggable: true })
      .addTo(map)
      .bindTooltip('Destino (B)', { permanent: true, offset: [0, -30] })

  // ajustar mapa para caber os dois
  const fg = $L.featureGroup([markerA, markerB])
  map.fitBounds(fg.getBounds().pad(0.25))

  // emitir updates
  markerA.on('dragend', () => emit('update:pickup', toLatLng(markerA.getLatLng())))
  markerB.on('dragend', () => emit('update:dropoff', toLatLng(markerB.getLatLng())))
})

onBeforeUnmount(() => map?.remove?.())

function toLatLng(ll: any): LatLng {
  return { lat: ll.lat, lng: ll.lng }
}
</script>
