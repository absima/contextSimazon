// user profile page component
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectUser } from '../redux/userSlice';
// you are registered please login

const RegisteredPage = () => {
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

export default RegisteredPage;

