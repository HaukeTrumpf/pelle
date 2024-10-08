<script setup lang="ts">
import { ref, onMounted } from 'vue';

// Formularfelder
const name = ref('');
const email = ref('');
const message = ref('');
const successMessage = ref('');
const isSubmitting = ref(false);
const honeypot = ref(''); // Honeypot-Feld
const nonce = ref(''); // Nonce-Feld
const showForm = ref(true); // Neue Variable zum Steuern der Sichtbarkeit des Formulars

// Nonce beim Laden der Seite vom Server abrufen
onMounted(async () => {
  try {
    const response = await fetch(
      'https://script.google.com/macros/s/AKfycbykhl0aGaXybn_XsH4uCyolIbNvh6fIMwiF73GmdyGCi4otgWGAdNPcvGnIqc4Ifl4k/exec' // Ersetzen Sie IHR_SCRIPT_ID durch Ihre tatsächliche Script-ID
    );
    const data = await response.json();
    nonce.value = data.nonce;
  } catch (error) {
    console.error('Fehler beim Abrufen des Nonce:', error);
    alert('Ein Fehler ist aufgetreten. Bitte laden Sie die Seite neu.');
  }
});

const handleSubmit = async (event: Event) => {
  event.preventDefault();
  isSubmitting.value = true;
  successMessage.value = '';

  // Honeypot-Check: Wenn das Honeypot-Feld ausgefüllt ist, handelt es sich wahrscheinlich um einen Bot
  if (honeypot.value) {
    successMessage.value = 'Spam erkannt. Ihre Nachricht wurde nicht gesendet.';
    isSubmitting.value = false;
    return;
  }

  // Formulardaten als URL-kodierten String zusammenstellen
  const formData = new URLSearchParams();
  formData.append('name', name.value);
  formData.append('email', email.value);
  formData.append('message', message.value);
  formData.append('nonce', nonce.value); // Nonce mitsenden

  try {
    // Senden des Formulars an Ihr Google Apps Script
    const response = await fetch(
      'https://script.google.com/macros/s/AKfycbykhl0aGaXybn_XsH4uCyolIbNvh6fIMwiF73GmdyGCi4otgWGAdNPcvGnIqc4Ifl4k/exec', // Ersetzen Sie IHR_SCRIPT_ID durch Ihre tatsächliche Script-ID
      {
        method: 'POST',
        body: formData,
        // WICHTIG: Keine zusätzlichen Header hinzufügen!
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
      // Formular ausblenden
      showForm.value = false;
    } else {
      successMessage.value = 'Es gab einen Fehler: ' + result.message;
    }
  } catch (error) {
    console.error('Fehler beim Senden des Formulars:', error);
    successMessage.value =
      'Ein Fehler ist aufgetreten. Bitte versuche es später erneut.';
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div class="flex items-center justify-center h-screen p-10 md:p-0">
    <div class="max-w-md w-full p-8 bg-white shadow-md rounded-lg">
      <!-- Formular anzeigen, wenn showForm true ist -->
      <form v-if="showForm" @submit="handleSubmit" class="space-y-6">
        <h2 class="text-3xl font-semibold text-gray-800 text-center mb-6">
          Kontaktformular
        </h2>
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700"
            >Name</label
          >
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
          <label for="email" class="block text-sm font-medium text-gray-700"
            >E-Mail</label
          >
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
          <label for="message" class="block text-sm font-medium text-gray-700"
            >Nachricht</label
          >
          <textarea
            id="message"
            v-model="message"
            class="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            placeholder="Deine Nachricht"
            rows="5"
            required
          ></textarea>
        </div>

        <!-- Honeypot-Feld -->
        <input
          type="text"
          name="captcha"
          v-model="honeypot"
          tabindex="-1"
          autocomplete="off"
          style="display: none"
        />

        <!-- Nonce als verstecktes Feld -->
        <!-- Nicht notwendig, da der Nonce in der Variable gespeichert ist -->

        <button
          type="submit"
          class="w-full flex justify-center bg-brand-blue hover:bg-[#2a5f75] text-brand-yellow font-bold py-3 md:py-4 px-6 md:px-8 rounded-full text-base md:text-lg"
          :disabled="isSubmitting"
        >
          <span v-if="isSubmitting">Sende Nachricht...</span>
          <span v-else>Senden</span>
        </button>
      </form>

      <!-- Erfolgsmeldung anzeigen, wenn showForm false ist -->
      <div v-else class="text-center">
        <p class="text-[#2a5f75] text-lg font-semibold">
          Vielen Dank für deine Nachricht! Wir melden uns bald bei dir.
        </p>
      </div>

      <!-- Fehlermeldungen anzeigen -->
      <p
        v-if="successMessage && showForm"
        class="mt-6 text-center text-red-700"
      >
        {{ successMessage }}
      </p>
    </div>
  </div>
</template>

<style scoped>
/* Tailwind Styles */
</style>
