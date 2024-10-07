<script lang="ts" setup>
import { ref, onMounted } from 'vue';

// Formularfelder und Statusvariablen
const name = ref('');
const email = ref('');
const message = ref('');
const successMessage = ref('');
const isSubmitting = ref(false);
let recaptchaWidgetId: any;

// reCAPTCHA laden und initialisieren
const loadRecaptcha = () => {
  return new Promise((resolve) => {
    if ((window as any).grecaptcha) {
      resolve((window as any).grecaptcha);
    } else {
      const script = document.createElement('script');
      script.src = 'https://www.google.com/recaptcha/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        resolve((window as any).grecaptcha);
      };
      document.head.appendChild(script);
    }
  });
};

onMounted(async () => {
  const grecaptcha = await loadRecaptcha();
  recaptchaWidgetId = grecaptcha.render('recaptcha-container', {
    sitekey: '6Lf18FkqAAAAABmcLXiM9PDU1zFsdsSJb-ae68az', // Ersetze durch deinen Site Key
  });
});

// Formularverarbeitung
const handleSubmit = async (event: Event) => {
  event.preventDefault();
  isSubmitting.value = true;
  successMessage.value = '';

  const recaptchaToken = (window as any).grecaptcha.getResponse(recaptchaWidgetId);
  if (!recaptchaToken) {
    successMessage.value = 'Bitte bestätige, dass du kein Roboter bist.';
    isSubmitting.value = false;
    return;
  }

  const formData = new FormData();
  formData.append('name', name.value);
  formData.append('email', email.value);
  formData.append('message', message.value);
  formData.append('g-recaptcha-response', recaptchaToken);

  try {
    const response = await fetch(
      'https://script.google.com/macros/s/AKfycbzhiVOvRHWC6NHYKttuk16m7QDofZv7A80IPwYVlMlWDr1cE8nnklMqJoXc5IXsHlU8/exec', // Ersetze durch deine Script-ID
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
      (window as any).grecaptcha.reset(recaptchaWidgetId);
    } else {
      successMessage.value =
        'Es gab einen Fehler beim Senden der Nachricht. Bitte versuche es später noch einmal.';
    }
  } catch (error) {
    successMessage.value = 'Ein Fehler ist aufgetreten: ' + error;
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div class="flex items-center justify-center h-screen p-10 md:p-0">
    <div class="max-w-md w-full p-8 bg-white shadow-md rounded-lg">
      <h2 class="text-3xl font-semibold text-gray-800 text-center mb-6 font-clash-semibold">
        Kontaktformular
      </h2>

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

        <!-- reCAPTCHA Widget -->
        <div id="recaptcha-container"></div>

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
      <p
        v-if="successMessage"
        class="mt-6 text-center text-green-700 font-semibold font-clash-semibold"
      >
        {{ successMessage }}
      </p>
    </div>
  </div>
</template>

<style scoped>
/* Deine Tailwind-Styles */
</style>
