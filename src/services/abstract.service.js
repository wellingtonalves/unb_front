import httpClient from './httpClient.service';

export const getAll = async url => {
  return await httpClient
    .get(url)
    .then(response => response)
    .catch(error => error.response);
};
