<template>
  <section id="recursos" class="py-16 lg:py-20 scroll-mt-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-center">
        Por que escolher a Entrega Express?
      </h2>
      <p class="mt-3 text-center text-gray-600 max-w-2xl mx-auto">
        Oferecemos a melhor experiência em entregas urbanas com tecnologia de ponta.
      </p>

      <div class="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card
            v-for="f in features"
            :key="f.title"
            class="group transition-transform duration-300 hover:-translate-y-1 shadow-md hover:shadow-2xl shadow-black/10 border border-black/5 rounded-2xl hover:border-orange-600"
        >
          <template #content>
            <div class="flex flex-col p-7 min-h-[200px]">
              <div class="inline-flex h-14 w-14 items-center justify-center rounded-xl mb-4" :class="f.bg">
                <i :class="['pi', f.icon, f.color, 'text-2xl']" />
              </div>
              <h3 class="font-semibold text-xl mb-1">{{ f.title }}</h3>
              <p class="text-gray-600 text-base leading-relaxed">{{ f.desc }}</p>
            </div>
          </template>
        </Card>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Card from 'primevue/card'

const features = [
  { icon: 'pi-map-marker', title: 'Rastreamento em Tempo Real', desc: 'Acompanhe o entregador no mapa, do início ao fim.', bg: 'bg-orange-50', color: 'text-orange-600' },
  { icon: 'pi-forward', title: 'Entrega Ultrarápida', desc: 'Média de 30 minutos em áreas cobertas.', bg: 'bg-sky-50', color: 'text-sky-600' },
  { icon: 'pi-shield', title: 'Seguro e Confiável', desc: 'Transparência em cada etapa da entrega.', bg: 'bg-emerald-50', color: 'text-emerald-600' },
  { icon: 'pi-bell', title: 'Notificações em Tempo Real', desc: 'Atualizações de status durante o trajeto.', bg: 'bg-violet-50', color: 'text-violet-600' },
  { icon: 'pi-clock', title: 'Disponível 24/7', desc: 'Peça quando precisar, a qualquer hora.', bg: 'bg-rose-50', color: 'text-rose-600' },
  { icon: 'pi-chart-line', title: 'Relato de Entregas', desc: 'Histórico e comprovante ao final.', bg: 'bg-amber-50', color: 'text-amber-600' },
]
</script>

<style scoped>
:deep(.p-card) {
  @apply bg-white rounded-2xl border border-gray-400 shadow-md transition-all duration-300;
}

:deep(.p-card:hover) {
  border-color: #EA580C;
  box-shadow: 0 8px 30px rgba(234, 88, 12, 0.25);
  transform: translateY(-4px);
}
</style>


