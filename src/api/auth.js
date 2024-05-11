export default function (instance) {
    return {
        signIn(payload) {
            return instance.post('api/v1/createuser', payload)
        },
        signUp(payload) {
            return instance.post('api/v1/authuser', payload)
        },
        logout() {
            return instance.delete('api/v1/logout')
        }
    }
}