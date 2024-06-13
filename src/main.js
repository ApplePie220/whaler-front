import './assets/main.css'
import 'tailwindcss/tailwind.css'
import '../node_modules/flowbite-vue/dist/index.css'
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
import 'flowbite'

import { createApp } from 'vue'
import App from './App.vue'
import api from '@/plugins/api.js'
import ApiPlugin from '@/plugins/api.js'
import LoadPlugin from '@/plugins/load.js'
import router from '@/router/index.js'
import store from '@/store/index.js'

const app = createApp(App)
app.use(router)
app.use(store)
app.use(api)
app.use(ApiPlugin)
app.use(LoadPlugin)
app.use(Toast)
app.mount('#app')
