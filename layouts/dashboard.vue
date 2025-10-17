<template>
  <div class="min-h-screen bg-white text-gray-800">
    <Toast />
    <ConfirmDialog />

    <header class="relative border-b border-gray-100">
      <div
          aria-hidden
          class="pointer-events-none absolute right-0 top-[-60px] h-[140px] w-[180px] bg-gradient-to-br from-orange-300/40 to-orange-500/20 blur-2xl"
      />

    </header>

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
