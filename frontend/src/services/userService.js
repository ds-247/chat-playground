import http from "./httpServices";
const apiEndPoint = "http://localhost:3000/users";

export async function register(user) {
  return http.post(apiEndPoint + "/register", {
    name: user.name,
    password: user.password,
    username: user.username,
  });
}

export async function getUsers() {
  return http.get(apiEndPoint);
}
