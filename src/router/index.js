import { createRouter, createWebHistory } from "vue-router"
import dockerfileGraph from '@/components/dockerfilegraph/dockerfileGraph.vue'
import dockcomposeGraph from '@/components/dockercomposegraph/dockcomposeGraph.vue'
import Profile from "@/components/Profile.vue";
import Import from "@/components/Import.vue";
import Export from "@/components/Export.vue";
import SignInOut from "@/components/SignInOut.vue";
import Save from "@/components/Save.vue";

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
            component: Profile
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
            path: '/authorize',
            name: 'authorization',
            component: SignInOut
        },
        {
            path: '/save',
            name: 'savefile',
            component: Save
        },
        // {
        //     path: '/:catchAll(.*)',
        //     name: 'notFound',
        //     component: NotFound
        // }

    ],
    history: createWebHistory()
})

export default router;