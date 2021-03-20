import httpClient from './httpClient.service';
import store from './../store'

export const get = async (url, options = {}) => {
  return await httpClient
    .get(url, options)
    .then((response = {}) => response)
    .catch((error = {}) => errorHandler(error));
};

export const create = async (url, data) => {
  return await httpClient
    .post(url, data)
    .then(response => {
      return handleMessage(response)
    })
    .catch(error => errorHandler(error));
};

export const update = async (url, data) => {
  return await httpClient
    .put(url, data)
		.then(response => {
			return handleMessage(response)
		})
    .catch(error => errorHandler(error));
};

export const remove = async endpoint => {
  return await httpClient
    .delete(endpoint)
    .then(response => {
      return handleMessage(response)
    })
    .catch(error => errorHandler(error));
};

function errorHandler(error) {
  const result = {};
  if (error.response.data.errros) {
    Object.keys(error.response.data.errors).filter(function (item) {
      result[item] = error.response.data.errors[item][0];
    });
    error.response.data.errors = result;
  }
  handleMessage(error.response)
  return error.response.data;
}

function handleMessage(response) {
  if(!response.data.message){
    return;
  }
  store.dispatch('setSnackbar', {text: response.data.message, color: response.data.messageType, active: true})
  return response
}
