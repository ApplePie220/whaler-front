<script setup>
import { ref } from 'vue';

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
</script>

<template>
  <div class="header">
    <button @click="handleImport">Импорт</button>
    <button @click="handleExport">Экспорт</button>
    <button @click="handleProfile">Профиль</button>
    <button @click="handleLogin">Вход</button>
  </div>
</template>

<style scoped>
.header {
  background-color: #b85858;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>