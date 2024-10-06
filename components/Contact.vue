<script lang="ts" setup>
import { ref } from 'vue';

// Variablen für die Formularfelder und den Status der Erfolgsnachricht
const name = ref('');
const email = ref('');
const message = ref('');
const successMessage = ref(''); // Erfolgsmeldung, die nach dem erfolgreichen Senden angezeigt wird
const isSubmitting = ref(false); // Zum Anzeigen des Ladezustands

// Funktion zum Verarbeiten des Formulars
const handleSubmit = async (event: Event) => {
  event.preventDefault(); // Verhindert das Standard-Formular-Submit
  isSubmitting.value = true; // Zeige den Ladezustand an
  successMessage.value = ''; // Zurücksetzen der Erfolgsmeldung

  const formData = new FormData();
  formData.append('name', name.value);
  formData.append('email', email.value);
  formData.append('message', message.value);

  try {
    const response = await fetch(
      'https://script.google.com/macros/s/AKfycbwUockoGjE6J9eaeQssoaMiFkRRRvaa1_1C5ICK5ITBQwpPHG8S-ES3psQhGbnM-BiT/exec',
      {
        method: 'POST',
        body: formData,
      }
    );

    const result = await response.json();
    if (result.status === 'success') {
      successMessage.value =
        'Vielen Dank für deine Nachricht! Wir melden uns bald bei dir.';
      // Formular zurücksetzen
      name.value = '';
      email.value = '';
      message.value = '';
    } else {
      successMessage.value =
        'Es gab einen Fehler beim Senden der Nachricht. Bitte versuche es später noch einmal.';
    }
  } catch (error) {
    successMessage.value = 'Ein Fehler ist aufgetreten: ' + error;
  } finally {
    isSubmitting.value = false; // Ladezustand beenden
  }
};
</script>

<template>
  <!-- Das Formular-Container div wird als Flex-Container definiert -->
  <div class="flex items-center justify-center h-screen p-10 md:p-0">
    <div class="max-w-md w-full p-8 bg-white shadow-md rounded-lg">
      <h2 class="text-3xl font-semibold text-gray-800 text-center mb-6 font-clash-semibold">
        Kontaktformular
      </h2>

      <!-- Formular -->
      <form @submit="handleSubmit" class="space-y-6 font-archivo-regular">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            v-model="name"
            class="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            placeholder="Dein Name"
            required
          />
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">E-Mail</label>
          <input
            type="email"
            id="email"
            v-model="email"
            class="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            placeholder="Deine E-Mail"
            required
          />
        </div>

        <div>
          <label for="message" class="block text-sm font-medium text-gray-700">Nachricht</label>
          <textarea
            id="message"
            v-model="message"
            class="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            placeholder="Deine Nachricht"
            rows="5"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          class="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          :disabled="isSubmitting"
        >
          <span v-if="isSubmitting">Sende Nachricht...</span>
          <span v-else>Senden</span>
        </button>
      </form>

      <!-- Erfolgsmeldung -->
      <p v-if="successMessage" class="mt-6 text-center text-green-700 font-semibold font-clash-semibold">
        {{ successMessage }}
      </p>
    </div>
  </div>
</template>

<style scoped>
/* Tailwind wird für Schriftarten und Styles verwendet */
</style>
