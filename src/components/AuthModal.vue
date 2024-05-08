<script setup>
import { ref, computed } from 'vue'

const mode = ref('signIn')
const form = ref({
  login: '',
  email: '',
  password: ''
})
const errors = ref([])

const isSignInForm = computed(() => mode.value === 'signIn')

const toggleMode = () => {
  mode.value = isSignInForm.value ? 'signUp' : 'signIn'
}

const changeUserState = () => {
  if (auth.value) {
    localStorage.removeItem('auth')
    router.push({ name: 'dockerfileDiagram' })
  } else {
    localStorage.setItem('auth', true)
    auth.value = true
  }
}

const close = () => {
  emit('close')
}

const formSubmit = () => {
  if (isSignInForm.value) {
    signIn()
  } else {
    signUp()
  }
}

const signIn = async () => {
  await $load(async () => {
    const data = (await $api.auth.signIn({
      login: form.value.login,
      email: form.value.email,
      password: form.value.password
    })).data
    localStorage.setItem('user', JSON.stringify(data))
    store.dispatch('user/setUser', data)
    emit('close')
  })
}

const signUp = async () => {
  await $load(async () => {
    const data = (await $api.auth.signUp({
      email: form.value.email,
      password: form.value.password
    })).data
    localStorage.setItem('user', JSON.stringify(data))
    store.dispatch('user/setUser', data)
    emit('close')
  })
}
</script>

<template>
  <modal
      name="auth-modal"
      classes="auth-modal"
      height="350px"
      width="500px"
      @before-close="close"
  >
    <form @submit.prevent="formSubmit">
      <label>
        Логин
        <input
            type="text"
            class="form-control"
            placeholder="Ваш логин"
            v-model="form.email"
        >
      </label>
      <label>
        Email
        <input
            type="text"
            class="form-control"
            placeholder="Ваша эл. почта"
            v-model="form.email"
        >
      </label>
      <label>
        Пароль
        <input
            type="password"
            class="form-control"
            placeholder="Ваш пароль"
            v-model="form.password"
        >
      </label>
      <div class="actions">
        <a
            href="/"
            @click.prevent="toggleMode"
        >
          {{ isSignInForm ? 'Регистрация' : 'Вход' }}
        </a>
        <button
            type="button"
            class="btn btn-outline-dark"
            @click="$emit('close')"
        >
          Отмена
        </button>
        <button
            type="submit"
            class="btn btn-dark"
        >
          Подтвердить
        </button>
      </div>
    </form>
  </modal>

</template>

<style>
.auth-modal {
  padding: 30px 40px;
}

.auth-modal form {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.auth-modal form h3 {
  margin-bottom: 30px;
}

.auth-modal form label {
  width: 100%;
  margin-bottom: 20px;
}

.auth-modal form .actions {
  margin-top: auto;
  display: flex;
  align-items: baseline;
}

.auth-modal form .actions a {
  color: #EB5804;
}

.auth-modal form .actions button {
  width: 130px;
  margin-left: 10px;
}

.auth-modal form .actions button:first-of-type {
  margin-left: auto;
}
</style>