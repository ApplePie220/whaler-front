import { createRouter, createWebHistory } from "vue-router"
import dockerfileGraph from '@/components/dockerfilegraph/dockerfileGraph.vue'
import dockcomposeGraph from '@/components/dockercomposegraph/dockcomposeGraph.vue'
import Profile from "@/components/Profile.vue"
import Import from "@/components/Import.vue"
import Export from "@/components/Export.vue"
import Save from "@/components/Save.vue"
import NotFound from "@/components/NotFound.vue"

import store from '@/store/index.js'
import SignInOut from "@/components/SignInOut.vue";

const router = createRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'dockerfileDiagram',
            component: dockerfileGraph,
        },
        {
            path: '/dockercompose',
            name: 'dockercomposeDiagram',
            component: dockcomposeGraph
        },
        {
            path: '/profile',
            name: 'profile',
            component: Profile,
            // meta: { requiresAuth: true }
        },
        {
            path: '/import',
            name: 'importfile',
            component: Import
        },
        {
            path: '/export',
            name: 'exportfile',
            component: Export
        },
        {
            path: '/save',
            name: 'savefile',
            component: Save,
            // meta: { requiresAuth: true }
        },
        {
            path: '/authorize',
            name: 'authorization',
            component: SignInOut,
        },
        {
            path: '/:catchAll(.*)',
            name: 'notFound',
            component: NotFound
        }

    ],
    history: createWebHistory()
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.state.isAuthenticated) {
            next({ path: '/authorize', query: { redirect: to.fullPath }});
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;