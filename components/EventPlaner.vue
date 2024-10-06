<script lang="ts" setup>
import { ref, onMounted } from 'vue';

// Die URL deiner Google Apps Script Web-App
const API_URL =
  'https://script.google.com/macros/s/AKfycbxln1NElDk-mZBs-6wW-hImPzeVsSH8lMgS2v5MHEqgAl9G9M65h3AfkIa0b1Ckq3TlRw/exec';

// Events Data Ref
const events = ref([]);

// Fetch Data from Google Apps Script
const fetchEvents = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    events.value = data; // Speichert die Daten aus der Google Sheets API
  } catch (error) {
    console.error('Error fetching events:', error);
  }
};

onMounted(fetchEvents);
</script>

<template>
  <!-- Events Page -->
  <div
    id="termine"
    class="z-0   flex flex-col items-center justify-start pt-32 md:pt-40 p-10"
  >
    <div class="container mx-auto p-8 md:p-16 text-center">
      <h2
        class="font-clash-semibold font-bold text-4xl md:text-6xl text-[#80ed99] mb-16"
      >
        Kommende Pelle Events
      </h2>

      <div v-for="(event, index) in events" :key="index" class="mb-12">
        <h3 class="font-clash-semibold text-3xl md:text-4xl mb-4">
          {{ event.eventName }}
        </h3>
        <p class="font-archivo-regular text-lg md:text-xl text-[#4d665e]">
          Am: {{ event.date }} <br />
          Um: {{ event.time }} <br />
          Eintritt: {{ event.entranceFee }} €
        </p>
      </div>

      <div class="w-full flex justify-center mt-20">
        <a href="#home"> </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
  padding-bottom: 50px;
}
</style>
