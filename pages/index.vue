<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { useHead } from '@vueuse/head'; // Meta-Tag Support
import HeroSection from '~/components/HeroSection.vue';
const EventPlaner = defineAsyncComponent(
  () => import('~/components/EventPlaner.vue')
);
const InstaGallery = defineAsyncComponent(
  () => import('~/components/InstaGallery.vue')
);
const Contact = defineAsyncComponent(() => import('~/components/Contact.vue'));
import { ref } from 'vue';

// Meta-Tags und SEO optimierung
useHead({
  title: 'Pelle der Spaeti | Pelle',
  meta: [
    { name: 'description', content: 'Events und Kultur bei Pelle' },
    { name: 'keywords', content: 'Kultur, Events, Spaeti, Pelle, was, geht' },
    { property: 'og:title', content: 'Pelle' },
    {
      property: 'og:description',
      content:
        'Hier findest du aktuelle Termine bei Pelle und die Möglichkeit uns zu kontaktieren',
    },
    { property: 'og:image', content: 'https://example.com/image.jpg' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://example.com' },
  ],

  script: [
    {
      type: 'application/ld+json',
      json: {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Dein Firmenname',
        url: 'https://example.com',
        logo: 'https://example.com/logo.png',
        sameAs: [
          'https://www.facebook.com/deineSeite',
          'https://www.instagram.com/deineSeite',
        ],
      },
    },
  ],
});

// Referenzen für Komponenten
const observedElements = ref([]);

const setRef = (el) => {
  if (el) {
    observedElements.value.push(el);
  }
};
</script>

<template>
  <div class="page-container">
    <!-- hero-section -->
    <section id="hero" class="  bg-off-white h-screen">
      <img
        class="absolute w-full top-0 m:top-[-20vh] z-10"
        loading="lazy"
        src="/assets/images/wimpel2.png"
        alt=""
      />
      <HeroSection />
    </section>

    <!-- EventPlaner Section -->
    <section id="events" class="  bg-off-white min-h-screen" >
      <EventPlaner />
    </section>

    <!-- InstaGallery Section -->
    <section id="gallery" class="  bg-off-white h-screen">
      <InstaGallery />
    </section>

    <!-- Contact Section -->
    <section id="contact" class=" bg-off-white h-screen">
      <Contact />
    </section>
  </div>
</template>

<style scoped>
/* Scroll-Snap und Sticky Settings */
</style>
