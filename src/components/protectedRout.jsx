import React, { useContext, useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import axios from 'axios';
import { ProjContext } from '../contexter';
import LoadingIndicator from '../components/loading';

export default function ProtectedRoute() {
  const { api_url, loggedin, setLoggedin, setCustomer } = useContext(ProjContext);
  const location = useLocation();

  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    // No token = definitely not logged in
    if (!token) {
      setChecking(false);
      return;
    }

    // Already logged in in state = allow immediately
    if (loggedin) {
      setChecking(false);
      return;
    }

    // Token exists but state isn't hydrated (refresh case) → verify token
    const hydrate = async () => {
      try {
        const res = await axios.get(`${api_url}/user/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data?.authenticated && res.data?.user) {
          setCustomer(res.data.user);
          setLoggedin(true);
        } else {
          localStorage.removeItem('token');
          setCustomer(null);
          setLoggedin(false);
        }
      } catch (err) {
        localStorage.removeItem('token');
        setCustomer(null);
        setLoggedin(false);
      } finally {
        setChecking(false);
      }
    };

    hydrate();
  }, [api_url, loggedin, setCustomer, setLoggedin]);

  if (checking) {
    return <LoadingIndicator />;
  }

  if (!loggedin) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}


// import React, { useContext } from 'react';
// import { Navigate, Outlet, useLocation } from 'react-router-dom';
// import { ProjContext } from '../contexter';

// export default function ProtectedRoute() {
//   const { loggedin } = useContext(ProjContext);
//   const location = useLocation();

//   if (!loggedin) {
//     return <Navigate to="/login" replace state={{ from: location }} />;
//   }

//   return <Outlet />;
// }
