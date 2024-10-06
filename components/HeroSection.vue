<script lang="ts" setup>
import { ref, onMounted } from 'vue';

// Vordefinierte Farben, die für die Buchstaben und Buttons verwendet werden
const colors = ['#3d87aa', '#fcec8a', '#eb795d']; // brand-blue, brand-yellow, brand-red

// Funktion, um eine zufällige Farbe aus den vordefinierten Farben auszuwählen
const getRandomColor = (): string => {
  return colors[Math.floor(Math.random() * colors.length)];
};

// Definiere den Text und ein Array, um Farben für jeden Buchstaben zu speichern
const text = ref('Pelle der Späti');
const letterColors = ref<string[]>([]);

// Generiere zufällige Farben für jeden Buchstaben, wenn die Komponente gemountet wird
onMounted(() => {
  letterColors.value = text.value.split('').map(() => getRandomColor());
});
</script>

<template>
  <!-- Hero section -->
  <div class="z-0 bg-[#F4F0DB] h-screen bg-cover relative">
    <div
      class="container mx-auto h-full flex flex-col items-center justify-center p-10 text-center relative"
    >
      <h1
        class="font-clash-semibold font-bold text-6xl md:text-[200px] leading-snug md:leading-[10rem] drop-in"
      >
        <!-- Buchstaben mit zufälligen Farben und schwarzer Umrandung -->
        <span
          v-for="(letter, index) in text"
          :key="index"
          :style="{ color: letterColors[index], textShadow: '2px 2px 0px #000, -2px -2px 0px #000, -2px 2px 0px #000, 2px -2px 0px #000' }"
        >
          {{ letter }}
        </span>
      </h1>

      <!-- Buttons zum Verlinken der Sektionen -->
      <div
        class="w-full flex flex-col md:flex-row justify-center mt-10 md:mt-20 gap-4"
      >
        <!-- Events Button -->
        <a href="#termine">
          <button
            class="bg-brand-blue hover:bg-[#2a5f75] text-brand-yellow font-bold py-3 md:py-4 px-6 md:px-8 rounded-full text-base md:text-lg drop-in-3"
          >
            zu den Events
          </button>
        </a>
        <!-- Über uns Button -->
        <a href="#gallery">
          <button
            class="bg-brand-red hover:bg-[#c75b46] text-brand-yellow font-bold py-3 md:py-4 px-6 md:px-8 rounded-full text-base md:text-lg drop-in-3"
          >
            Über uns
          </button>
        </a>
        <!-- Kontakt Button -->
        <a href="#contact">
          <button
            class="bg-brand-yellow hover:bg-[#dbcf7a] text-brand-blue font-bold py-3 md:py-4 px-6 md:px-8 rounded-full text-base md:text-lg drop-in-3"
          >
            Kontakt
          </button>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  height: 100%; /* Ensures container takes full height */
}
</style>
