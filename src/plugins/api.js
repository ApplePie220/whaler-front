import api from '@/api/index.js'

export default {
    install: (app) => {
        app.config.globalProperties.$api = api;
    }
}