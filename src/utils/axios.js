import axios from "axios";


const axiosInstance = axios.create({
    baseURL: 'https://json-web-server-2023.herokuapp.com'
})

export default axiosInstance;