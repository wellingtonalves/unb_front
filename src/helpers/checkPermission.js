/**
 * @param permissao
 * @returns {boolean}
 */
export const checkPermission = permissao => {
  const user = JSON.parse(localStorage.getItem('user'));
  const permissoes = localStorage.getItem('userRole');

  if (user.id_perfil === 1) {
    return true;
  }

  if (permissoes.includes(permissao)) {
    return true;
  }

  return false;
};
