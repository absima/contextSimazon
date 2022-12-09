import { configureStore } from '@reduxjs/toolkit';
// import { selectedProd } from './selectedProdSlice';
import productReducer from './productSlice';
// import cartReducer from './cartSlice'
// import userReducer from './customerSlice'
// import messageReducer from './messageSlice';
import userReducer from './userSlice';
// import orderReducer from './orderSlice'

export default configureStore({
  reducer: {
    // products
    products: productReducer,
    // user
    user: userReducer,
    // message
    // message: messageReducer,
    // cart
    // cart: cartReducer,
  },
});
