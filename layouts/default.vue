<template>
  <div class="min-h-screen bg-white text-gray-800">
    <Toast />
    <ConfirmDialog />

    <AppHeader v-if="showHeader" />

    <main><slot /></main>
  </div>
</template>

<script setup lang="ts">
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'
import AppHeader from '@/layouts/AppHeader.vue'
const route = useRoute()


const showHeader = computed(() =>
    route.meta?.layout !== 'dashboard' && !route.path.startsWith('/deliveries')
)
</script>
