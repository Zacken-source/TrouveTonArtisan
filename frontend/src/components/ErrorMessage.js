import React from 'react';
import { Alert, Container } from 'react-bootstrap';

function ErrorMessage({ message, onRetry }) {
  return (
    <Container className="py-5">
      <Alert variant="danger">
        <Alert.Heading>Une erreur est survenue</Alert.Heading>
        <p>{message}</p>
        {onRetry && (
          <div className="d-flex justify-content-end">
            <button className="btn btn-outline-danger" onClick={onRetry}>
              Réessayer
            </button>
          </div>
        )}
      </Alert>
    </Container>
  );
}

export default ErrorMessage;