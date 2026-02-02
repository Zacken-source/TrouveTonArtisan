import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

function ArtisanCard({ artisan }) {
  /**
   * Génère les étoiles de notation
   */
  const renderStars = (note) => {
    const stars = [];
    const fullStars = Math.floor(note);
    const hasHalfStar = note % 1 !== 0;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <span key={i} className="star filled" aria-hidden="true">★</span>
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <span key={i} className="star half-filled" aria-hidden="true">★</span>
        );
      } else {
        stars.push(
          <span key={i} className="star" aria-hidden="true">☆</span>
        );
      }
    }
    return stars;
  };

  return (
    <Card className="artisan-card h-100 shadow-sm border-0">
      <Card.Body className="d-flex flex-column">

        <Link 
          to={`/artisan/${artisan.id}`} 
          className="text-decoration-none"
          aria-label={`Voir la fiche de ${artisan.nom}`}
        >
          <Card.Title className="text-primary mb-3 h5">
            {artisan.nom}
          </Card.Title>
        </Link>
        
        <div className="rating mb-3">
          <div className="stars" aria-label={`Note: ${artisan.note} sur 5`}>
            {renderStars(artisan.note)}
          </div>
          <span className="ms-2 text-muted small">
            ({artisan.note}/5)
          </span>
        </div>
        
        <Card.Text className="mb-2">
          <strong>Spécialité :</strong>{' '}
          <span className="text-muted">
            {artisan.specialite?.nom || 'Non spécifié'}
          </span>
        </Card.Text>

        <Card.Text className="mb-0 mt-auto">
          <span className="text-muted">
            📍 {artisan.ville}
          </span>
        </Card.Text>

        {artisan.top && (
          <div className="mt-3">
            <span className="badge bg-warning text-dark">
              ⭐ Artisan du mois
            </span>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default ArtisanCard;