import axios from "axios";

// Declarar a porta da api

const ip = '172.16.39.83';
// const ip = '172.16.39.83';

const portaApi = '4466';

// Definir a URL padrão
const apiUrlLocal = `http://${ip}:${portaApi}/api`

// Trazer convfiguração pro axios
const api = axios.create({
    baseURL: apiUrlLocal
});

export default api;

