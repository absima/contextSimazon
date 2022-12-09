import axios from 'axios';

// create product in db
export const createProduct = (product) =>
  axios
    .post(import.meta.env.VITE_API_URL + `item`, product)
    .then((res) => res.data)
    .catch((error) => console.error(error));

export const getProducts = (type) =>
  axios
    .get(import.meta.env.VITE_API_URL + `item`)
    .then((res) => {
      console.log('a');
      console.log(res);
      return res.data;
    })
    .catch((error) => {
      console.log('b');
      console.error(error)
      return []
    });

export const getOneProduct = (id) =>
  axios
    .get(import.meta.env.VITE_API_URL + `item/${id}`)
    .then((res) => res.data)
    .catch((error) => console.error(error));

// update product in db by id
export const updateProduct = (id, product) =>
  axios
    .put(import.meta.env.VITE_API_URL + `item/${id}`, product)
    .then((res) => res.data)
    .catch((error) => console.error(error));
// delete product in db by id
export const deleteProduct = (id) =>
  axios
    .delete(import.meta.env.VITE_API_URL + `item/${id}`)
    .then((res) => res.data)
    .catch((error) => console.error(error));

// add product to cart in db
export const addProductToCart = (id, product) =>
  axios
    .put(import.meta.env.VITE_API_URL + `item/cart/${id}`, product)
    .then((res) => res.data)
    .catch((error) => console.error(error));
// delete product from cart in db
export const deleteProductFromCart = (id) =>
  axios
    .delete(import.meta.env.VITE_API_URL + `item/cart/${id}`)
    .then((res) => res.data)
    .catch((error) => console.error(error));

// get cart from db
export const getCart = (id) =>
  axios
    .get(import.meta.env.VITE_API_URL + `item/cart/${id}`)
    .then((res) => res.data)
    .catch((error) => console.error(error));
