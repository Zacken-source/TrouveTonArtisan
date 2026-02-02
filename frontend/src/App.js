import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ArtisanDetailPage from './pages/ArtisanDetailPage';
import LegalPage from './pages/LegalPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        
        <main className="flex-grow-1">
          <Routes>
            {/* Page d'accueil */}
            <Route path="/" element={<HomePage />} />
            
            {/* Page catégorie */}
            <Route path="/categorie/:id" element={<CategoryPage />} />
            
            {/* Page détails artisan */}
            <Route path="/artisan/:id" element={<ArtisanDetailPage />} />
            
            {/* Pages légales */}
            <Route 
              path="/mentions-legales" 
              element={<LegalPage title="Mentions légales" />} 
            />
            <Route 
              path="/donnees-personnelles" 
              element={<LegalPage title="Données personnelles" />} 
            />
            <Route 
              path="/accessibilite" 
              element={<LegalPage title="Accessibilité" />} 
            />
            <Route 
              path="/cookies" 
              element={<LegalPage title="Cookies" />} 
            />
            
            {/* Page 404 - doit être en dernier */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;