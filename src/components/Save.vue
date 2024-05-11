<script setup>
import Header from '@/components/Header.vue'
import saveAs from 'file-saver'

const saveToFile = () => {
  const blob = new Blob([localStorage.getItem('dockercompose_flow')], { type: 'text/json;charset=utf-8' });
  saveAs(blob, 'myFile.json');
}
</script>

<template>
  <Header />
  <div>
    <button @click="saveToFile">Сохранить файл</button>
  </div>
</template>

<style scoped>

</style>