<script setup>
import {onMounted, ref} from 'vue';
import { mapGetters, mapActions } from 'vuex'
import DropDown from '@/components/DropDown.vue'

import { useRouter } from 'vue-router';

const { getUser } = mapGetters('user', ['getUser'])
const { setUser, deleteUser } = mapActions('user', ['setUser', 'deleteUser'])

const isAuthorized = ref(false)
// const isAuthModalOpen = ref(false)
const router = useRouter();

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

</script>

<template>
  <nav class="header">

    <div class="menu-item"><a href="/profile">Профиль</a></div>

    <DropDown title="Создать модель" :items="services" />

    <div class="menu-item"><router-link to="/import">Импорт</router-link></div>
    <div class="menu-item"><router-link to="/export">Экспорт</router-link></div>
    <div class="menu-item"><router-link to="/save">Сохранить</router-link></div>
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