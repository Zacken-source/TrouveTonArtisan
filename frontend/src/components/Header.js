import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import SearchBar from './SearchBar';
import { categoriesService } from '../services/api';

function Header() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await categoriesService.getAll();
      setCategories(response.data.data);
    } catch (error) {
      console.error('Erreur chargement catégories:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="header-main">
      <Navbar bg="white" expand="lg" className="shadow-sm py-3">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold">
            <img
              src="../logo-trouve-ton-artisan.png"
              alt="Trouve ton artisan"
              height="50"
              className="d-inline-block align-top"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'inline';
              }}
            />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbar-nav" aria-label="Menu de navigation" />

          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto align-items-center">
              {loading ? (
                <Nav.Item className="text-muted">Chargement...</Nav.Item>
              ) : (
                categories.map(cat => (
                  <Nav.Link
                    key={cat.id}
                    as={Link}
                    to={`/categorie/${cat.id}`}
                    className="mx-2"
                  >
                    {cat.nom}
                  </Nav.Link>
                ))
              )}
            </Nav>

            <SearchBar />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;