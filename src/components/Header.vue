<script setup>
import {onMounted, ref} from 'vue';
// import AuthModal from '@/components/AuthModal.vue'
// import { mapGetters, mapActions } from 'vuex'
import DropDown from '@/components/DropDown.vue'

// const { getUser } = mapGetters('user', ['getUser'])
// const { setUser, deleteUser } = mapActions('user', ['setUser', 'deleteUser'])
//
// const isAuthorized = ref(false)
// const isAuthModalOpen = ref(false)
//
// onMounted(() => {
//   setUser(JSON.parse(localStorage.getItem('user')))
// })
//
// const onAuthBtnClick = () => {
//   if (getUser.value) {
//     this.$api.auth.logout()
//     localStorage.removeItem('user')
//     deleteUser()
//     this.$router.push({ name: 'main' })
//   } else {
//     isAuthModalOpen.value = true
//   }
// }



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
    <div class="menu-item"> <router-link to="/authorize">
      <img src="../assets/enter2.png"
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