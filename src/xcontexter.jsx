import { createContext, useState, useEffect } from 'react';
// import axios from 'axios';
// import { useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalalStorage } from './auth/useLocalStorage';
// import { useSearchParams } from "react-router-dom";

const CtxtProvider = (props) => {
  const [customer, setCustomer] = useState('');
  const [loading1, setLoading1] = useState(false);
  const [error1, setError1] = useState(false);
  const [cart1, setCart1] = useState([2]);
  const [flagg, setFlagg] = useState('login');
  const [successful, setSuccessful] = useState(false);

  const [loggedin, setLoggedin] = useState(false);
  const [registered, setRegistered] = useState(false);

  // const navigate = useNavigate();
  //
  const [token, setToken] = useLocalalStorage('token', null);
  // const navigate = useNavigate();
  // customer, loading1, error1, setCustomer, setSuccessful, successful, signingup, logout, token, cart1, setCart1, setToken,

  const value = {
    // navigate
    loggedin,
    setLoggedin,
    registered,
    setRegistered,
    customer,
    loading1,
    error1,
    setCustomer,
    setSuccessful,
    successful,
    // signingup,
    token,
    cart1,
    setCart1,
    setToken,
    setError1,
    flagg,
    setFlagg,
  };

  return (
    <ProjContext.Provider value={value}>{props.children}</ProjContext.Provider>
  );
};

export const ProjContext = createContext();
export default CtxtProvider;

// const CtxtProvider = (props) => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const { data } = await axios.get('http://localhost:5050/item');
//         setLoading(false);
//         setProducts(data);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   return (
//     <ProjContext.Provider
//       value={{
//         products,
//         loading,
//         error,
//         setProducts,
//         setLoading,
//         setError,
//       }}
//     >
//       {props.children}
//     </ProjContext.Provider>
//   );
// };

// export const ProjContext = createContext();
// export default CtxtProvider;
