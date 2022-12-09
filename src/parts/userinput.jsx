// user profile page component
import React from 'react';
import { Link } from 'react-router-dom';
// you are registered please login
import { useContext } from 'react';
import { ProjContext } from '../xcontexter';

import axios from 'axios';
const Check = () => {
  const {
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
  } = useContext(ProjContext);

  // signup part
  const signingup = (name, username, email, password) => {
    const configuration = {
      method: 'post',
      url: 'http://localhost:5050/user/register',
      data: {
        name,
        username,
        email,
        password,
      },
    };

    // make the API call

    axios(configuration)
      .then((result) => {
        console.log(result);
        setCustomer(username);
      })
      .catch((error) => {
        console.log(error);
        setSuccessful(false);
      });
  };

  console.log('successful', successful);

  // login part
  const signingin = async (username, password) => {
    // try catch
    try {
      const res = await fetch('http://localhost:5050/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
        mode: 'cors',
      });
      const token = await res.json();

      console.log('sigining in ', token);
      setToken(token);
      setCustomer(username);
      // setSuccessful(true);
    } catch (err) {
      console.log(err);
      setToken(null);
      // setSuccessful(false);
    }
  };

  // signup('james Avery', 'james2', 'james2@avery.com', 'Password1');
  // signingin('simameng', 'Password1');
  // signingup('james Avery', 'james1', 'james1@avery.com', 'Password1');
  // signingup(username, password);
  // console.log(token)
  return (
    <div className="container maindiv">
      <div className="registered-page__container">
        <div className="registered-page__container__title">
          <h1> Hi there, </h1>
          You have just been registered please <Link to="/login">log in</Link>
        </div>
      </div>
    </div>
  );
};

export default Check;
