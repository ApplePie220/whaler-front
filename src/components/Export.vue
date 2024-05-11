<script setup>
import Header from '@/components/Header.vue'

import { ref } from "vue";

const text = ref("services:\n" +
    "    postgres:\n" +
    "        restart: always\n" +
    "    web:\n" +
    "        build: .\n" +
    "        image: node\n" +
    "version: '3'");
const textarea = ref(null);

function downloadText() {
  const filename = 'docker-compose.yml';
  const blob = new Blob([text.value], { type: 'application/octet-stream' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', filename);
  link.click();
}

function copyText(){
  const textareaEl = textarea.value;
  textareaEl.select();
  document.execCommand("copy");
}
</script>

<template>
  <Header />
  <p class="center-text">Вы можете скопировать код или скачать его файлом</p>
  <div class="container">
    <textarea id="dockerfile" ref="textarea" readonly>{{ text }}</textarea>
  </div>
  <div class="button-container">
    <button @click="copyText">Скопировать</button>
    <button @click="downloadText">Скачать файл</button>
  </div>
</template>

<style scoped>
.container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
}

.center-text {
  text-align: center;
  font-size: 1.2em;
  margin-bottom: 1em;
  margin-top: 3em;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 5em;
}

textarea {
  width: 500px;
  height: 200px;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-top: 2em;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  background-color: #6395c2;
  color: #fff;
  cursor: pointer;
  margin: 0 5px;
}

button:hover {
  background-color: #4580ab;
}
</style>