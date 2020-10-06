// TODO - criar uma função dinamica para filtrar objetos com 2 níveis
// exemplo, esta na entidade usuario e preciso filtrar a entidade pessoa.
// JSON.stringify(
//   Object.keys(value)
//     .map(valor => [key, valor + ':' + value[valor]].join('.'))
//     .join(';')
// );
export function filterFormat(filter) {
  return JSON.stringify(filter)
    .replace(/"/g, '')
    .replace('{', '')
    .replace('}', '')
    .replace(/,/g, ';');
}
