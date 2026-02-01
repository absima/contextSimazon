import React from 'react';
import { Container } from 'react-bootstrap';

export default function Privacy() {
  return (
    <Container className="py-4">
      <h1>Privacy Policy</h1>
      <p className="text-muted">
        This is a demo ecommerce project. No real payments are processed.
      </p>
      {/* <p>
        Describe what data you store (accounts, orders), how it’s used, and that it’s for demonstration purposes.
      </p> */}
    </Container>
  );
}
