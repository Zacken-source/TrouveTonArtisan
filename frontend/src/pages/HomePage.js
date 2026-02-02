import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import ArtisanCard from '../components/ArtisanCard';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { artisansService } from '../services/api';
import { getErrorMessage } from '../utils/helpers';

function HomePage() {
  const [topArtisans, setTopArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Définir le titre de la page
    document.title = 'Trouve ton artisan - Auvergne-Rhône-Alpes';
    loadTopArtisans();
  }, []);

  const loadTopArtisans = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await artisansService.getTop();
      setTopArtisans(response.data.data);
    } catch (err) {
      console.error('Erreur chargement artisans top:', err);
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  // Étapes du processus
  const steps = [
    {
      num: 1,
      title: 'Choisir la catégorie',
      text: 'Sélectionnez la catégorie d\'artisanat dans le menu',
      icon: '📋'
    },
    {
      num: 2,
      title: 'Choisir un artisan',
      text: 'Parcourez la liste des artisans disponibles',
      icon: '👤'
    },
    {
      num: 3,
      title: 'Le contacter',
      text: 'Utilisez le formulaire de contact pour envoyer votre demande',
      icon: '✉️'
    },
    {
      num: 4,
      title: 'Recevoir une réponse',
      text: 'L\'artisan vous répondra sous 48h',
      icon: '⏱️'
    }
  ];

  return (
    <div className="home-page">
      {/* Section Hero */}
      <section className="hero-section bg-primary text-white py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={8} className="mx-auto text-center">
              <h1 className="display-4 fw-bold mb-3">
                Trouve ton artisan
              </h1>
              <p className="lead mb-4">
                Trouvez facilement un artisan qualifié en Auvergne-Rhône-Alpes
              </p>
              <p className="text-white-50">
                Plus de 221 000 entreprises artisanales dans la région
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Section Comment ça marche */}
      <section className="how-it-works py-5">
        <Container>
          <h2 className="text-center mb-5">Comment trouver mon artisan ?</h2>
          <Row>
            {steps.map(step => (
              <Col md={6} lg={3} key={step.num} className="mb-4">
                <Card className="text-center h-100 border-0 shadow-sm">
                  <Card.Body className="d-flex flex-column">
                    <div 
                      className="step-icon mb-3 mx-auto"
                      style={{ fontSize: '3rem' }}
                      aria-hidden="true"
                    >
                      {step.icon}
                    </div>
                    <div 
                      className="step-number bg-primary text-white rounded-circle mx-auto mb-3"
                      style={{
                        width: '60px',
                        height: '60px',
                        lineHeight: '60px',
                        fontSize: '24px',
                        fontWeight: 'bold'
                      }}
                    >
                      {step.num}
                    </div>
                    <Card.Title className="h5 mb-3">{step.title}</Card.Title>
                    <Card.Text className="text-muted">
                      {step.text}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Section Artisans du mois */}
      <section className="top-artisans bg-light py-5">
        <Container>
          <h2 className="text-center mb-5">Les artisans du mois</h2>
          
          {loading ? (
            <Loading message="Chargement des artisans du mois..." />
          ) : error ? (
            <ErrorMessage message={error} onRetry={loadTopArtisans} />
          ) : topArtisans.length === 0 ? (
            <p className="text-center text-muted">
              Aucun artisan du mois pour le moment
            </p>
          ) : (
            <Row>
              {topArtisans.map(artisan => (
                <Col md={6} lg={4} key={artisan.id} className="mb-4">
                  <ArtisanCard artisan={artisan} />
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </section>

      {/* Section Call to Action */}
      <section className="cta-section py-5">
        <Container>
          <Row>
            <Col lg={8} className="mx-auto text-center">
              <h3 className="mb-3">Besoin d'un artisan ?</h3>
              <p className="text-muted mb-4">
                Explorez nos catégories et trouvez le professionnel qu'il vous faut
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default HomePage;