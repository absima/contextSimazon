import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Message from './message';

export default function Support() {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();

    // For now: just simulate success
    setSubmitted(true);
    setEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <div>
      <h1>Support</h1>

      {submitted && (
        <Message variant="success">
          Thanks for reaching out. We’ll get back to you shortly.
        </Message>
      )}

      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Subject</Form.Label>
          <Form.Control
            type="text"
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Form.Group>

        {/* <Button type="submit">Send</Button> */}
        <button className="buttoncolor">Submit</button>
      </Form>
    </div>
  );
}
