import axios from 'axios';

const clientAxios = axios.create({
    baseURL: 'https://localhost:44380'
    
});

export default clientAxios;