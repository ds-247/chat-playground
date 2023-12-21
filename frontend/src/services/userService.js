import http from "./httpServices";
const apiEndPoint = "http://localhost:3000/users/register";

export async function register(user) {
  console.log(user)
  return http.post(apiEndPoint, {
    name: user.name,
    password: user.password,
    username: user.username
  });
}

// export async function getUser() {
//   return http.get(apiEndPoint + "/me");
// }
