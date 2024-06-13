<script setup>
import Header from '@/components/Header.vue'
import {computed, ref, watch} from "vue";
import { useRouter } from 'vue-router'
import axios from 'axios'


const mode = ref('signIn')
const form = ref({
  email: {
    value: '',
    isValid: true, // Начальное значение для валидности
    errorMessage: '' // Сообщение об ошибке, если поле невалидно
  },
  password: {
    value: '',
    isValid: true,
    errorMessage: ''
  }
})

const validateEmail = () => {
  const emailRegex = '/^[^\s@]+@[^\s@]+\.[^\s@]+$/';
  if (!emailRegex.test(form.value.email.value)) {
    form.value.email.isValid = false;
    form.value.email.errorMessage = 'Введите корректный email';
  } else {
    form.value.email.isValid = true;
    form.value.email.errorMessage = '';
  }
};

watch(() => form.value.email.value, () => {
  validateEmail();
});

watch(() => form.value.password.value, () => {
  validatePassword();
});

const validatePassword = () => {
  // Пример проверки на длину пароля
  if (form.value.password.value.length < 8) {
    form.value.password.isValid = false;
    form.value.password.errorMessage = 'Пароль должен содержать не менее 8 символов';
  } else {
    form.value.password.isValid = true;
    form.value.password.errorMessage = '';
  }
};

const errors = ref([])

const isSignInForm = computed(() => mode.value === 'signIn')

const toggleMode = () => {
  mode.value = isSignInForm.value ? 'signUp' : 'signIn'
}

const changeUserState = () => {
  if (this.$api.auth.value) {
    localStorage.removeItem('auth')
    this.$router.push({ name: 'dockerfileDiagram' })
  } else {
    localStorage.setItem('auth', true)
    this.$api.auth.value = true
  }
}

const formSubmit = () => {
  validateEmail();
  validatePassword();
  if (form.value.email.isValid && form.value.password.isValid) {
    if (isSignInForm.value) {
      signIn()
    } else {
      signUp()
    }
  }
}

const signIn = async () => {
  try{
    const response = await axios.post('http://localhost:8001/api/v1/authuser/',
        {
      email: form.value.email,
      password: form.value.password
    },
         {
          withCredentials: true // Указываем Axios сохранять куки
        })

    const sessionId = response.headers['set-cookie'][0].split(';')[0].split('=')[1];
    document.cookie = `session_id=${sessionId}`;
    localStorage.setItem('user', JSON.stringify(sessionId));
    this.$store.dispatch('user/setUser', sessionId)
    this.$router.push({ name: 'dockerfileDiagram' })
  } catch (error) {
    console.log(error)
  }

}

const signUp = async () => {
  try{
    const response = await axios.post('http://localhost:8001/api/v1/createuser/', {
      email: form.value.email,
      password: form.value.password
    },
        {
        withCredentials: true
    })
    const sessionId = response.headers['set-cookie'][0].split(';')[0].split('=')[1];
    // Сохраняем идентификатор сессии в куки
    document.cookie = `session_id=${sessionId}`;

    localStorage.setItem('user', JSON.stringify(sessionId));
    this.$store.dispatch('user/setUser', sessionId)
    router.push({ name: 'dockerfileDiagram' })
  } catch (error){
    console.log(error)
  }
}

</script>

<template>
  <Header />
  <section class="bg-gray-50 light:bg-gray-500">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="/" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 light:text-black">
        <img class="w-12 h-12 mr-2" src="@/assets/hippopotamus (2).png" alt="logo">
        Whaler
      </a>
      <div class="w-full bg-black rounded-lg shadow light:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-200 dark:border-gray-900">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-600 md:text-2xl light:text-white">
            {{ isSignInForm ? 'Войдите в аккаунт' : 'Создайте аккаунт' }}
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="formSubmit">
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-700 light:text-white">Введите email</label>
              <input type="email" name="email" v-model="form.email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-600 light:text-white light:focus:ring-blue-700 light:focus:border-blue-500" placeholder="name@company.com" required="">
              <div v-if="!form.email.isValid" class="text-red-500">{{ form.email.errorMessage }}</div>
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-700 light:text-white">Введите пароль</label>
              <input type="password" name="password" v-model="form.password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500" required="">
              <div v-if="!form.password.isValid" class="text-red-500">{{ form.password.errorMessage }}</div>
            </div>
<!--            <div class="flex items-center justify-between">-->
<!--              <div class="flex items-start">-->
<!--                <div class="flex items-center h-5">-->
<!--                  <input  v-show="isSignInForm" id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 light:bg-gray-700 light:border-gray-600 light:focus:ring-primary-600 light:ring-offset-gray-800">-->
<!--                </div>-->
<!--                <div class="ml-3 text-sm" >-->
<!--                  <label  v-show="isSignInForm" for="remember" class="text-gray-700 light:text-gray-300">Запомнить меня</label>-->
<!--                </div>-->
<!--              </div>-->
<!--              <a href="#" class="text-sm font-medium text-primary-600 hover:underline light:text-primary-500">Забыли пароль?</a>-->
<!--            </div>-->
            <button type="submit" class="w-full text-white bg-primary-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center light:bg-primary-600 light:hover:bg-primary-700 light:focus:ring-primary-800">{{ isSignInForm ? 'Войти' : 'Зарегистрироваться' }}</button>
            <p class="text-sm font-light text-gray-500 light:text-gray-400">
              <a href="/authorize" @click.prevent="toggleMode" class="font-medium text-primary-600 hover:underline light:text-primary-500">{{ isSignInForm ? 'Регистрация' : 'Вход' }}</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>