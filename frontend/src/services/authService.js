import http from "./httpServices";
import { jwtDecode } from "jwt-decode";
const apiEndPoint = "http://localhost:3000";

http.setJwt(getJwt());

export async function login(username, password) {
  try {
    const response = await http.post(`${apiEndPoint}/login`, {
      password: password,
      username: username,
    });

    const jwt = response.data;
    loginWithJwt(jwt.token);

    return jwt.token;
  } catch (error) {
    throw error;
  }
}

export async function logout() {
  localStorage.removeItem("token");
}

export function loginWithJwt(token) {
  localStorage.setItem("token", token);
}

export function getJwt() {
  return localStorage.getItem("token");
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem("token");
    const data = jwtDecode(jwt);
    return data;
  } catch (ex) {
    return null;
  }
}

const funx = {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
  getJwt,
};

export default funx;
