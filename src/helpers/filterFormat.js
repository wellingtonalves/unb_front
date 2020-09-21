export function filterFormat(filter) {
  return JSON.stringify(filter)
    .replace(/"/g, '')
    .replace('{', '')
    .replace('}', '')
    .replace(/,/g, ';');
}
