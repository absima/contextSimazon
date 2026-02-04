// support.jsx
import { useState } from 'react';
import Message from './message';

export default function Support() {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [submitted, setSubmitted] = useState(false);

  // basic validation states (same vibe as signup)
  const [emailError, setEmailError] = useState('');
  const [subjectError, setSubjectError] = useState('');
  const [messageError, setMessageError] = useState('');

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleEmailChange = (e) => {
    const v = e.target.value;
    setEmail(v);
    if (!validateEmail(v)) setEmailError('Invalid email');
    else setEmailError('');
  };

  const handleSubjectChange = (e) => {
    const v = e.target.value;
    setSubject(v);
    if (v.trim().length < 3) setSubjectError('Subject must be at least 3 characters');
    else setSubjectError('');
  };

  const handleMessageChange = (e) => {
    const v = e.target.value;
    setMessage(v);
    if (v.trim().length < 10) setMessageError('Message must be at least 10 characters');
    else setMessageError('');
  };

  const submitHandler = (e) => {
    e.preventDefault();

    // final validation gate
    let ok = true;

    if (!validateEmail(email)) {
      setEmailError('Invalid email');
      ok = false;
    }
    if (subject.trim().length < 3) {
      setSubjectError('Subject must be at least 3 characters');
      ok = false;
    }
    if (message.trim().length < 10) {
      setMessageError('Message must be at least 10 characters');
      ok = false;
    }

    if (!ok) return;

    setSubmitted(true);

    // reset
    setEmail('');
    setSubject('');
    setMessage('');
  };

  const formValid =
    validateEmail(email) && subject.trim().length >= 3 && message.trim().length >= 10;

  return (
    <form className="form" noValidate onSubmit={submitHandler}>
      <div>
        <h1>Support</h1>
      </div>

      {submitted && (
        <div>
          <Message variant="success">
            Thanks for reaching out. We’ll get back to you shortly.
          </Message>
        </div>
      )}

      <div>
        <label htmlFor="supportEmail">Email Address</label>
        <input
          id="supportEmail"
          type="email"
          name="email"
          placeholder="Enter Email"
          value={email}
          onChange={handleEmailChange}
        />
        {emailError && <div className="error">{emailError}</div>}
      </div>

      <div>
        <label htmlFor="supportSubject">Subject</label>
        <input
          id="supportSubject"
          type="text"
          name="subject"
          placeholder="Enter subject"
          value={subject}
          onChange={handleSubjectChange}
        />
        {subjectError && <div className="error">{subjectError}</div>}
      </div>

      <div>
        <label htmlFor="supportMessage">Message</label>
        <textarea
          id="supportMessage"
          name="message"
          placeholder="How can we help?"
          rows={4}
          value={message}
          onChange={handleMessageChange}
        />
        {messageError && <div className="error">{messageError}</div>}
      </div>

      <div>
        <button type="submit" className="buttoncolor" disabled={!formValid}>
          Submit
        </button>
      </div>
    </form>
  );
}


// // import React from 'react';
// import { useState } from 'react';
// import { Form, Button } from 'react-bootstrap';
// import Message from './message';

// export default function Support() {
//   const [email, setEmail] = useState('');
//   const [subject, setSubject] = useState('');
//   const [message, setMessage] = useState('');
//   const [submitted, setSubmitted] = useState(false);

//   const submitHandler = (e) => {
//     e.preventDefault();

//     setSubmitted(true);
//     setEmail('');
//     setSubject('');
//     setMessage('');
//   };

//   return (
//     <div>
//       <h1>Support</h1>

//       {submitted && (
//         <Message variant="success">
//           Thanks for reaching out. We’ll get back to you shortly.
//         </Message>
//       )}

//       <Form onSubmit={submitHandler}>
//         <Form.Group className="mb-3">
//           <Form.Label>Email</Form.Label>
//           <Form.Control
//             type="email"
//             required
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </Form.Group>

//         <Form.Group className="mb-3">
//           <Form.Label>Subject</Form.Label>
//           <Form.Control
//             type="text"
//             required
//             value={subject}
//             onChange={(e) => setSubject(e.target.value)}
//           />
//         </Form.Group>

//         <Form.Group className="mb-3">
//           <Form.Label>Message</Form.Label>
//           <Form.Control
//             as="textarea"
//             rows={4}
//             required
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//           />
//         </Form.Group>

//         {/* <Button type="submit">Send</Button> */}
//         <button className="buttoncolor">Submit</button>
//       </Form>
//     </div>
//   );
// }
