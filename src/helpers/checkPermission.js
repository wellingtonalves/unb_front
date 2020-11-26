import store from './../store';

/**
 * @param permissao
 * @returns {boolean}
 */
export const checkPermission = permissao => {
  const user = store.getters.user;
  const permissoes = store.getters.userRole;

  if (user.id_perfil === 1) {
    return true;
  }

  if (permissoes.includes(permissao)) {
    return true;
  }

  return false;
};
