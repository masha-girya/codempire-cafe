export function setLocalItem(key: string, value: string) {
  localStorage.setItem(key, value);
}

export function getLocalItem(key: string) {
  const token = localStorage.getItem(key);

  return token;
}