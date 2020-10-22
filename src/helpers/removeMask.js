/**
 * Ao utilizar a lib vue the mask como diretiva, ela sempre retorna o valor do input com mascara,
 * essa função é necessária para remover a mascara antes de enviar os dados a camada de serviço.
 * 
 * @param data
 * @returns {Promise<{}>}
 */
const removeMask = async data => {
  let dataHandler = {};
  Object.keys(data).forEach(function(key) {
    if (key == 'nr_cpf') {
      dataHandler[key] = data[key].replace(/[^0-9]+/g, '');
    } else {
      dataHandler[key] = data[key];
    }
  });

  return dataHandler;
};

export default removeMask;
