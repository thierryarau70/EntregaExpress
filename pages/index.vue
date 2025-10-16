<template>
  <div>
    <!-- HERO -->
    <HeroSection />

    <!-- SEÇÃO 2: Features -->
    <FeaturesGrid />

    <!-- SEÇÃO 3: HowItWorks -->
    <HowItWorks />

    <!-- SEÇÃO 4: Courier -->
    <ForCouriers />

    <!-- SEÇÃO 5: Footer -->
    <FooterSection />

  </div>
</template>

<script setup lang="ts">
import FeaturesGrid from '../components/landing/FeaturesGrid.vue'
import HowItWorks from "../components/landing/HowItWorks.vue";
import HeroSection from "@/components/landing/HeroSection.vue";
import ForCouriers from "@/components/landing/ForCouriers.vue";
import FooterSection from "@/components/landing/FooterSection.vue";
</script>
