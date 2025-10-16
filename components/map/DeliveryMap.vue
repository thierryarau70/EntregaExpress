<!-- components/map/DeliveryMap.vue -->
<template>
  <div class="relative">
    <!-- Painel de busca (z-index alto p/ ficar acima do mapa) -->
    <div
        class="absolute left-4 top-4 z-[1000] pointer-events-auto bg-white/90 backdrop-blur
             px-3 py-3 rounded-lg shadow max-w-[96%] sm:max-w-md space-y-2"
    >
      <p class="text-xs text-gray-700">
        Defina <strong>Coleta (A)</strong> e <strong>Destino (B)</strong> arrastando os pinos no mapa
        ou buscando por CEP/endereço.
      </p>

      <div class="grid grid-cols-[auto,1fr,auto] items-center gap-2">
        <span class="inline-flex h-6 w-6 items-center justify-center text-xs font-bold rounded-full bg-emerald-100 text-emerald-700">A</span>
        <InputText v-model="queryA" class="w-full" placeholder="CEP ou endereço da Coleta (A)" />
        <Button size="small" @click="searchA" :loading="loadingA">Buscar</Button>
      </div>

      <div class="grid grid-cols-[auto,1fr,auto] items-center gap-2">
        <span class="inline-flex h-6 w-6 items-center justify-center text-xs font-bold rounded-full bg-sky-100 text-sky-700">B</span>
        <InputText v-model="queryB" class="w-full" placeholder="CEP ou endereço do Destino (B)" />
        <Button size="small" @click="searchB" :loading="loadingB">Buscar</Button>
      </div>
    </div>

    <!-- Contêiner do mapa -->
    <div ref="mapEl" class="h-[420px] w-full rounded-xl overflow-hidden ring-1 ring-black/5 z-[0]" />
  </div>
</template>

<script setup lang="ts">
/**
 * Componente de mapa Leaflet com dois pinos (A/B) e busca por endereço.
 * - Centro inicial: Boa Vista - Roraima
 * - Sem polilinha ligando os pontos (somente pinos arrastáveis)
 */
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { useToast } from '@/composables/useToast'

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

const toast = useToast()

const mapEl = ref<HTMLDivElement>()
let map: any
let markerA: any
let markerB: any

// Centro padrão: Boa Vista / Roraima
const RR_CENTER: LatLng = { lat: 2.823509, lng: -60.675314 }
const DEFAULT_ZOOM = 12

// Inputs de busca
const queryA = ref('')
const queryB = ref('')
const loadingA = ref(false)
const loadingB = ref(false)

const { $L } = useNuxtApp()

onMounted(() => {
  if (!mapEl.value) return

  // Inicializa mapa
  const center = props.pickup || RR_CENTER

  map = $L.map(mapEl.value, { zoomControl: false }).setView(center, DEFAULT_ZOOM)
  $L.control.zoom({ position: 'topright' }).addTo(map)

  $L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
  }).addTo(map)

  // Marker A (Coleta)
  markerA = $L.marker(props.pickup || center, { draggable: true })
      .addTo(map)
      .bindTooltip('Coleta (A)', { permanent: true, offset: [0, -30] })

  // Marker B (Destino)
  const startB = props.dropoff || { lat: center.lat + 0.02, lng: center.lng + 0.02 }
  markerB = $L.marker(startB, { draggable: true })
      .addTo(map)
      .bindTooltip('Destino (B)', { permanent: true, offset: [0, -30] })

  // Ajusta o mapa para mostrar os dois pinos
  const group = $L.featureGroup([markerA, markerB])
  map.fitBounds(group.getBounds().pad(0.25))

  // Emite updates ao terminar de arrastar
  markerA.on('dragend', () => emit('update:pickup', toLatLng(markerA.getLatLng())))
  markerB.on('dragend', () => emit('update:dropoff', toLatLng(markerB.getLatLng())))
})

onBeforeUnmount(() => map?.remove?.())

function toLatLng(ll: any): LatLng {
  return { lat: ll.lat, lng: ll.lng }
}

async function geocode(q: string): Promise<LatLng | null> {
  if (!q?.trim()) return null
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&addressdetails=1&countrycodes=br&q=${encodeURIComponent(q)}`
    const res = await fetch(url, { headers: { 'Accept-Language': 'pt-BR' } })
    const data = await res.json()
    if (Array.isArray(data) && data[0]) {
      return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) }
    }
    return null
  } catch {
    return null
  }
}

async function searchA() {
  loadingA.value = true
  try {
    const ll = await geocode(queryA.value)
    if (!ll) {
      toast.error('Não encontramos esse endereço/CEP para Coleta (A).')
      return
    }
    markerA.setLatLng(ll)
    map.flyTo(ll, 15, { duration: 0.5 })
    emit('update:pickup', ll)
  } finally {
    loadingA.value = false
  }
}

async function searchB() {
  loadingB.value = true
  try {
    const ll = await geocode(queryB.value)
    if (!ll) {
      toast.error('Não encontramos esse endereço/CEP para Destino (B).')
      return
    }
    markerB.setLatLng(ll)
    map.flyTo(ll, 15, { duration: 0.5 })
    emit('update:dropoff', ll)
  } finally {
    loadingB.value = false
  }
}
</script>

<style scoped>
/* Mantém o mapa atrás do painel de busca */
:deep(.leaflet-container) {
  z-index: 0;
}

/* Panes/controles do Leaflet ficam abaixo do nosso painel (que tem z-[1000]) */
:deep(.leaflet-pane),
:deep(.leaflet-control-container) {
  z-index: 200 !important;
}

/* Ajuste leve do tooltip dos marcadores */
:deep(.leaflet-tooltip) {
  padding: 4px 8px;
  font-size: 12px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(0, 0, 0, 0.1);
}
</style>
