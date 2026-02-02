const errorHandler = (err, req, res, next) => {
  console.error('Erreur capturée:', err);
  
  // Erreur de validation Sequelize
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Erreur de validation',
      errors: err.errors.map(e => ({
        field: e.path,
        message: e.message
      }))
    });
  }
  
  // Erreur de clé étrangère
  if (err.name === 'SequelizeForeignKeyConstraintError') {
    return res.status(400).json({
      success: false,
      message: 'Référence invalide'
    });
  }
  
  // Erreur de connexion à la base de données
  if (err.name === 'SequelizeConnectionError') {
    return res.status(503).json({
      success: false,
      message: 'Erreur de connexion à la base de données'
    });
  }
  
  // Erreur par défaut
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Erreur serveur interne'
  });
};

module.exports = errorHandler;