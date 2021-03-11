import Vue from 'vue'
import store from './../store';

/**
 * @param permissao
 * @returns {boolean}
 */
export const checkPermission = permissao => {
  const permissoes = store.getters.userRole;

  if (permissoes.includes(permissao)) {
    return true;
  }

  return false;
};

Vue.prototype.$permissao = checkPermission;