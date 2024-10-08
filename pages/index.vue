<script setup lang="ts">
import { defineAsyncComponent } from '#imports';
import HeroSection from '@/components/HeroSection.vue';
const EventPlaner = defineAsyncComponent(
  () => import('@/components/EventPlaner.vue')
);
const InstaGallery = defineAsyncComponent(
  () => import('@/components/InstaGallery.vue')
);
const Contact = defineAsyncComponent(() => import('@/components/Contact.vue'));
import { ref } from '#imports';
import Location from '~/components/Location.vue';

// Meta-Tags und SEO optimierung
useHead({
  title: 'Pelle der Späti | Pelle',
  meta: [
    {
      name: 'description',
      content:
        'Entdecke spannende Events und vielfältige Kulturangebote bei Pelle. Von Live-Musik über Kunstausstellungen bis hin zu kulturellen Veranstaltungen – erlebe einzigartige Momente in einer inspirierenden Atmosphäre.',
    },

    { name: 'keywords', content: 'Kultur, Events, Späti, Pelle, was, geht' },
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
    <section id="hero" class="bg-off-white h-screen">
      <HeroSection />
    </section>

    <!-- EventPlaner Section -->
    <section id="events" class="bg-off-white min-h-screen">
      <EventPlaner />
    </section>

    <section id="events" class="bg-off-white min-h-screen">
      <Location />
    </section>

    <!-- InstaGallery Section -->
    <section id="gallery" class="bg-off-white h-screen">
      <InstaGallery />
    </section>

    <!-- Contact Section -->
    <section id="contact" class="bg-off-white h-screen">
      <Contact />
    </section>
  </div>
</template>

<style scoped>
/* Scroll-Snap und Sticky Settings */
</style>
