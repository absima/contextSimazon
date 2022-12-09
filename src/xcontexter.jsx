import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
// import { useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalalStorage } from './auth/useLocalStorage';
// import { useSearchParams } from "react-router-dom";

const CtxtProvider = (props) => {
  const [customer, setCustomer] = useState(['ab']);
  const [loading1, setLoading1] = useState(false);
  const [error1, setError1] = useState(false);
  const [cart1, setCart1] = useState([2]);
  const [flagg, setFlagg] = useState('login');
  const [successful, setSuccessful] = useState(false);

  //
  const [token, setToken] = useLocalalStorage('token', null);
  // const navigate = useNavigate();
  // customer, loading1, error1, setCustomer, setSuccessful, successful, signingup, logout, token, cart1, setCart1, setToken,
  const logout = async (data) => {
    setToken(null);
    navigate('/', { replace: true });
  };
  //

  // // signup part
  // const signingup = (name, username, email, password) => {
  //   const configuration = {
  //     method: 'post',
  //     url: 'http://localhost:5050/user/register',
  //     data: {
  //       name,
  //       username,
  //       email,
  //       password,
  //     },
  //   };

  //   // make the API call
  //   axios(configuration)
  //     .then((result) => {
  //       setSuccessful(true);
  //       console.log('register set to true in config', register);
  //     })
  //     .catch((error) => {
  //       setSuccessful(false);
  //       console.log('error here in registration');
  //       error = new Error();
  //     });
  // };

  // // signin part
  // const signin = (username, password) => {
  //   const configuration = {
  //     method: 'post',
  //     url: 'http://localhost:5050/user/login',
  //     data: {
  //       username,
  //       password,
  //     },
  //   };

  //   // make the API call
  //   axios(configuration)
  //     .then((result) => {
  //       setSuccessful(true);
  //       console.log('login set to true in config', register);
  //     })
  //     .catch((error) => {
  //       setSuccessful(false);
  //       console.log('error here in login');
  //       error = new Error();
  //     });
  // };

  // // login part
  // const signingin = async (username, password) => {
  //   const res = await fetch('http://localhost:5050/user/login', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       username: username,
  //       password: password,
  //     }),
  //     mode: 'cors',
  //   });
  //   const token = await res.json();

  //   console.log('sigining in ', token)
  //   setToken(token);

  //   // navigate(`/profile/${username}`);

  //   const to = `/profile/${username}`;
  //   // console.log(to);
  //   // return () => navigate(to, { replace: true });

  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoading1(true);
  //       const { data } = await axios.get('http://localhost:5050/user/');
  //       setLoading1(false);
  //       setCustomer(data);
  //     } catch (err) {
  //       setError1(err.message);
  //       setLoading1(false);
  //     }
  //   };
  //   fetchData();
  // }, []);

  const value = {
    customer,
    loading1,
    error1,
    setCustomer,
    setSuccessful,
    successful,
    // signingup,
    logout,
    token,
    cart1,
    setCart1,
    setToken,
    setError1,
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
