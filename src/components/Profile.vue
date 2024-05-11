<script setup>
import Header from '@/components/Header.vue'
const files = [
  {
    name: 'Dockerfile_2346522',
    size: 'dockerfile',
    type: 'тип',
    lastModified: '2023-01-23T13:23Z',
  },
  {
    name: 'docker-compose.yml_3566543',
    size: 'docker-compose.yml',
    type: 'тип',
    lastModified: '2023-01-23T12:23Z',
  },
  {
    name: 'docker-compose.yml_209584',
    size: 'docker-compose.yml',
    type: 'тип',
    lastModified: '2023-01-23T11:23Z',
  },
  {
    name: 'Dockerfile_4969604',
    size: 'dockerfile',
    type: 'тип',
    lastModified: '2023-01-23T10:23Z',
  },
]

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' };
  return date.toLocaleString('en-US', options);
}
</script>

<template>
  <Header />
  <div class="flex justify-center">
    <div class="mt-16 w-1/2">
      <div class="flex justify-between">
        <p class="text-2xl font-semibold leading-6 text-gray-900">Сохраненные модели</p>
        <p class="text-lg font-semibold leading-6 text-gray-900">test@mail.ru</p>
      </div>
      <ul role="list" class="divide-y divide-gray-100 mt-6">
        <li v-for="file in files" :key="file.name" class="flex justify-between gap-x-6 py-5">
          <div class="flex min-w-0 gap-x-4">
            <div class="min-w-0 flex-auto">
              <p class="text-sm font-semibold leading-6 text-gray-900">{{ file.name }}</p>
              <p class="mt-1 truncate text-xs leading-5 text-gray-500">{{ file.size }} - {{ file.type }}</p>
            </div>
          </div>
          <div class="flex gap-x-2">
            <button class="bg-gray-200 hover:bg-red-300 text-black font-semibold px-2 py-1 rounded">Удалить</button>
            <button class="bg-gray-200 hover:bg-blue-300 text-black font-semibold px-2 py-1 rounded">Импорт</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>

</style>