<script lang="ts" setup>
import { ref, onMounted } from 'vue';

// Die URL deiner Google Apps Script Web-App
const API_URL =
  'https://script.google.com/macros/s/AKfycbzSyUn7v-aQdgPNDAM67SPGYNE8w1DHS7OidwgNFL0d9Ro2D_mYw3w4ML_5dkgBsY_xMg/exec';

// Events Data Ref
const events = ref([]);

// Hilfsfunktion zum Überprüfen, ob ein Datum heute ist
function isToday(dateString) {
  const eventDate = new Date(dateString);
  const today = new Date();
  return (
    eventDate.getDate() === today.getDate() &&
    eventDate.getMonth() === today.getMonth() &&
    eventDate.getFullYear() === today.getFullYear()
  );
}

// Hilfsfunktion zum Formatieren des Datums
function formatDate(dateString) {
  const date = new Date(dateString);
  const day = ('0' + date.getDate()).slice(-2);
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  return `${day}.${month}.${year}`; // DD.MM.YYYY Format
}

// Fetch Data from Google Apps Script
const fetchEvents = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    // Füge für jedes Event ein isToday-Flag hinzu und formatiere das Datum
    events.value = data.map((event) => {
      return {
        ...event,
        isToday: isToday(event.date),
        formattedDate: formatDate(event.date),
      };
    });
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
    class="z-0 flex flex-col items-center justify-start pt-32 md:pt-40 p-10"
  >
    <div class="container mx-auto p-8 md:p-16 text-center">
      <h2
        class="font-clash-semibold font-bold text-4xl md:text-6xl text-brand-blue mb-16"
      >
        Kommende Pelle Events
      </h2>

      <div v-for="(event, index) in events" :key="index" class="mb-12">
        <h3 class="font-clash-semibold text-3xl md:text-4xl mb-4">
          {{ event.eventName }}
        </h3>
        <!-- Zeige "Heute" an, wenn isToday true ist -->
        <div
          v-if="event.isToday"
          class="font-archivo-regular text-lg md:text-xl text-[#4d665e]"
        >
          <strong>Heute</strong>
        </div>
        <p class="font-archivo-regular text-lg md:text-xl text-[#4d665e]">
          Am: {{ event.formattedDate }} <br />
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
