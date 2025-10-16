<template>
  <header class="bg-white border-b border-gray-100 shadow-sm">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <div class="flex items-center space-x-2 cursor-pointer" @click="router.push('/')">
        <i class="pi pi-box text-orange-500 text-xl"></i>
        <span class="text-lg font-semibold text-gray-800">Entrega Express</span>
      </div>

      <ul class="hidden md:flex space-x-8 text-sm text-gray-600 font-medium">
        <li><a href="#recursos" class="hover:text-orange-500">Recursos</a></li>
        <li><a href="#como-funciona" class="hover:text-orange-500">Como Funciona</a></li>
        <li><NuxtLink to="/login" class="hover:text-orange-500">Entrar</NuxtLink></li>
      </ul>

      <NuxtLink
          to="/register"
          class="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold shadow-[0_8px_24px_rgba(234,88,12,0.35)] hover:from-orange-600 hover:to-orange-700 transition"
      >
        Começar Agora
      </NuxtLink>
    </nav>
  </header>
</template>

<script setup lang="ts">
const router = useRouter()
</script>
