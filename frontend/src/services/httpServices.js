import axios from "axios";
// import { toast } from "react-toastify";

// axios.defaults.baseURL = process.env.REACT_APP_API_URL;
// axios.defaults.baseURL = "localhost:3000"


axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.log("Logging the error", error);
    // toast.error("Unexpected Error");
  }

  return Promise.reject(error);
});

// function setJwt(jwt) {
//   axios.defaults.headers.common["x-auth-token"] = jwt;
// }

const methods = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  // setJwt,
};

export default methods;
