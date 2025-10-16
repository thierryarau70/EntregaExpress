<template>
  <section id="couriers" class="py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
      <!-- Texto -->
      <div>
        <h2 class="text-2xl sm:text-3xl font-bold mb-8">Para Entregadores</h2>

        <ul class="space-y-6">
          <li v-for="(item, i) in steps" :key="i" class="flex items-start gap-4">
            <div class="flex-shrink-0">
              <span class="inline-flex items-center justify-center h-10 w-10 rounded-full bg-teal-100 text-teal-600">
                <i :class="item.icon"></i>
              </span>
            </div>
            <div>
              <h3 class="font-semibold text-lg text-gray-800">{{ item.title }}</h3>
              <p class="text-gray-500">{{ item.desc }}</p>
            </div>
          </li>
        </ul>
      </div>

      <!-- Imagem -->
      <div class="flex justify-center lg:justify-end">
        <div class="rounded-3xl overflow-hidden shadow-xl ring-1 ring-black/5 bg-orange-500">
          <img
              src="/courier-icon.jpg"
              alt="Entregador feliz com pacote"
              class="w-full h-[500px] object-contain p-6"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const steps = [
  {
    icon: 'pi pi-eye',
    title: 'Veja Entregas Disponíveis',
    desc: 'Acesse uma lista de solicitações de entrega próximas a você',
  },
  {
    icon: 'pi pi-directions',
    title: 'Aceite e Navegue',
    desc: 'Aceite entregas e use o GPS integrado para navegar até o local',
  },
  {
    icon: 'pi pi-check-circle',
    title: 'Confirme as Etapas',
    desc: 'Confirme a coleta e a entrega final através do app',
  },
  {
    icon: 'pi pi-wallet',
    title: 'Ganha por Entrega',
    desc: 'Receba por cada entrega realizada de forma transparente',
  },
]
</script>


<style scoped>

</style>