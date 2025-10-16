<template>
  <div class="min-h-screen bg-white text-gray-800">
    <!-- Globais -->
    <Toast />
    <ConfirmDialog />

    <!-- TOP BAR do Dashboard (sem AppHeader) -->
    <header class="relative border-b border-gray-100">
      <!-- blobzinho laranja no topo direito (decorativo) -->
      <div
          aria-hidden
          class="pointer-events-none absolute right-0 top-[-60px] h-[140px] w-[180px] bg-gradient-to-br from-orange-300/40 to-orange-500/20 blur-2xl"
      />
      <nav class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
        <!-- Branding -->
        <div class="flex items-center gap-2">
          <i class="pi pi-box text-orange-500"></i>
          <span class="font-semibold">Entrega Express</span>
          <span class="text-xs text-gray-400">Dashboard</span>
        </div>

        <!-- Ações -->
        <div class="flex items-center gap-6 text-sm text-gray-700">
          <!-- Toggle de perfil -->
          <div class="hidden sm:flex items-center bg-gray-100 rounded-full p-1">
            <button
                class="flex items-center gap-2 px-4 py-1 rounded-full text-xs transition"
                :class="role === 'client' ? 'bg-white shadow font-semibold' : 'text-gray-600 hover:text-gray-800'"
                @click="setRole('client')"
            >
              <i class="pi pi-shield"></i> Cliente
            </button>
            <button
                class="flex items-center gap-2 px-4 py-1 rounded-full text-xs transition"
                :class="role === 'courier' ? 'bg-white shadow font-semibold' : 'text-gray-600 hover:text-gray-800'"
                @click="setRole('courier')"
            >
              <i class="pi pi-cog"></i> Entregador
            </button>
          </div>

          <!-- Usuário -->
          <div class="hidden md:flex items-center gap-2 text-gray-600">
            <i class="pi pi-user"></i>
            <span>{{ userEmail }}</span>
          </div>

          <!-- Sair -->
          <button
              type="button"
              class="inline-flex items-center gap-2 text-gray-600 hover:text-red-600 transition"
              @click="logout"
          >
            <i class="pi pi-sign-out"></i> Sair
          </button>
        </div>
      </nav>
    </header>

    <!-- CONTEÚDO -->
    <main>
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'
import { useAuthStore } from '@/stores/auth'



const auth = useAuthStore()

const route = useRoute()
const role = ref<'client' | 'courier'>('client')

onMounted(() => {
  const remembered = sessionStorage.getItem('ee-role')
  if (remembered === 'client' || remembered === 'courier') role.value = remembered
})

function setRole(next: 'client' | 'courier') {
  role.value = next
  sessionStorage.setItem('ee-role', next)
}

const userEmail = computed(() => auth.user?.email ?? 'thierry@gmail.com')

async function logout() {
  auth.logout?.()
  await navigateTo('/login')
}
</script>

<style scoped>
</style>
