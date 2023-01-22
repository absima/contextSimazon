import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from './auth/auth';
import { useCart } from './cart/cart';

const api_url = import.meta.env.VITE_API_URL;

const CtxtProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [cartItems, setCartItems] = useState([0]);
  const [customer, setCustomer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [successful, setSuccessful] = useState(false);

  const [loggedin, setLoggedin] = useState(false);
  const [registered, setRegistered] = useState(false);

  // get all products from the database
  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${api_url}/item`);
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, []);

  useEffect(() => {
    if (localStorage.getItem('cart')) {
      const crt = JSON.parse(localStorage.getItem('cart'));
      setCartItems(
        crt.length > 0 ? crt.reduce((a, item) => a + item.quantity, 0) : 0
      );
    }
  }, [cartItems]);

  const value = {
    api_url,
    useUser,
    useCart,
    cartItems,
    setCartItems,
    products,
    setProducts,
    product,
    setProduct,
    customer,
    setCustomer,
    loading,
    setLoading,
    error,
    setError,
    successful,
    setSuccessful,
    loggedin,
    setLoggedin,
    registered,
    setRegistered,
  };

  return (
    <ProjContext.Provider value={value}>{props.children}</ProjContext.Provider>
  );
};

export const ProjContext = createContext();
export default CtxtProvider;
