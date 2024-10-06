<template>
  <!-- Footer -->
  <footer class="bg-white" aria-labelledby="footer-heading">
    <main-container
      class="bg-[#2c3e50]"
      id="footer-heading"
      description="no"
      footer="no"
    >
      <h2 class="sr-only">Footer</h2>
      <div class="mx-auto max-w-7xl">
        <div class="flex flex-col lg:flex-row gap-4">
          <div
            class="flex grow justify-center lg:justify-start items-center"
          ></div>
        </div>
      </div>
      <div
        class="flex flex-col gap-4 text-[#c7f9cc] justify-center md:flex-row text-center font-semibold text-lg p-8"
      >
        <a href="/impressum">Impressum</a>
        <a class="md:border-l px-4" href="/datenschutzerklaerung"
          >Datenschutzerklärung</a
        >
      </div>
    </main-container>
  </footer>
</template>
<script>
import { TabList } from '@headlessui/vue';
import MainContainer from './util/MainContainer.vue';

export default {
  components: { MainContainer, TabList },
  data() {
    return {
      zeiten: [
        { day: 'Montag:', time: '08:00 - 13:00 & 14:00 - 17:00' },
        { day: 'Dienstag:', time: 'Geschlossen' },
        { day: 'Mittwoch:', time: '08:00 - 13:00 & 14:00 - 17:00' },
        { day: 'Donnerstag:', time: '17:30 - 19:30' },
        { day: 'Freitag:', time: '08:00 - 14:00' },
      ],
    };
  },
};
</script>
