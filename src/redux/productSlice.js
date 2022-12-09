import { createSlice } from '@reduxjs/toolkit';
// import everything from product api
import * as productApi from '../api/productApi';

// create slice
const productSlice = createSlice({
  name: 'products',
  initialState: {
    // products
    products: [],
    // product
    product: {},
    // loading
    loading: true,
    //
    error: '',
    // cart
    cart: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
  },
  reducers: {
    // create reducers
    // get all products
    getAllProductsRequest: (state) => {
      state.loading = true;
    },
    getAllProductsSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    getAllProductsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // get one product
    getOneProductRequest: (state) => {
      state.loading = true;
    },
    getOneProductSuccess: (state, action) => {
      state.loading = false;
      state.product = action.payload;
    },
    getOneProductFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // add one product to cart
    addToCartRequest: (state) => {
      state.loading = true;
    },
    addToCartSuccess: (state, action) => {
      state.loading = false;
      const newItem = action.payload;
      const exists = state.cart.find((item) => {
        if (item._id === newItem._id) {
          return true;
        }
        return false;
      });
      exists !== undefined
        ? (state.cart = [...state.cart])
        : (state.cart = [...state.cart, newItem]);
    },
    addToCartFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // delete one product from cart
    deleteFromCartRequest: (state) => {
      state.loading = true;
    },
    deleteFromCartSuccess: (state, action) => {
      state.loading = false;
      const todelete = action.payload;
      const index = state.cart.findIndex((item) => {
        return item._id === todelete._id;
      });
      state.cart.splice(index, 1);
    },
    deleteFromCartFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

  },
});

// export thunks
export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch(getAllProductsRequest());
    const data = await productApi.getProducts();

    dispatch(getAllProductsSuccess(data));
  } catch (error) {
    dispatch(getAllProductsFail(error.message));
  }
};

export const getOneProduct = (id) => async (dispatch) => {
  // console.log(id)
  try {
    dispatch(getOneProductRequest());
    const data = await productApi.getOneProduct(id);
    dispatch(getOneProductSuccess(data));
  } catch (error) {
    dispatch(getOneProductFail(error.message));
  }
};

// export adding and removing cart items thunk
export const addNremove = (id, qty, flag) => async (dispatch, getState) => {
  if (flag === 'add') {
    try {
      dispatch(addToCartRequest());
      const data = await productApi.getOneProduct(id);
      console.log('add -- addNremove data slice', data);
      data.num = qty;
      dispatch(addToCartSuccess({ ...data }));
      localStorage.setItem(
        'cartItems',
        JSON.stringify(getState().products.cart)
      );
    } catch (error) {
      dispatch(addToCartFail(error.message));
    }
  } else {
    try {
      dispatch(deleteFromCartRequest());
      const data = await productApi.getOneProduct(id);
      console.log('remove -- addNremove data slice', data);
      data.num = qty;
      dispatch(deleteFromCartSuccess({ ...data }));
      localStorage.setItem(
        'cartItems',
        JSON.stringify(getState().products.cart)
      );
    } catch (error) {
      dispatch(deleteFromCartFail(error.message));
    }
  }
};



// export reducers
export const {
  getAllProductsRequest,
  getAllProductsSuccess,
  getAllProductsFail,
  getOneProductRequest,
  getOneProductSuccess,
  getOneProductFail,
  addToCartRequest,
  addToCartSuccess,
  addToCartFail,
  deleteFromCartRequest,
  deleteFromCartSuccess,
  deleteFromCartFail,
} = productSlice.actions;

// export reducer
export default productSlice.reducer;

// export selectors
export const selectProducts = (state) => state.products.products;
export const selectProduct = (state) => state.products.product;
export const selectCart = (state) => state.products.cart;
export const selectLoading = (state) => state.products.loading;
export const selectError = (state) => state.products.error;

// // // Admin parts
// create product
// export const createProduct = (product) => async (dispatch) => {
//   try {
//     dispatch(createProductRequest());
//     const data = await productApi.createProduct(product);
//     dispatch(createProductSuccess(data));
//   } catch (error) {
//     dispatch(createProductFail(error.message));
//   }
// };

// // export thunk to update product
// export const updateProduct = (id, product) => async (dispatch) => {
//   try {
//     dispatch(createProductRequest());
//     const data = await productApi.updateProduct(id, product);
//     dispatch(createProductSuccess(data));
//   } catch (error) {
//     dispatch(createProductFail(error.message));
//   }
// };

// // export thunk to delete product
// export const deleteProduct = (id) => async (dispatch) => {
//   try {
//     dispatch(createProductRequest());
//     const data = await productApi.deleteProduct(id);
//     dispatch(createProductSuccess(data));
//   } catch (error) {
//     dispatch(createProductFail(error.message));
//   }
// };
