import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://entrega-backend-3-production.up.railway.app',  // url de railway
    withCredentials: true,
});

export default axiosInstance;