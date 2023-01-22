import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const api_url = import.meta.env.VITE_API_URL

export async function getAuthenticatedUser() {
  const defaultReturnObject = { authenticated: false, user: null };
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return defaultReturnObject;
    }
    const response = await axios({
      method: 'GET',
      url: `${api_url}/user/me`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { authenticated = false } = response.data;
    
    return authenticated ? response.data : false;
  } catch (err) {
    console.log('Something Went Wrong', err);
    return defaultReturnObject;
  }
}

export function useUser() {
  const [user, setUser] = useState(null);
  const [authenticated, setAutenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function getUserDetails() {
      const { authenticated, user } = await getAuthenticatedUser();
      if (!authenticated) {
        navigate("/login");
        return;
      }
      setUser(user);
      setAutenticated(authenticated);
    }
    getUserDetails();
  }, []);

  return { user, authenticated };
}