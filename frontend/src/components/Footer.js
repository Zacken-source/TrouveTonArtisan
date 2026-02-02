import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-main bg-dark text-white py-4 mt-5">
      <Container>
        <Row>
 
          <Col md={6} className="mb-3 mb-md-0">
            <h5 className="mb-3">Pages légales</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/mentions-legales" className="text-white-50 text-decoration-none">
                  Mentions légales
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/donnees-personnelles" className="text-white-50 text-decoration-none">
                  Données personnelles
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/accessibilite" className="text-white-50 text-decoration-none">
                  Accessibilité
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/cookies" className="text-white-50 text-decoration-none">
                  Cookies
                </Link>
              </li>
            </ul>
          </Col>

          <Col md={6}>
            <h5 className="mb-3">Contact - Antenne Lyon</h5>
            <address className="text-white-50">
              101 cours Charlemagne<br />
              CS 20033<br />
              69269 LYON CEDEX 02<br />
              France<br />
              <a 
                href="tel:+33426734000" 
                className="text-white-50 text-decoration-none"
                aria-label="Téléphone : +33 4 26 73 40 00"
              >
                +33 (0)4 26 73 40 00
              </a>
            </address>
          </Col>
        </Row>

        <Row className="mt-4 pt-3 border-top border-secondary">
          <Col className="text-center text-white-50">
            <small>© {currentYear} Région Auvergne-Rhône-Alpes - Tous droits réservés</small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;