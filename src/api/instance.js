import axios from "axios"

const instance = axios.create({
    baseURL: 'http://localhost:8001/',
    withCredentials: true,
    headers:{
        accept: 'application/json'
    }
})

export default instance