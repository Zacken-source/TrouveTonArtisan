import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Breadcrumb, Button } from 'react-bootstrap';
import ContactForm from '../components/ContactForm';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { artisansService } from '../services/api';
import { getErrorMessage } from '../utils/helpers';

function ArtisanDetailPage() {
  const { id } = useParams();
  const [artisan, setArtisan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadArtisan();
  }, [id]);

  useEffect(() => {
    // Mettre à jour le titre de la page
    if (artisan) {
      document.title = `${artisan.nom} - Trouve ton artisan`;
    }
  }, [artisan]);

  const loadArtisan = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await artisansService.getById(id);
      setArtisan(response.data.data);
    } catch (err) {
      console.error('Erreur chargement artisan:', err);
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (note) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= note ? 'star filled' : 'star'} aria-hidden="true">
          {i <= note ? '★' : '☆'}
        </span>
      );
    }
    return stars;
  };

  if (loading) {
    return <Loading message="Chargement de la fiche artisan..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={loadArtisan} />;
  }

  if (!artisan) {
    return (
      <Container className="py-5">
        <p className="text-center">Artisan non trouvé</p>
        <div className="text-center">
          <Link to="/" className="btn btn-primary">
            Retour à l'accueil
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <div className="artisan-detail-page py-4">
      <Container>
        {/* Fil d'Ariane */}
        <Breadcrumb className="mb-4">
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>
            Accueil
          </Breadcrumb.Item>
          <Breadcrumb.Item 
            linkAs={Link} 
            linkProps={{ to: `/categorie/${artisan.specialite?.categorie?.id}` }}
          >
            {artisan.specialite?.categorie?.nom}
          </Breadcrumb.Item>
          <Breadcrumb.Item active>
            {artisan.nom}
          </Breadcrumb.Item>
        </Breadcrumb>

        <Row>
          {/* Informations de l'artisan */}
          <Col lg={6} className="mb-4">
            <Card className="shadow-sm border-0">
              <Card.Body className="p-4">
                {/* Nom */}
                <h1 className="h2 mb-3">{artisan.nom}</h1>
                
                {/* Badge artisan du mois */}
                {artisan.top && (
                  <div className="mb-3">
                    <span className="badge bg-warning text-dark fs-6">
                      ⭐ Artisan du mois
                    </span>
                  </div>
                )}
                
                {/* Note */}
                <div className="rating mb-4">
                  <div className="stars" aria-label={`Note: ${artisan.note} sur 5`}>
                    {renderStars(artisan.note)}
                  </div>
                  <span className="ms-2 text-muted">
                    ({artisan.note}/5)
                  </span>
                </div>
                
                {/* Informations */}
                <div className="artisan-info">
                  <p className="mb-2">
                    <strong>Spécialité :</strong>{' '}
                    <span className="text-muted">{artisan.specialite?.nom}</span>
                  </p>
                  
                  <p className="mb-2">
                    <strong>Catégorie :</strong>{' '}
                    <span className="text-muted">{artisan.specialite?.categorie?.nom}</span>
                  </p>
                  
                  <p className="mb-2">
                    <strong>Localisation :</strong>{' '}
                    <span className="text-muted">📍 {artisan.ville}</span>
                  </p>
                  
                  <p className="mb-2">
                    <strong>Email :</strong>{' '}
                    <a href={`mailto:${artisan.email}`} className="text-decoration-none">
                      {artisan.email}
                    </a>
                  </p>
                  
                  {artisan.site_web && (
                    <p className="mb-2">
                      <strong>Site web :</strong>{' '}
                      <a 
                        href={artisan.site_web} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-decoration-none"
                      >
                        {artisan.site_web}
                        <span className="ms-1" aria-hidden="true">↗</span>
                      </a>
                    </p>
                  )}
                </div>
                
                {/* À propos */}
                {artisan.a_propos && (
                  <div className="mt-4 pt-4 border-top">
                    <h3 className="h5 mb-3">À propos</h3>
                    <p className="text-muted">{artisan.a_propos}</p>
                  </div>
                )}
                
                {/* Site web - Bouton */}
                {artisan.site_web && (
                  <div className="mt-4">
                    <Button 
                      variant="outline-primary" 
                      href={artisan.site_web}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-100"
                    >
                      Visiter le site web
                    </Button>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>

          {/* Formulaire de contact */}
          <Col lg={6}>
            <Card className="shadow-sm border-0">
              <Card.Body className="p-4">
                <ContactForm 
                  artisanId={artisan.id}
                  artisanNom={artisan.nom}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ArtisanDetailPage;