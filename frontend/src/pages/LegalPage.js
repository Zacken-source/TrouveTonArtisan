import React, { useEffect } from 'react';
import { Container, Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function LegalPage({ title }) {
  useEffect(() => {
    document.title = `${title} - Trouve ton artisan`;
  }, [title]);

  return (
    <div className="legal-page py-4">
      <Container>
        {/* Fil d'Ariane */}
        <Breadcrumb className="mb-4">
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>
            Accueil
          </Breadcrumb.Item>
          <Breadcrumb.Item active>
            {title}
          </Breadcrumb.Item>
        </Breadcrumb>

        {/* Contenu */}
        <div className="page-content bg-white p-5 rounded shadow-sm">
          <h1 className="mb-4">{title}</h1>
          <div className="text-center py-5">
            <div className="mb-4" style={{ fontSize: '4rem' }}>🚧</div>
            <h2 className="h4 text-muted mb-3">Page en construction</h2>
            <p className="text-muted">
              Cette page sera prochainement remplie par un cabinet spécialisé.
            </p>
            <Link to="/" className="btn btn-primary mt-4">
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default LegalPage;