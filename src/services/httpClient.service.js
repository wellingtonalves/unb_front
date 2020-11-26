import axios from 'axios';
import router from '@/router';

const httpClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

httpClient.defaults.headers.Authorization =
  'Bearer ' + localStorage.getItem('token');

httpClient.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (401 === error.response.status) {
    router.push('/login');
  } else {
    return Promise.reject(error);
  }
});

export default httpClient;