/**
 * TODO - trocar essa função quando corrigir o storage(store)
 * @returns {any}
 */
export const userData = () => {
  return JSON.parse(localStorage.getItem('user'));
};
