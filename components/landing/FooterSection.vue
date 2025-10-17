<template>
  <footer class="bg-gradient-to-b from-slate-800 to-slate-900 text-white">
    <!-- CTA Section -->
    <div class="bg-gradient-to-r from-slate-800 to-slate-900 py-16 text-center">
      <h2 class="text-3xl sm:text-4xl font-extrabold">Pronto para começar?</h2>
      <p class="mt-2 text-gray-300 max-w-2xl mx-auto">
        Junte-se a milhares de usuários que confiam na Entrega Express para suas entregas
      </p>
      <div class="mt-8 flex justify-center gap-4">
        <button
            class="px-6 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold shadow-lg hover:from-orange-600 hover:to-orange-700 transition"
        >
          <NuxtLink to="/login">Começar Agora</NuxtLink>
        </button>
        <input
            type="email"
            placeholder="Seu e-mail"
            class="px-4 py-3 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none"
        />
      </div>
    </div>

    <!-- Footer Content -->
    <div class="border-t border-white/10 py-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
        <div>
          <div class="flex items-center gap-2 mb-3">
            <i class="pi pi-box text-orange-500 text-xl"></i>
            <span class="font-semibold text-lg">Entrega Express</span>
          </div>
          <p class="text-gray-400">
            Conectando pessoas a entregadores para um serviço rápido, transparente e confiável.
          </p>
        </div>

        <div>
          <h3 class="font-semibold mb-3">Links Rápidos</h3>
          <ul class="space-y-2 text-gray-400">
            <li><a href="#recursos" class="hover:text-white">Recursos</a></li>
            <li><a href="#como-funciona" class="hover:text-white">Como Funciona</a></li>
            <li><a href="#couriers" class="hover:text-white">Começar Agora</a></li>
          </ul>
        </div>

        <div>
          <h3 class="font-semibold mb-3">Para Você</h3>
          <ul class="space-y-2 text-gray-400">
            <li><a href="/deliveries/new" class="hover:text-white">Solicitar Entrega</a></li>
            <li><a href="/deliveries/new" class="hover:text-white">Tornar-se Entregador</a></li>
            <li><a href="/tracking" class="hover:text-white">Rastreamento</a></li>
          </ul>
        </div>

        <div>
          <h3 class="font-semibold mb-3">Contato</h3>
          <ul class="space-y-2 text-gray-400">
            <li><i class="pi pi-envelope text-orange-400 mr-2"></i> contato@entregaexpress.com</li>
            <li><i class="pi pi-phone text-orange-400 mr-2"></i> (11) 9999-9999</li>
            <li><i class="pi pi-map-marker text-orange-400 mr-2"></i> São Paulo, SP</li>
          </ul>
        </div>
      </div>

      <div class="text-center text-gray-500 text-sm mt-8 border-t border-white/10 pt-6">
        © 2025 Entrega Express. Todos os direitos reservados.
      </div>
    </div>
  </footer>
</template>
<script setup lang="ts">
const router = useRouter()

</script>