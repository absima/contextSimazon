// import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Message from '../components/message';
import { useContext } from 'react';
import { ProjContext } from '../contexter';

const SignIn = () => {
  const {
    api_url,
    useUser,
    customer,
    setCustomer,
    loading,
    setLoading,
    error,
    setError,
    // cart,
    // setCart,
    loggedin,
    setLoggedin,
  } = useContext(ProjContext);

  const navigate = useNavigate();

  // const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  //
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [usernameValid, setUsernameValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);

  const [formValid, setFormValid] = useState(false);
  // const [successful, setSuccessful] = useState(false);

  const validateUserName = (username) => {
    const re = /^[a-zA-Z ]{5,30}$/;
    return re.test(String(username));
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return re.test(String(password));
  };

  //
  useEffect(() => {
    if (usernameValid && passwordValid) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [usernameValid, passwordValid]);

  //
  //
  // useEffect(() => {
  //   if (flagg == 'login' && loggedin) {
  //     console.log(flagg, loggedin, customer)
  //     navigate(`/profile/${customer}`, { replace: true });
  //   }
  //   if (flagg == 'register' && !error1) {
  //     navigate(`/registered`, { replace: true });
  //     setFlagg('login');
  //   }
  // }, [error1, customer]);

  //
  const handleUsernameChange = (e) => {
    const username = e.target.value;
    setUsername(username);
    if (!validateUserName(username)) {
      setUsernameError(
        'Username must be at least 5 characters long and contain only letters'
      );
      setUsernameValid(false);
    } else {
      setUsernameError('');
      setUsernameValid(true);
    }
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setPassword(password);
    if (!validatePassword(password)) {
      setPasswordError(
        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter and one number'
      );
      setPasswordValid(false);
    } else {
      setPasswordError('');
      setPasswordValid(true);
    }
  };

  //

  const signingin = async () => {
  try {
    setLoading(true);
    setError(null);              // clear previous errors

    const response = await axios({
      method: 'post',
      url: `${api_url}/user/login`,
      data: {
        username,
        password,
      },
    });

    if (!response?.data?.token) {
      console.log('Something was not right: ', response);
      setError('Invalid login response');
      return;
    }

    const token = response.data.token;
    localStorage.setItem('token', token);

    setLoggedin(true);

    if (response.data.user) {
      setCustomer(response.data.user);
    }

    navigate('/dashboard');
  } catch (err) {
    console.log('Some error occurred: ', err);
    setError(err.response?.data?.message || 'Login failed');
    setLoggedin(false);
  } finally {
    setLoading(false);
  }
};


  //
  const handleSubmitLogin = (e) => {
    e.preventDefault();
    signingin(username, password);
  };

  return (
    <form className="form" noValidate onSubmit={handleSubmitLogin}>
      <div>
        <h1>Login</h1>
      </div>
      <div>{error && <Message variant="danger">Retry</Message>}</div>
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          placeholder="Enter username"
          value={username}
          onChange={handleUsernameChange}
        />
        {usernameError && <div className="error">{usernameError}</div>}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={password}
          onChange={handlePasswordChange}
        />
        {passwordError && <div className="error">{passwordError}</div>}
      </div>
      <div>
        <button
          type="submit"
          className="buttoncolor" 
          disabled={!usernameValid || !passwordValid}
        >
          {loading && <i className="fa fa-refresh fa-spin"></i>}
          Log in
        </button>
      </div>
      {error && <div className="error">Error logging in</div>}
      <div>
        <label />
        <div>
          New customer? <Link to={`/register`}>Create your account</Link>
        </div>
      </div>
    </form>
  );
};

export default SignIn;
