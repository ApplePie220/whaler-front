<script setup>
import { ref } from 'vue';
import DropDown from '@/components/DropDown.vue'


// Добавьте необходимые функции обработчиков для кнопок
const handleImport = () => {
  console.log('Handle Import');
};

const handleExport = () => {
  console.log('Handle Export');
};

const handleProfile = () => {
  console.log('Handle Profile');
};

const handleLogin = () => {
  console.log('Handle Login');
};

const services = [
  {
    title: 'Dockerfile',
    link: '/'
  },
  {
    title: 'docker-compose',
    link:'/dockercompose'
  }
]

</script>

<template>
  <nav class="header">

    <div class="menu-item"><a href="/profile">Профиль</a></div>

    <DropDown title="Создать модель" :items="services" />

    <div class="menu-item"><router-link to="/import">Импорт</router-link></div>
    <div class="menu-item"><router-link to="/export">Экспорт</router-link></div>
    <div class="menu-item"><router-link to="/save">Сохранить</router-link></div>
    <div class="menu-item"><router-link to="/authorize">
      <img src="../assets/enter2.png" alt="Вход" style="width: 20px; height: 20px; "/>
    </router-link></div>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  align-items: center;
  justify-content: space-between; /* updated */
  border-bottom: 1px solid #ccc; /* add this line */
}

nav .menu-item {
  color: #a13e3e;
  padding: 10px 20px;
  position: relative;
  text-align: center;
  border-bottom: 3px solid transparent;
  display: flex;
  transition: 0.4s;
}

nav .menu-item.active,
nav .menu-item:hover {
  background-color: #444;
  border-bottom-color: #FF5858;
}

nav .menu-item a {
  color: inherit;
  text-decoration: none;
}
</style>