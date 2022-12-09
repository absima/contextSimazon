import axios from 'axios';

// register user using name, email, password
export const register = (name, username, email, password) =>
  axios
    .post(import.meta.env.VITE_API_URL + `user/register`, {
      name,
      username,
      email,
      password,
    })
    .then((res) => res.data)
    .catch((error) => console.error(error));

// sign in
export const login = (username, password) =>
  axios
    .post(import.meta.env.VITE_API_URL + `user/login`, { username, password })
    .then((res) => res.data)
    .catch((error) => error);

// sign out
export const logout = () =>
  axios
    .get(import.meta.env.VITE_API_URL + `user/logout`)
    .then((res) => res.data)
    .catch((error) => console.error(error));

// get user profile
export const getProfile = (username) =>
  axios
    .get(import.meta.env.VITE_API_URL + `user/profile`, { username })
    .then((res) => res.data)
    .catch((error) => console.error(error));

// export const getProfile = () =>
//   axios
//     .get(import.meta.env.VITE_API_URL + `user/profile`)
//     .then((res) => res.data)
//     .catch((error) => console.error(error));
