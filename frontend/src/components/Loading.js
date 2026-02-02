import React from 'react';
import { Spinner, Container } from 'react-bootstrap';

function Loading({ message = 'Chargement...' }) {
  return (
    <Container className="text-center py-5">
      <Spinner animation="border" variant="primary" role="status">
        <span className="visually-hidden">{message}</span>
      </Spinner>
      <p className="mt-3 text-muted">{message}</p>
    </Container>
  );
}

export default Loading;