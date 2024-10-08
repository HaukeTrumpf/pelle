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

// Control visibility to prevent flash of unstyled text
const isTextVisible = ref(false);

// Final button colors: blue, red, yellow
const finalColors = ['#2a5f75', '#c75b46', '#dbcf7a'];

// Generate random colors for each letter on component mount
onMounted(() => {
  // Initially set random colors and make the text visible immediately
  letterColors.value = text.value.split('').map(() => getRandomColor());
  isTextVisible.value = true;

  // Set interval to switch colors rapidly
  const colorSwitchInterval = setInterval(() => {
    letterColors.value = text.value.split('').map(() => getRandomColor());
  }, 100); // Change colors every 100ms for animation effect

  // After 2 seconds, stop the color switching and set the final colors
  setTimeout(() => {
    clearInterval(colorSwitchInterval);

    // Set the final colors to match the button colors
    letterColors.value = text.value.split('').map((_, index) => {
      return finalColors[index % finalColors.length];
    });
  }, 2000); // Stop switching after 2 seconds
});
</script>



<template>
  <!-- Hero section -->
  <div class="z-0 bg-[#F4F0DB] h-screen bg-cover relative">
    <img
      class="absolute w-full top-0 m:top-[-20vh] z-10"
      loading="lazy"
      src="/assets/images/wimpel2.png"
      alt="Wimpel"
    />
    <div
      class="container mx-auto h-full flex flex-col items-center justify-center p-10 text-center relative gap-8"
    >
      <h1
        class="font-clash-semibold font-bold text-6xl md:text-[200px] leading-snug md:leading-[10rem] drop-in"
        :style="{ visibility: isTextVisible ? 'visible' : 'hidden' }"
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

      <!-- Instagram icon positioned between the heading and buttons -->
      <a
        href="https://www.instagram.com/pelle_derspaeti/?hl=de" 
        target="_blank"
        rel="noopener noreferrer"
        class="inline-block relative z-20"
      >
        <!-- Instagram SVG Icon -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          class="w-20 h-20 text-brand-red hover:text-[#c75b46]"
        >
          <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
        </svg>
      </a>

      <!-- Buttons to link sections -->
      <div
        class="w-full flex flex-col md:flex-row justify-center gap-4"
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


<style>

h1 span {
  color: transparent; /* Make text transparent initially */
  transition: color 0.5s ease; /* Smooth transition for color change */
}
</style>