import axios from "axios"

export const API_URL = "http://localhost:1002";

const api = axios.create({
    baseURL: API_URL,
    timeout: 200000,
});

Object.freeze(api);

export default api