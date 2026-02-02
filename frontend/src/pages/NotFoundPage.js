import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  useEffect(() => {
    document.title = 'Page non trouvée - Trouve ton artisan';
  }, []);

  return (
    <div className="not-found-page py-5">
      <Container>
        <div className="text-center">
          {/* Image d'erreur 404 */}
          <div className="error-404-image mb-4" style={{ fontSize: '8rem' }}>
            🔍❌
          </div>
          
          {/* Titre */}
          <h1 className="display-1 fw-bold text-primary mb-3">404</h1>
          <h2 className="h3 mb-4">Page non trouvée</h2>
          
          {/* Message */}
          <p className="text-muted mb-4">
            La page que vous avez demandée n'existe pas ou a été déplacée.
          </p>
          <p className="text-muted mb-5">
            Veuillez vérifier l'URL ou retourner à la page d'accueil.
          </p>
          
          {/* Boutons */}
          <div className="d-flex justify-content-center gap-3">
            <Link to="/" className="btn btn-primary">
              Retour à l'accueil
            </Link>
            <button 
              onClick={() => window.history.back()} 
              className="btn btn-outline-primary"
            >
              Page précédente
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default NotFoundPage;