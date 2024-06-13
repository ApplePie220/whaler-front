<script setup>
import {onMounted, ref} from 'vue';
import { mapGetters, mapActions } from 'vuex'
import DropDown from '@/components/DropDown.vue'
import { FwbFileInput, FwbButton, FwbModal } from 'flowbite-vue'

import { useRouter } from 'vue-router';

const { getUser } = mapGetters('user', ['getUser'])
const { setUser, deleteUser } = mapActions('user', ['setUser', 'deleteUser'])

const isAuthorized = ref(false)
// const isAuthModalOpen = ref(false)
const router = useRouter();


const isShowModal = ref(false)

function closeModal () {
  isShowModal.value = false
}
function showModal () {
  isShowModal.value = true
}


onMounted(() => {
  const sessionId = getCookie('session_id');
  if (sessionId) {
    setUser(sessionId);
  }
});

const getCookie = (name) => {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split('=');
    if (cookieName === name) {
      return cookieValue;
    }
  }
  return null;
};

const onAuthBtnClick = () => {
  if (getUser.value) {
    this.$api.auth.logout()
    document.cookie = 'session_id=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    deleteUser()
    router.push({ name: 'dockerfileDiagram' })
  } else {
    //pass
  }
}

const authUser = localStorage.getItem('auth')
function saveUserModel(){
  console.log("save file")
}

const services = [
  {
    title: 'Dockerfile',
    link: 'dockerfileDiagram'
  },
  {
    title: 'docker-compose',
    link:'dockercomposeDiagram'
  }
]
const file = ref(null)
const fileInput = ref(null);

const chooseFile = () => {
  fileInput.value.click(); // Симулируем клик на input[type="file"]
};

const downloadFile = () => {
  // Получаем элемент input типа file
  const input = fileInput.value;

  // Проверяем, выбран ли файл
  if (input.files.length > 0) {
    const file = input.files[0];
    const fileName = file.name;

    // Создаем элемент <a> для загрузки файла
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(file);
    downloadLink.download = fileName;

    // Добавляем элемент <a> на страницу и эмулируем клик
    document.body.appendChild(downloadLink);
    downloadLink.click();

    // Удаляем элемент <a> после загрузки файла
    document.body.removeChild(downloadLink);
  } else {
    alert('Выберите файл для загрузки');
  }
};

</script>

<template>
  <nav class="header">

    <div class="menu-item" ><router-link to="/profile">Профиль</router-link></div>

    <div class="dropdown-wrapper">
      <DropDown title="Создать модель" :items="services" />
    </div>

    <input type="file" ref="fileInput" style="display: none">
    <div class="menu-item" @click="showModal">Импорт</div>

    <fwb-modal v-if="isShowModal" @close="closeModal">
      <template #header>
        <div class="flex items-center text-lg">
          Выберите файл для загрузки
        </div>
      </template>
      <template #body>
        <fwb-file-input v-model="file" label="Загрузить файл" >
          <p class="!mt-1 text-sm text-gray-500 dark:text-gray-300">
            Dockerfile или docker-compose.yml
          </p>
        </fwb-file-input>
      </template>
      <template #footer>
        <div class="flex justify-between">
          <fwb-button @click="closeModal" color="alternative">
            Отмена
          </fwb-button>
          <fwb-button @click="closeModal" color="green">
            Загрузить
          </fwb-button>
        </div>
      </template>
    </fwb-modal>

    <div class="menu-item"><router-link to="/export">Экспорт</router-link></div>
    <div class="menu-item" @click="saveUserModel">Сохранить</div>
<!--    <div class="menu-item" v-show="authUser" @click="saveUserModel">Сохранить</div>-->
    <div class="menu-item"> <router-link to="/authorize" >
      <img @click="onAuthBtnClick" src="../assets/enter2.png"
           alt="Вход/Выход"
      />
<!--    </router-link>-->
<!--      <img src="../assets/enter2.png"-->
<!--           alt="Вход/Выход"-->
<!--           @click="onAuthBtnClick"-->
<!--           style="width: 20px; height: 20px; "-->
<!--      />-->
    </router-link>
  </div>
<!--    <auth-modal-->
<!--        v-if="isAuthModalOpen"-->
<!--        @close="isAuthModalOpen = false"-->
<!--    />-->

  </nav>



</template>

<style scoped>

nav {
  display: flex;
  align-items: center;
  justify-content: space-between; /* updated */
  border-bottom: 1px solid #ccc; /* add this line */
}

.dropdown-wrapper {
  margin-left: 200px; /* Измените это значение в зависимости от вашего дизайна */
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