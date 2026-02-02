const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// Import des configurations
const sequelize = require('./config/database');

// Import des routes
const categoriesRoutes = require('./routes/categories');
const artisansRoutes = require('./routes/artisans');

// Import des middlewares
const errorHandler = require('./middlewares/errorHandler');
const notFound = require('./middlewares/notFound');

// Initialisation de l'application
const app = express();
const PORT = process.env.PORT || 5000;

// ===== MIDDLEWARES DE SÉCURITÉ =====

// Helmet : Protection contre les vulnérabilités connues
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));

// CORS : Configuration des origines autorisées
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Rate limiting : Limitation du nombre de requêtes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Max 100 requêtes par IP
  message: {
    success: false,
    message: 'Trop de requêtes. Veuillez réessayer plus tard.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Appliquer le rate limiting uniquement aux routes API
app.use('/api/', limiter);

// ===== MIDDLEWARES DE PARSING =====

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ===== LOGGING EN DÉVELOPPEMENT =====

if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });
}

// ===== ROUTES =====

// Route de santé / health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'API Trouve ton artisan - v1.0.0',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Routes principales
app.use('/api/categories', categoriesRoutes);
app.use('/api/artisans', artisansRoutes);

// ===== GESTION DES ERREURS =====

// Route 404 - Doit être après toutes les autres routes
app.use(notFound);

// Gestionnaire d'erreurs global
app.use(errorHandler);

// ===== DÉMARRAGE DU SERVEUR =====

const startServer = async () => {
  try {
    // Test de connexion à la base de données
    await sequelize.authenticate();
    console.log('Connexion à la base de données réussie');
    
    // Démarrage du serveur
    app.listen(PORT, () => {
      console.log('========================================');
      console.log('Serveur démarré avec succès !');
      console.log(`API disponible sur : http://localhost:${PORT}/api`);
      console.log(`Health check : http://localhost:${PORT}/api/health`);
      console.log(`Environnement : ${process.env.NODE_ENV || 'development'}`);
      console.log(`CORS autorisé pour : ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
      console.log('========================================');
    });
  } catch (error) {
    console.error('Erreur lors du démarrage du serveur:', error);
    process.exit(1);
  }
};

// Gestion de l'arrêt gracieux
process.on('SIGTERM', async () => {
  console.log('SIGTERM reçu, arrêt du serveur...');
  await sequelize.close();
  console.log('Connexion à la base de données fermée');
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT reçu, arrêt du serveur...');
  await sequelize.close();
  console.log('Connexion à la base de données fermée');
  process.exit(0);
});

// Démarrer le serveur
startServer();

module.exports = app;