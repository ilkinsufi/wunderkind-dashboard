import axios, { AxiosInstance } from 'axios';

import { STORAGE_KEY } from 'src/auth/context/jwt';

export const API_KEY = import.meta.env.VITE_API_KEY;

export const BASE_URL = import.meta.env.VITE_SERVER_URL;

const request: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    Authorization: `Bearer ${API_KEY}`,
  },
});

request.interceptors.request.use(
  async (config) => {
    config.headers['X-API-KEY'] = API_KEY;
    config.headers['Access-Control-Allow-Origin'] = '*';
    config.headers['Accept-Language'] = 'az';
    const token = sessionStorage.getItem(STORAGE_KEY);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default request;
