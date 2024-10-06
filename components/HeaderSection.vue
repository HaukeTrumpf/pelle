<template>
  <div
    :class="['menu-collapsed', { 'menu-expanded': isExpanded }]"
    @click="toggleMenu"
  >
    <div>
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
    </div>
    <nav>
      <ul class="nav-menu">
        <li><a href="#">Home</a></li>
        <li class="d2"><a href="/#aboutUs">Über uns</a></li>
        <li class="d3"><a href="/#services">Leistungen</a></li>
        <li class="d4"><a href="/#credentials">Referenzen</a></li>
        <li class="d5"><a href="/#team">Team</a></li>
        <li class="d6"><a href="/#contact">Kontakt</a></li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const isExpanded = ref(false);

const toggleMenu = () => {
  isExpanded.value = !isExpanded.value;
};

watch(isExpanded, (newVal) => {
  if (newVal) {
    document.body.classList.add('no-scroll');
  } else {
    document.body.classList.remove('no-scroll');
  }
});
</script>

<style>
.menu-collapsed {
  transition: all 0.35s;
  position: fixed;
  top: 10px;
  left: 10px;
  width: 36px;
  height: 36px;
  z-index: 1;
  cursor: pointer;
}

.bar {
  width: 36px;
  height: 4px;
  background-color: rgba(255, 255, 255, 0.95);
  margin: 6px 0;
  transition: 0.4s;
}

.menu-expanded .bar:nth-child(1) {
  transform: rotate(-45deg) translate(-7px, 7px);
}
.menu-expanded .bar:nth-child(2) {
  opacity: 0;
}
.menu-expanded .bar:nth-child(3) {
  transform: rotate(45deg) translate(-7px, -7px);
}

.menu-collapsed .nav-menu {
  transition: all 0s;
  position: fixed;
  transform: translateX(-90000px);
  list-style: none;
}

.menu-expanded {
  transition: all 0.35s;
  position: absolute;
  height: 100vh;
  width: 100%;
  text-align: center;
  line-height: 12vh;
  top: 0;
  left: 0;
  padding: 10px;
  background: rgba(0, 0, 0, 0.8);
}

.menu-expanded .nav-menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10vh;
  transition: all 0.45s;
  position: relative;
  transform: translateX(0);
  z-index: 2;
}

.menu-expanded .nav-menu li {
  animation: fadeInLeft 1s both;
}
.menu-expanded .nav-menu li.d2 {
  animation-delay: 0.2s;
}
.menu-expanded .nav-menu li.d3 {
  animation-delay: 0.3s;
}
.menu-expanded .nav-menu li.d4 {
  animation-delay: 0.4s;
}
.menu-expanded .nav-menu li.d5 {
  animation-delay: 0.5s;
}
.menu-expanded .nav-menu li.d6 {
  animation-delay: 0.6s;
}

.menu-expanded a {
  transition: all 0.65s;
  text-decoration: none;
  font-size: 2em;
  color: white;
  padding: 10px;
}

.menu-expanded a::before {
  content: '';
  position: absolute;
  display: block;
  width: 100%;
  height: 2px;
  bottom: 20px;
  left: 0;
  background-color: #fff;
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.menu-expanded a:hover::before {
  transform: scaleX(1);
}

main {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 1px;
  height: 100%;
}
main div {
  width: 80vw;
  text-align: center;
}

@keyframes fadeInLeft {
  from {
    transform: translateX(-200px);
  }
  to {
    transform: translateX(0);
  }
}
</style>
