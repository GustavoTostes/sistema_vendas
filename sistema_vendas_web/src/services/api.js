import axios from "axios";

const api = axios.create({

    baseURL: 'http://localhost:5050/',
    withCredentials: true

})

const success = res => res
const error = error => {

    if (error.response.status === 401) window.location = '/login'
    else return Promise.reject(error)

}

api.interceptors.response.use(success, error)

export default api