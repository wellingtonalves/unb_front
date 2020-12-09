import constants from '../util/constants'
export default {
  filters: {
    maskCpfCnpj(text = '') {
      text = text.trim();
      return text.length > 11
        ? text.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
        : text.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    },
    maskTelefone(text = '') {
      text = text.trim();
      return text.length > 10
        ? text.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
        : text.replace(/^(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    },
    displayLabel(value, name) {
      const item = constants[name].find(res => res.value === value)
      return item ? item.label : ""
    }
  },
};
