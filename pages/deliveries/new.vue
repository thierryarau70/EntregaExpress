<template>
  <div class="min-h-screen bg-slate-50">
    <!-- cabeçalho minimal (não é o AppHeader do layout) -->
    <div class="border-b bg-white">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <i class="pi pi-box text-orange-500"></i>
          <span class="font-semibold">Entrega Express</span>
          <span class="text-xs text-gray-400">Dashboard</span>
        </div>

        <div class="flex items-center gap-6 text-sm text-gray-600">
          <div class="flex bg-gray-100 rounded-full p-1">
            <button
                class="px-4 py-1 rounded-full text-xs"
                :class="role === 'client' ? 'bg-white shadow font-semibold' : ''"
                @click="role='client'"
            >
              <i class="pi pi-compass mr-1" /> Cliente
            </button>
            <button
                class="px-4 py-1 rounded-full text-xs"
                :class="role === 'courier' ? 'bg-white shadow font-semibold' : ''"
                @click="role='courier'"
            >
              <i class="pi pi-cog mr-1" /> Entregador
            </button>
          </div>

          <div class="hidden sm:flex items-center gap-2">
            <i class="pi pi-user"></i>
            <span>{{ userEmail }}</span>
          </div>

          <a href="/" class="text-gray-500 hover:text-red-500 flex items-center gap-2" @click.prevent="logout">
            <i class="pi pi-sign-out"></i> Sair
          </a>
        </div>
      </div>
    </div>

    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <!-- CLIENTE -->
      <template v-if="role === 'client'">
        <!-- Card: Solicitar Nova Entrega -->
        <div class="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div class="border-b border-gray-100 px-4 py-3 flex items-center gap-2">
            <i class="pi pi-map-marker text-orange-500"></i>
            <h2 class="font-semibold">Solicitar Nova Entrega</h2>
          </div>

          <div class="p-4 space-y-4">
            <p class="text-xs text-gray-500">
              Defina os pontos de coleta e entrega para iniciar
            </p>

            <DeliveryMap v-model:pickup="pickup" v-model:dropoff="dropoff" />

            <div class="grid sm:grid-cols-2 gap-3">
              <div class="text-sm">
                <label class="text-gray-500">Coleta (A)</label>
                <div class="mt-1 rounded-lg bg-gray-50 px-3 py-2 border border-gray-200">
                  <span class="text-xs text-gray-500">Lat/Lng:</span>
                  <span class="ml-1 font-mono">
                    {{ pickup ? `${pickup.lat.toFixed(5)}, ${pickup.lng.toFixed(5)}` : '—' }}
                  </span>
                </div>
              </div>
              <div class="text-sm">
                <label class="text-gray-500">Destino (B)</label>
                <div class="mt-1 rounded-lg bg-gray-50 px-3 py-2 border border-gray-200">
                  <span class="text-xs text-gray-500">Lat/Lng:</span>
                  <span class="ml-1 font-mono">
                    {{ dropoff ? `${dropoff.lat.toFixed(5)}, ${dropoff.lng.toFixed(5)}` : '—' }}
                  </span>
                </div>
              </div>
            </div>

            <div class="pt-2">
              <button
                  class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl
                       bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold
                       shadow-[0_10px_30px_rgba(234,88,12,.35)] hover:from-orange-600 hover:to-orange-700 transition"
                  @click="requestDelivery"
              >
                <i class="pi pi-send"></i> Solicitar Entrega
              </button>
            </div>
          </div>
        </div>

        <!-- Card: Minhas Entregas -->
        <div class="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div class="border-b border-gray-100 px-4 py-3">
            <h2 class="font-semibold">Minhas Entregas</h2>
            <p class="text-xs text-gray-500">Acompanhe suas entregas ativas e histórico</p>
          </div>

          <div class="p-6">
            <template v-if="deliveries.length">
              <ul class="divide-y divide-gray-100">
                <li v-for="d in deliveries" :key="d.id" class="py-3 flex items-center justify-between">
                  <div class="space-y-0.5">
                    <div class="text-sm font-medium">Entrega #{{ d.id }}</div>
                    <div class="text-xs text-gray-500">
                      A: {{ d.pickup.lat.toFixed(4) }}, {{ d.pickup.lng.toFixed(4) }} →
                      B: {{ d.dropoff.lat.toFixed(4) }}, {{ d.dropoff.lng.toFixed(4) }}
                    </div>
                  </div>
                  <span
                      class="px-2.5 py-1 rounded-full text-xs"
                      :class="d.status === 'concluida'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-amber-100 text-amber-700'"
                  >
                    {{ d.status }}
                  </span>
                </li>
              </ul>
            </template>

            <template v-else>
              <div class="text-center py-16 text-gray-500">
                <i class="pi pi-box text-3xl text-gray-400"></i>
                <p class="mt-3 text-sm">Nenhuma entrega ativa no momento</p>
                <p class="text-xs">Suas entregas aparecerão aqui</p>
              </div>
            </template>
          </div>
        </div>
      </template>

      <!-- ENTREGADOR -->
      <template v-else>
        <CourierBoard
            :available="available"
            :active="active"
            @accept="accept"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import DeliveryMap from '@/components/map/DeliveryMap.vue'
import CourierBoard from '@/components/courier/CourierBoard.vue'
import { useToast } from '@/composables/useToast'
import { useAuthStore } from '@/stores/auth'


definePageMeta({
  layout: 'dashboard'
})

const auth = useAuthStore()
const toast = useToast()

// ---------- Tipos ----------
type LatLng = { lat: number; lng: number }
type Delivery = { id: number; pickup: LatLng; dropoff: LatLng; status: 'ativa' | 'concluida' }
type Item = { id: number; pickup: LatLng; dropoff: LatLng }

// ---------- Usuário + papel atual ----------
const userEmail = 'thierry@gmail.com'
const role = ref<'client' | 'courier'>('client')

// ---------- CLIENTE ----------
const pickup = ref<LatLng | null>(null)
const dropoff = ref<LatLng | null>(null)
const deliveries = ref<Delivery[]>([])

function requestDelivery() {
  if (!pickup.value || !dropoff.value) {
    return toast.error('Defina os pontos A e B no mapa')
  }
  const id = deliveries.value.length + 1
  deliveries.value.unshift({
    id,
    pickup: pickup.value,
    dropoff: dropoff.value,
    status: 'ativa'
  })
  toast.success('Entrega solicitada!')
}

// ---------- ENTREGADOR (simulação) ----------
const available = ref<Item[]>([]) // entregas disponíveis
const active = ref<Item[]>([])    // entregas aceitas (ativas)

// Simula “chegada” de pedidos após alguns segundos
onMounted(() => {
  // 1º pedido
  setTimeout(() => {
    available.value.push({
      id: 101,
      pickup: { lat: -23.555, lng: -46.64 },
      dropoff: { lat: -23.575, lng: -46.62 }
    })
  }, 1500)

  // 2º pedido
  setTimeout(() => {
    available.value.push({
      id: 102,
      pickup: { lat: -23.565, lng: -46.63 },
      dropoff: { lat: -23.585, lng: -46.60 }
    })
  }, 3500)
})

function accept(item: Item) {
  available.value = available.value.filter(i => i.id !== item.id)
  active.value.unshift(item)
  toast.success(`Entrega #${item.id} aceita!`)
}

// ---------- Sair ----------
function logout() {
  auth.logout?.()
  navigateTo('/login')
}
</script>
