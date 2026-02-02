import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, InputGroup } from 'react-bootstrap';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim().length >= 2) {
      // Rediriger vers une page de résultats de recherche
      // Pour simplifier, on peut afficher les résultats dans une modale
      // ou créer une page dédiée
      console.log('Recherche:', searchTerm);
      // navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      
      // Pour l'instant, on affiche juste une alerte
      alert(`Recherche de "${searchTerm}" - Fonctionnalité à implémenter`);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="ms-lg-3 mt-2 mt-lg-0">
      <InputGroup>
        <Form.Control
          type="search"
          placeholder="Rechercher un artisan..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Rechercher un artisan"
          minLength="2"
        />
        <Button 
          variant="primary" 
          type="submit"
          disabled={searchTerm.trim().length < 2}
          aria-label="Lancer la recherche"
        >
          🔍
        </Button>
      </InputGroup>
    </Form>
  );
}

export default SearchBar;