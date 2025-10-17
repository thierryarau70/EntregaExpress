<template>
  <div class="space-y-6">
    <!-- Entregas Disponíveis -->
    <div class="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div class="border-b border-gray-100 px-4 py-3 flex items-center gap-2">
        <i class="pi pi-compass text-emerald-600"></i>
        <h2 class="font-semibold">Entregas Disponíveis</h2>
      </div>

      <div class="p-6">
        <template v-if="available.length">
          <ul class="divide-y divide-gray-100">
            <li v-for="d in available" :key="d.id" class="py-3 flex items-center justify-between">
              <div class="space-y-0.5">
                <div class="text-sm font-medium">Pedido #{{ d.id }}</div>
                <div class="text-xs text-gray-500">
                  A: {{ d.pickup.lat.toFixed(4) }}, {{ d.pickup.lng.toFixed(4) }}
                  →
                  B: {{ d.dropoff.lat.toFixed(4) }}, {{ d.dropoff.lng.toFixed(4) }}
                </div>
              </div>
              <button
                  class="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-white bg-emerald-600 hover:bg-emerald-700"
                  @click="onAccept(d)"
                  v-track:click="'courier_accept_click'"
              >
                <i class="pi pi-check"></i> Aceitar
              </button>
            </li>
          </ul>
        </template>

        <template v-else>
          <div class="text-center py-16 text-gray-500">
            <i class="pi pi-box text-3xl text-gray-400"></i>
            <p class="mt-3 text-sm">Nenhuma entrega disponível no momento</p>
            <p class="text-xs">Novas solicitações aparecerão aqui</p>
          </div>
        </template>
      </div>
    </div>

    <!-- Minhas Entregas Ativas -->
    <div class="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div class="border-b border-gray-100 px-4 py-3">
        <h2 class="font-semibold">Minhas Entregas Ativas</h2>
        <p class="text-xs text-gray-500">Entregas que você aceitou</p>
      </div>

      <div class="p-6">
        <template v-if="active.length">
          <ul class="divide-y divide-gray-100">
            <li v-for="d in active" :key="d.id" class="py-3 flex items-center justify-between">
              <div class="space-y-0.5">
                <div class="text-sm font-medium">Entrega #{{ d.id }}</div>
                <div class="text-xs text-gray-500">
                  A: {{ d.pickup.lat.toFixed(4) }}, {{ d.pickup.lng.toFixed(4) }} →
                  B: {{ d.dropoff.lat.toFixed(4) }}, {{ d.dropoff.lng.toFixed(4) }}
                </div>
              </div>
              <span class="px-2.5 py-1 rounded-full text-xs bg-amber-100 text-amber-700">ativa</span>
            </li>
          </ul>
        </template>

        <template v-else>
          <div class="text-center py-16 text-gray-500">
            <i class="pi pi-box text-3xl text-gray-400"></i>
            <p class="mt-3 text-sm">Nenhuma entrega ativa</p>
            <p class="text-xs">Aceite uma entrega para começar</p>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAnalytics } from '@/composables/useAnalytics'
type LatLng = { lat: number; lng: number }
type Item = { id: number; pickup: LatLng; dropoff: LatLng }

const props = defineProps<{
  available: Item[]
  active: Item[]
}>()

const emit = defineEmits<{
  (e: 'accept', item: Item): void
}>()

const { track } = useAnalytics()

onMounted(() => {
  track('courier_board_view', { avail: props.available?.length || 0, active: props.active?.length || 0 })
})

function onAccept(d: Item) {
  track('courier_accept', { id: d.id })
  emit('accept', d)
}
</script>
