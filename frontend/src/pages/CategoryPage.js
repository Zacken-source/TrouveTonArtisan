import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ArtisanCard from '../components/ArtisanCard';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { artisansService, categoriesService } from '../services/api';
import { getErrorMessage } from '../utils/helpers';

function CategoryPage() {
  const { id } = useParams();
  const [artisans, setArtisans] = useState([]);
  const [categorie, setCategorie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, [id]);

  useEffect(() => {
    // Mettre à jour le titre de la page
    if (categorie) {
      document.title = `${categorie.nom} - Trouve ton artisan`;
    }
  }, [categorie]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Charger les artisans de la catégorie
      const artisansResponse = await artisansService.getByCategorie(id);
      setArtisans(artisansResponse.data.data);
      
      // Charger les infos de la catégorie
      const categorieResponse = await categoriesService.getById(id);
      setCategorie(categorieResponse.data.data);
    } catch (err) {
      console.error('Erreur chargement données:', err);
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading message="Chargement des artisans..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={loadData} />;
  }

  return (
    <div className="category-page py-4">
      <Container>
        {/* Fil d'Ariane */}
        <Breadcrumb className="mb-4">
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>
            Accueil
          </Breadcrumb.Item>
          <Breadcrumb.Item active>
            {categorie?.nom || 'Catégorie'}
          </Breadcrumb.Item>
        </Breadcrumb>

        {/* En-tête */}
        <div className="page-header mb-5">
          <h1 className="mb-3">{categorie?.nom}</h1>
          <p className="text-muted">
            {artisans.length} artisan{artisans.length > 1 ? 's' : ''} trouvé{artisans.length > 1 ? 's' : ''}
          </p>
        </div>

        {/* Liste des artisans */}
        {artisans.length === 0 ? (
          <div className="text-center py-5">
            <p className="text-muted">Aucun artisan dans cette catégorie pour le moment.</p>
            <Link to="/" className="btn btn-primary mt-3">
              Retour à l'accueil
            </Link>
          </div>
        ) : (
          <Row>
            {artisans.map(artisan => (
              <Col sm={6} md={4} lg={3} key={artisan.id} className="mb-4">
                <ArtisanCard artisan={artisan} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
}

export default CategoryPage;