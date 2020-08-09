import httpClient from './httpClient.service';

export const getAll = async url => {
  return await httpClient
    .get(url)
    .then(response => response)
    .catch(error => error.response);
};

export const create = async (url, data) => {
  return await httpClient
    .post(url, data)
    .then(response => response)
    .catch(error => {
      const result = {};
      if (error.response.data.errros) {
        Object.keys(error.response.data.errors).filter(function(item) {
          result[item] = error.response.data.errors[item][0];
        });
        error.response.data.errors = result;
      }

      return error.response.data;
    });
};
