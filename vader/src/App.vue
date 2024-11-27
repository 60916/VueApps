<script setup>
import { RouterLink, RouterView } from 'vue-router'
import BurgerMenu from './components/BurgerMenu.vue'
import { ref } from 'vue'

const menuActive = ref(false)
</script>

<template>
  <header>
    <BurgerMenu @toggle-menu="menuActive = !menuActive" :active="menuActive" />
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/Locations">Locations</RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />
</template>

<style scoped></style>
