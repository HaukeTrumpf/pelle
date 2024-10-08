<template>
  <div
    class="container mx-auto h-full flex flex-col items-center justify-center p-10 text-center relative"
  >
    <div
      class="elfsight-app-dff6ff30-6158-43fb-b29e-2937a1344ffa bg-[#F4F0DB]"
      data-elfsight-app-lazy
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';

// Dynamisch das Elfsight-Skript laden
onMounted(() => {
  const script = document.createElement('script');
  script.src = 'https://static.elfsight.com/platform/platform.js';
  script.async = true;
  document.body.appendChild(script);
});
</script>

<style scoped>
/* Styles für die Instagram-Galerie können hier hinzugefügt werden */
</style>
