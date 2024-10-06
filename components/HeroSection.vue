<script lang="ts" setup>
import { ref, onMounted } from 'vue';

// Function to generate random color in HEX format
const getRandomColor = (): string => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Define the text and an array to store colors for each letter
const text = ref('Pelle der Späti');
const letterColors = ref<string[]>([]);

// Generate random colors for each letter on component mount
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
        <!-- Display each letter with its own color -->
        <span
          v-for="(letter, index) in text"
          :key="index"
          :style="{ color: letterColors[index] }"
        >
          {{ letter }}
        </span>
      </h1>

      <!-- Buttons to link sections -->
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