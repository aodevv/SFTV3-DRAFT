import axios from 'axios';
import { root } from '../routers/paths';
const instance = axios.create({
  baseURL: root,
  //   timeout: 1000,
  headers: { 'Content-Type': 'application/form-data' },
});

instance.interceptors.request.use((config) => {
  console.log(config);
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const get = async function ({ url, options = null }) {
  const response = await instance.get(url, options);
  return response.data;
};

export const put = async function ({ url, data = null, options = null }) {
  const response = await instance.put(url, data, options);
  return response.data;
};

export const post = async function ({ url, data = null, options = null }) {
  const response = await instance.post(url, data, options);
  return response;
};

export const dlt = async function ({ url, options = null }) {
  const response = await instance.delete(url, options);
  return response.data;
};
