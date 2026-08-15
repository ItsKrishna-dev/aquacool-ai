export function getStoredTheme() {
  return localStorage.getItem("aquacool-theme") || "dark";
}
export function storeTheme(theme) {
  localStorage.setItem("aquacool-theme", theme);
}
