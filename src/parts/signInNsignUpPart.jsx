import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import LoadingIndicator from '../components/loading';
import Message from '../components/message';

//
import { useContext } from 'react';
import { ProjContext } from '../xcontexter';
//
// import {
//   selectUser,
//   selectError,
//   registerUser,
//   loginUser,
//   logoutUser,
// } from '../redux/userSlice';

export default function SignInOrSignUpPart({ flag }) {
  // const dispatch = useDispatch();
  // const user = useSelector(selectUser);
  // console.log('-------user------', user);
  // const error = useSelector(selectError);
  const navigate = useNavigate();
  //
  const {
    flagg,
    setFlagg,
    customer,
    error1,
    setCustomer,
    setToken,
    setError1,
  } = useContext(ProjContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [register, setRegister] = useState('');

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

  console.log('flag', flag);

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return re.test(String(password));
  };

  const validateName = (name) => {
    const re = /^[a-zA-Z ]{2,30}$/;
    return re.test(String(name));
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    return password === confirmPassword;
  };

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
        setError1(false);
      })
      .catch((error) => {
        console.log(error);
        setError1(true);
      });
  };

  // login part
  const signingin = async (username, password) => {
    console.log('zzzzzzzzzzzzzzzzz');
    console.log('username', username);
    console.log('password', password);
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

      // console.log('sigining in ', token);
      setToken(token);
      setCustomer(username);
      token.error ? setError1(true) : setError1(false);

      // setError1(false);
      // setSuccessful(true);
    } catch (err) {
      console.log(err);
      setToken(null);
      setError1(true);
      // setSuccessful(false);
    }
  };

  const handleSubmitRegister = (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();
    signingup(name, username, email, password);
  };

  const handleSubmitLogin = (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();

    signingin(username, password);
    if (!error1 && customer) {
      const to = `/profile/${customer}`;
      console.log(to);
      navigate(to, { replace: true });
      // window.location.href = `/profile/${customer}`;
      // // navigate(`/profile/${customer}`);
    }
  };

  // logout submit handler
  const handleLogout = async (e) => {
    e.preventDefault();
    logout();
    return () => navigate('/login', { replace: true });
  };

  // handle name change
  const handleNameChange = (e) => {
    const name = e.target.value;
    console.log('name validator', validateName(name));
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
    console.log('------>>>>>>>>>>>>username change', e.target.value);
    const username = e.target.value;
    setUsername(username);
    if (!validateName(username)) {
      setUsernameError(
        'Username must be at least 2 characters long and contain only letters'
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

  console.log('---------nameError--------', nameError);
  console.log('customer', customer);
  // return with form validator functionallity
  return (
    <div className="container main-div">
      {flag == 'register' ? (
        <form className="form" noValidate onSubmit={handleSubmitRegister}>
          <div>
            <h1>Register</h1>
          </div>
          <div>{error1 && <Message variant="danger">Retry</Message>}</div>
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
              Register
            </button>
          </div>
          {error1 && <div className="error">Error registering</div>}
          {successful && <div className="success">Registration successful</div>}
          <div>
            <label />
            <div>
              Already have an account? <Link to={`/login`}>Sign In</Link>
            </div>
          </div>
          {register ? navigate('/registered', { replace: true }) : null}
        </form>
      ) : flag == 'login' ? (
        <form className="form" noValidate onSubmit={handleSubmitLogin}>
          <div>
            <h1>Login</h1>
          </div>
          <div>{error1 && <Message variant="danger">Retry</Message>}</div>
          <div>
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
          <div>
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
          <div>
            <button
              type="submit"
              className="buttoncolor" //"btn btn-lg btn-primary btn-block"
              disabled={!usernameValid || !passwordValid}
            >
              Log in
            </button>
          </div>
          {error1 && <div className="error">Error logging in</div>}
          {successful && <div className="success">Login successful</div>}
          <div>
            <label />
            <div>
              New customer? <Link to={`/register`}>Create your account</Link>
            </div>
          </div>
          {(!error1 && customer) ? navigate(`/profile/${customer}`, { replace: true }) : null} 
        </form>
        
      ) : (
        <Form className="form" onSubmit={handleLogout}>
          <div>
            <h1>Sign Out</h1>
          </div>
          <div>
            {loading && <LoadingIndicator></LoadingIndicator>}
            {error1 && <Message variant="danger">{error1}</Message>}
          </div>
          <div>
            <label />
            <button className="buttoncolor" type="submit">
              Log out
            </button>
          </div>
        </Form>
      )}
    </div>
  );
}

{
  /* 
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mt-5 mx-auto">
          <form noValidate onSubmit={handleSubmitLogin}>
            <h1 className="h3 mb-3 font-weight-normal">Login</h1>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                placeholder="Enter username"
                value={username}
                onChange={handleUsernameChange}
              />
              {usernameError && <div className="error">{usernameError}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Enter Password"
                value={password}
                onChange={handlePasswordChange}
              />
              {passwordError && <div className="error">{passwordError}</div>}
            </div>
            <button
              type="submit"
              className="btn btn-lg btn-primary btn-block"
              disabled={!usernameValid || !passwordValid}
            >
              Login
            </button>
            {error1 && <div className="error">Error logging in</div>}
            {successful && <div className="success">Login successful</div>}
          </form>
        </div>
      </div>
    </div>
  );
} */
}

//     <div className="container-div">
//       {flag == 'login' ? (
//         <Form className="form" onSubmit={handleSubmitLogin}>
//           <div>
//             <h1 >Log in</h1>
//           </div>
//           <div>
//             {error1 && (
//               <Message variant="danger">Invalid username or password</Message>
//             )}
//           </div>
//           <div>
//             <Form.Group controlId="username">
//               <Form.Label>Username</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter username"
//                 value={username}
//                 onChange={handleUsernameChange}
//               ></Form.Control>
//               {usernameError && <div className="error">{usernameError}</div>}
//             </Form.Group>
//           </div>
//           <div>
//             <Form.Group controlId="password">
//               <Form.Label>Password</Form.Label>
//               <Form.Control
//                 type="password"
//                 placeholder="Enter password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               ></Form.Control>
//             </Form.Group>
//           </div>
//           <div>
//             <Button type="submit" variant="primary">
//               Log in
//             </Button>
//           </div>
//           <div>
//             <Row className="py-3">
//               <Col>
//                 New Customer? <Link to={`/register`}>Register</Link>
//                 {/* <Link
//                   to={redirect ? `/register?redirect=${redirect}` : '/register'}
//                 >
//                   Register
//                 </Link> */}
//               </Col>
//             </Row>
//           </div>
//         </Form>
//       ) : (
//         <Form className="form" onSubmit={handleSubmitRegister}>
//           <div>
//             <h1 >Register</h1>
//           </div>
//           <div>
//             {error1 && (
//               <Message variant="danger">Invalid username or password</Message>
//             )}
//           </div>
//           <div>
//             <Form.Group controlId="name">
//               <Form.Label>Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter name"
//                 value={name}
//                 onChange={handleNameChange}
//               ></Form.Control>
//               {nameError && <div className="error">{nameError}</div>}
//             </Form.Group>
//           </div>
//           <div>
//             <Form.Group controlId="username">
//               <Form.Label>Username</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter username"
//                 value={username}
//                 onChange={handleUsernameChange}
//               ></Form.Control>
//               {usernameError && <div className="error">{usernameError}</div>}
//             </Form.Group>
//           </div>
//           <div>
//             <Form.Group controlId="email">
//               <Form.Label>Email Address</Form.Label>
//               <Form.Control
//                 type="email"
//                 placeholder="Enter email"
//                 value={email}
//                 onChange={handleEmailChange}
//               ></Form.Control>
//               {emailError && <div className="error">{emailError}</div>}
//             </Form.Group>
//           </div>
//           <div>
//             <Form.Group controlId="password">
//               <Form.Label>Password</Form.Label>
//               <Form.Control
//                 type="password"
//                 placeholder="Enter password"
//                 value={password}
//                 onChange={handlePasswordChange}
//               ></Form.Control>
//               {passwordError && <div className="error">{passwordError}</div>}
//             </Form.Group>
//           </div>
//           <div>
//             <Form.Group controlId="confirmPassword">
//               <Form.Label>Confirm Password</Form.Label>
//               <Form.Control
//                 type="password"
//                 placeholder="Confirm password"
//                 value={confirmPassword}
//                 onChange={handleConfirmPasswordChange}
//               ></Form.Control>
//               {confirmPasswordError && (
//                 <div className="error">{confirmPasswordError}</div>
//               )}
//             </Form.Group>
//           </div>
//           <div>
//             <Button type="submit" variant="primary">
//               Register
//             </Button>
//           </div>
//           <div>
//             <Row className="py-3">
//               <Col>
//                 Already have an account? <Link to={`/login`}>Log in</Link>
//                 {/* <Link
//                   to={redirect ? `/login?redirect=${redirect}` : '/login'}
//                 >
//                   Log in
//                 </Link> */}
//               </Col>
//             </Row>
//           </div>
//         </Form>
//       )}
//     </div>
//   );
// }

{
  /* <div className="container">
      <div className="row">
        <div className="col-md-6 mt-5 mx-auto">
          <form noValidate onSubmit={handleSubmitRegister}>
            <h1 className="h3 mb-3 font-weight-normal">Register</h1>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Enter name"
                value={name}
                onChange={handleNameChange}
              />
              {nameError && <div className="error">{nameError}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                placeholder="Enter username"
                value={username}
                onChange={handleUsernameChange}
              />
              {usernameError && <div className="error">{usernameError}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Enter Email"
                value={email}
                onChange={handleEmailChange}
              />
              {emailError && <div className="error">{emailError}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Enter Password"
                value={password}
                onChange={handlePasswordChange}
              />
              {passwordError && <div className="error">{passwordError}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              {confirmPasswordError && (
                <div className="error">{confirmPasswordError}</div>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-lg btn-primary btn-block"
              disabled={
                !nameValid ||
                !usernameValid ||
                !emailValid ||
                !passwordValid ||
                !confirmPasswordValid
              }
            >
              Register
            </button>
            {error1 && <div className="error">Error registering</div>}
            {successful && (
              <div className="success">Registration successful</div>
            )}
          </form>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mt-5 mx-auto">
          <form noValidate onSubmit={handleSubmitLogin}>
            <h1 className="h3 mb-3 font-weight-normal">Login</h1>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                placeholder="Enter username"
                value={username}
                onChange={handleUsernameChange}
              />
              {usernameError && <div className="error">{usernameError}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Enter Password"
                value={password}
                onChange={handlePasswordChange}
              />
              {passwordError && <div className="error">{passwordError}</div>}
            </div>
            <button
              type="submit"
              className="btn btn-lg btn-primary btn-block"
              disabled={!usernameValid || !passwordValid}
            >
              Login
            </button>
            {error1 && <div className="error">Error logging in</div>}
            {successful && <div className="success">Login successful</div>}
          </form>
        </div>
      </div>
    </div>
  );
} */
}
