<template>

  <section class="relative overflow-hidden" id="home">
    <!-- Gradiente de fundo -->
    <div aria-hidden class="absolute inset-0 bg-gradient-to-br from-orange-100 via-white to-sky-50" />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid lg:grid-cols-2 gap-10 items-center">
      <!-- Texto -->
      <div>
        <h1 class="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight text-gray-900">
          Entregas Rápidas com
          <span class="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500">
            Rastreamento em Tempo Real
          </span>
        </h1>

        <p class="mt-5 text-gray-600 text-lg max-w-xl">
          Conecte-se a entregadores próximos para coletas e entregas na sua cidade.
          Acompanhe todo o processo em tempo real, do início ao fim.
        </p>

        <!-- Botões -->
        <div class="mt-8 flex flex-wrap gap-3">
          <button
              @click="$router.push('/deliveries/new')"
              class="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold shadow-[0_8px_24px_rgba(234,88,12,0.35)] hover:from-orange-600 hover:to-orange-700 transition"
          >
            <i class="pi pi-box mr-2"></i>
            Solicitar Entrega
          </button>

          <button
              @click="$router.push('/deliveries/new')"
              class="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition font-medium flex items-center gap-2"
          >
            <i class="pi pi-user"></i>
            Tornar-se Entregador
          </button>
        </div>
      </div>

      <!-- Imagem -->
      <div class="relative">
        <div class="rounded-3xl overflow-hidden shadow-xl ring-1 ring-black/5 bg-white">
          <img src="/hero-delivery.jpg" alt="Motoboy na cidade" class="w-full h-[340px] object-cover" />
        </div>

        <!-- Badge flutuante -->
        <div
            class="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-lg ring-1 ring-black/5 px-5 py-3 flex items-center gap-3"
        >
          <span class="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-sky-100 text-sky-600">
            <i class="pi pi-bolt"></i>
          </span>
          <div>
            <p class="text-sm font-semibold">Entrega Rápida</p>
            <p class="text-xs text-gray-500">Em média 30 minutos</p>
          </div>
        </div>
      </div>
    </div>
  </section>


</template>