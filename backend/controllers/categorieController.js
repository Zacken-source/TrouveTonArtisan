const { Categorie, Specialite } = require('../models');

/**
 * GET /api/categories
 * Récupérer toutes les catégories avec leurs spécialités
 */
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Categorie.findAll({
      include: [{
        model: Specialite,
        as: 'specialites',
        attributes: ['id', 'nom']
      }],
      order: [['nom', 'ASC']]
    });
    
    res.json({
      success: true,
      count: categories.length,
      data: categories
    });
  } catch (error) {
    console.error('Erreur getAllCategories:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des catégories'
    });
  }
};

/**
 * GET /api/categories/:id
 * Récupérer une catégorie spécifique par son ID
 */
exports.getCategorieById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const categorie = await Categorie.findByPk(id, {
      include: [{
        model: Specialite,
        as: 'specialites',
        attributes: ['id', 'nom']
      }]
    });
    
    if (!categorie) {
      return res.status(404).json({
        success: false,
        message: 'Catégorie non trouvée'
      });
    }
    
    res.json({
      success: true,
      data: categorie
    });
  } catch (error) {
    console.error('Erreur getCategorieById:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération de la catégorie'
    });
  }
};