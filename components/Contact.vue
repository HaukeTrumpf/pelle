<script setup lang="ts">
import { ref, watch } from 'vue';
import { useCookieControl } from '#imports';

const { cookiesEnabledIds } = useCookieControl();

if (!Array.isArray(cookiesEnabledIds.value)) {
  cookiesEnabledIds.value = [];
}

const name = ref('');
const email = ref('');
const message = ref('');
const successMessage = ref('');
const isSubmitting = ref(false);
let recaptchaWidgetId: number | null = null;
const recaptchaLoaded = ref(false);

// Funktion zum Laden von reCAPTCHA
const loadRecaptcha = (): Promise<void> => {
  return new Promise((resolve) => {
    if (document.getElementById('recaptcha-script')) {
      resolve();
    } else {
      const script = document.createElement('script');
      script.id = 'recaptcha-script';
      script.src = 'https://www.google.com/recaptcha/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        resolve();
      };
      document.head.appendChild(script);
    }
  });
};

// Initialisiere reCAPTCHA, wenn der Benutzer zugestimmt hat
const initializeRecaptcha = async () => {
  console.log('initializeRecaptcha aufgerufen');
  await loadRecaptcha();

  const renderReCaptcha = () => {
    const grecaptcha = (window as any).grecaptcha;
    if (grecaptcha && grecaptcha.render) {
      recaptchaWidgetId = grecaptcha.render('recaptcha-container', {
        sitekey: '6Lf18FkqAAAAABmcLXiM9PDU1zFsdsSJb-ae68az', // Ersetze durch deinen reCAPTCHA Site Key
      });
      console.log('reCAPTCHA Widget-ID:', recaptchaWidgetId);
      recaptchaLoaded.value = true;
    } else {
      setTimeout(renderReCaptcha, 100);
    }
  };

  renderReCaptcha();
};

// Beobachte die Cookie-Einwilligungen
watch(
  () => cookiesEnabledIds.value,
  (newVal) => {
    console.log('Aktivierte Cookies:', newVal);
    if (Array.isArray(newVal) && newVal.includes('recaptcha')) {
      console.log('reCAPTCHA wird initialisiert');
      initializeRecaptcha();
    } else {
      console.log('reCAPTCHA wurde nicht akzeptiert');
    }
  },
  { immediate: true }
);

// Formularverarbeitung
const handleSubmit = async (event: Event) => {
  event.preventDefault();
  isSubmitting.value = true;
  successMessage.value = '';

  if (!recaptchaLoaded.value) {
    successMessage.value = 'Bitte akzeptiere die Cookies, um das Formular zu senden.';
    isSubmitting.value = false;
    return;
  }

  const grecaptcha = (window as any).grecaptcha;
  const recaptchaToken = grecaptcha.getResponse(recaptchaWidgetId);

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
    const response = await fetch('https://script.google.com/macros/s/AKfycbxxBdmKVHKB-drfjgC8nXlXH7HfbPCUceaahZ7h1xhHlNe2eH6JSlwn-dkeJOHgG9X_/exec', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    if (result.status === 'success') {
      successMessage.value = 'Vielen Dank für deine Nachricht! Wir melden uns bald bei dir.';
      // Formular zurücksetzen
      name.value = '';
      email.value = '';
      message.value = '';
      grecaptcha.reset(recaptchaWidgetId);
    } else {
      successMessage.value = 'Es gab einen Fehler beim Senden der Nachricht. Bitte versuche es später noch einmal.';
    }
  } catch (error) {
    console.error('Fehler beim Senden des Formulars:', error);
    successMessage.value = 'Ein Fehler ist aufgetreten. Bitte versuche es später erneut.';
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div class="flex items-center justify-center h-screen p-10 md:p-0">
    <div class="max-w-md w-full p-8 bg-white shadow-md rounded-lg">
      <h2 class="text-3xl font-semibold text-gray-800 text-center mb-6">
        Kontaktformular
      </h2>

      <form @submit="handleSubmit" class="space-y-6">
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

        <!-- Rechtlicher Hinweis -->
         <p class="text-sm text-gray-600 mt-2" v-if="!cookiesEnabledIds.includes('recaptcha')">
          Dieses Formular ist durch reCAPTCHA geschützt, und es gelten die
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer"
            >Datenschutzbestimmungen</a
          >
          und
          <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer"
            >Nutzungsbedingungen</a
          >
          von Google.
        </p>

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
      <p v-if="successMessage" class="mt-6 text-center text-green-700">
        {{ successMessage }}
      </p>
    </div>
  </div>
</template>

<style scoped>
/* Deine Tailwind-Styles */
</style>
