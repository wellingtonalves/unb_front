import axios from 'axios';

const httpClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

httpClient.defaults.headers.Authorization =
  'Bearer ' + localStorage.getItem('token');
export default httpClient;