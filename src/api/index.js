import instance from "@/api/instance.js"

import authModule from '@/api/auth.js'

export default {
    auth: authModule(instance)
}