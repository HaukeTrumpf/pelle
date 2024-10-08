<template>
  <div
    class="container mx-auto h-screen flex flex-col items-center justify-center p-10 text-center"
  >
    <!-- Überschrift -->
    <h2
      class="font-clash-semibold font-bold text-4xl md:text-6xl text-brand-blue mb-16 text-center"
    >
      Wo?
    </h2>
    <!-- Responsive iframe wrapper using Tailwind CSS without aspect-ratio -->
    <div class="w-full md:w-3/4 lg:w-1/2 h-64 md:h-96 lg:h-[450px]">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d598.426820463264!2d8.2181612697059!3d53.13339999826424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNTPCsDA4JzAwLjIiTiA4wrAxMycwNy43IkU!5e0!3m2!1sde!2sde!4v1728379634118!5m2!1sde!2sde"
        class="w-full h-full border-0"
        allowfullscreen="false"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  </div>
</template>
