export const localStorageAsync = (page) =>
  setTimeout(() => window.localStorage.setItem('currentPage', page), 0)
