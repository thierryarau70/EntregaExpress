<template>
  <section id="como-funciona" class="py-24 lg:py-32 scroll-mt-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-14">
        <h2 class="text-3xl sm:text-4xl font-bold tracking-tight">Como Funciona</h2>
        <p class="text-gray-500 mt-2">Simples, rápido e transparente</p>
      </div>

      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <div class="relative">
          <div class="rounded-[28px] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,.15)] ring-1 ring-black/5 bg-white">
            <img src="/tracking-feature.jpg" alt="Mapa - exemplo" class="w-full h-[540px] lg:h-[580px] object-cover" />
          </div>


        </div>

        <ol class="space-y-8">
          <li v-for="(s, i) in steps" :key="s.title" class="flex items-start gap-6">
            <div class="shrink-0 h-14 w-14 grid place-items-center rounded-full bg-gradient-to-br from-orange-400 to-orange-500 text-white font-semibold text-base shadow-[0_12px_28px_rgba(249,115,22,.35)]">
              {{ (i + 1).toString().padStart(2, '0') }}
            </div>
            <div>
              <h3 class="font-semibold text-xl">{{ s.title }}</h3>
              <p class="text-gray-500 text-base max-w-xl">{{ s.desc }}</p>
            </div>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const steps = [
  { title: 'Defina os Pontos',      desc: 'Informe o local de coleta (Ponto A) e o destino (Ponto B) no mapa interativo.' },
  { title: 'Entregador Aceita',     desc: 'Um entregador próximo aceita seu pedido e vai até o local de coleta.' },
  { title: 'Acompanhe em Tempo Real', desc: 'Veja a localização do entregador no mapa durante todo o trajeto.' },
  { title: 'Entrega Confirmada',    desc: 'Receba notificação quando a entrega for concluída com sucesso.' },
]
</script>
