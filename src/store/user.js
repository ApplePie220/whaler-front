export default {
    namespaced: true,
    state: {
        user: null,
        isAuthenticated: false
    },
    getters: {
        getUser(state) {
            return state.user
        }
    },
    mutations: {
        SET_USER(state, payload) {
            state.user = payload;
            state.isAuthenticated = !!payload
        },
        DELETE_USER(state) {
            state.user = null
        }
    },
    actions: {
        setUser({ commit }, payload) {
            commit('SET_USER', payload)
        },
        deleteUser({ commit }) {
            commit('DELETE_USER', null)
        }
    }
}
