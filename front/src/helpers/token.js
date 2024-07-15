export const getToken = () => {
  return localStorage.getItem("auth");
};
export const setToken = (token) => {
  localStorage.setItem("auth", token);
};

export const handleLogout = () => {
  localStorage.removeItem("auth")
}