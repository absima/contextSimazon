import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Message from '../components/message';
import { useContext } from 'react';
import { ProjContext } from '../contexter';

const SignUp = () => {
  const {
    api_url,
    loading,
    setLoading,
    error,
    setError,
    registered,
    setRegistered,
  } = useContext(ProjContext);

  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [nameError, setNameError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const [nameValid, setNameValid] = useState(false);
  const [usernameValid, setUsernameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);

  const [formValid, setFormValid] = useState(false);
  const [successful, setSuccessful] = useState(false);

  
  const validateName = (name) => {
    const re = /^[a-zA-Z ]{2,30}$/;
    return re.test(String(name));
  };

  const validateUserName = (username) => {
    const re = /^[a-zA-Z ]{5,30}$/;
    return re.test(String(username));
  };

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return re.test(String(password));
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    return password === confirmPassword;
  };

  useEffect(() => {
    if (
      nameValid &&
      usernameValid &&
      emailValid &&
      passwordValid &&
      confirmPasswordValid
    ) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [
    nameValid,
    usernameValid,
    emailValid,
    passwordValid,
    confirmPasswordValid,
  ]);

  //
  // useEffect(() => {
  //   if (flagg == 'login' && loggedin) {
  //     console.log(flagg, loggedin, customer)
  //     navigate(`/profile/${customer}`, { replace: true });
  //   }
  //   if (flagg == 'register' && !error) {
  //     navigate(`/registered`, { replace: true });
  //     setFlagg('login');
  //   }
  // }, [error, customer]);

  // handle name change
  const handleNameChange = (e) => {
    const name = e.target.value;
    setName(name);
    if (!validateName(name)) {
      setNameError(
        'Name must be at least 2 characters long and contain only letters'
      );
      setNameValid(false);
    } else {
      setNameError('');
      setNameValid(true);
    }
  };

  // handle username change
  const handleUsernameChange = (e) => {
    // console.log('------>>>>>>>>>>>>username change', e.target.value);
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

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setEmail(email);
    if (!validateEmail(email)) {
      setEmailError('Invalid email');
      setEmailValid(false);
    } else {
      setEmailError('');
      setEmailValid(true);
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

  const handleConfirmPasswordChange = (e) => {
    const confirmPassword = e.target.value;
    setConfirmPassword(confirmPassword);
    if (!validateConfirmPassword(password, confirmPassword)) {
      setConfirmPasswordError('Passwords do not match');
      setConfirmPasswordValid(false);
    } else {
      setConfirmPasswordError('');
      setConfirmPasswordValid(true);
    }
  };

  //

  const signingUp = async () => {
    try {
      setLoading(true);
      const response = await axios({
        method: 'POST',
        url: `${api_url}/user/register`,
        data: {
          name,
          username,
          email,
          password,
          confirmPassword,
        },
      });
      if (!response?.data?.token) {
        console.log('Something went wrong during signing up: ', response);
        return;
      }
      navigate('/login');
      setRegistered(true);
    } catch (err) {
      console.log('Some error occured during signing up: ', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitRegister = (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();
    signingUp(name, username, email, password);
  };

  return (
    <form className="form" noValidate onSubmit={handleSubmitRegister}>
      <div>
        <h1>Register</h1>
      </div>
      <div>{error && <Message variant="danger">Retry</Message>}</div>
      <div
      // className="form-group"
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          // className="form-control"
          name="name"
          placeholder="Enter name"
          required
          value={name}
          onChange={handleNameChange}
        />
        {nameError && <div className="error">{nameError}</div>}
      </div>
      <div
      // className="form-group"
      >
        <label htmlFor="username">Username</label>
        <input
          type="text"
          // className="form-control"
          name="username"
          placeholder="Enter username"
          value={username}
          onChange={handleUsernameChange}
        />
        {usernameError && <div className="error">{usernameError}</div>}
      </div>
      <div
      // className="form-group"
      >
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          // className="form-control"
          name="email"
          placeholder="Enter Email"
          value={email}
          onChange={handleEmailChange}
        />
        {emailError && <div className="error">{emailError}</div>}
      </div>
      <div
      // className="form-group"
      >
        <label htmlFor="password">Password</label>
        <input
          type="password"
          // className="form-control"
          name="password"
          placeholder="Enter Password"
          value={password}
          onChange={handlePasswordChange}
        />
        {passwordError && <div className="error">{passwordError}</div>}
      </div>
      <div
      // className="form-group"
      >
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          // className="form-control"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        {confirmPasswordError && (
          <div className="error">{confirmPasswordError}</div>
        )}
      </div>
      <div>
        <button
          type="submit"
          className="buttoncolor" //"btn btn-lg btn-primary btn-block"
          disabled={
            !nameValid ||
            !usernameValid ||
            !emailValid ||
            !passwordValid ||
            !confirmPasswordValid
          }
        >
          {loading && <i className="fa fa-refresh fa-spin"></i>}
          Register
        </button>
      </div>
      {error && <div className="error">Error registering</div>}
      {successful && <div className="success">Registration successful</div>}
      <div>
        <label />
        <div>
          Already have an account? <Link to={`/login`}>Sign In</Link>
        </div>
      </div>
      {
        // error ? navigate('/registered', { replace: true }) : null
        // // setFlagg('login');
        // // !error ? regredirect() : null
      }
    </form>
  );
};

export default SignUp;
