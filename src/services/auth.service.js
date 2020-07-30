import httpClient from './httpClient.service';

export const login = async (username, password) => {
  return await httpClient
    .post('/auth/login', {username, password})
    .then(response => {
      httpClient.defaults.headers.Authorization = `Bearer ${response.data.data.access_token}`;
      return response;
    })
    .catch(error => error.response);
};

export const logout = async () => {
  return await httpClient
    .post('/auth/logout')
    .then(response => response)
    .catch(error => error.response);
};

export const user = async () => {
  return await httpClient
    .get('/auth/user')
    .then(response => response)
    .catch(error => error.response);
};
