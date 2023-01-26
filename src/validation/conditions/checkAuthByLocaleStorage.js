export function isAuthenticated() {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("username")) {
    return localStorage.getItem("username");
  } else if (sessionStorage.getItem("username")) {
    return sessionStorage.getItem("username");
  } else {
    return false;
  }
}
