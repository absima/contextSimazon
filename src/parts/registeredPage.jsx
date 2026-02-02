// import React from 'react';
import { Link } from 'react-router-dom';
// import { selectUser } from '../redux/userSlice';

const RegisteredPage = () => {
  return (
    <div className="container maindiv">
      <div className="registered-page__container">
        <div className="registered-page__container__title">
          <h1> Hi there, </h1>
          You have just successfully registered. please &nbsp;  
          <Link to="/login">log in</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisteredPage;

