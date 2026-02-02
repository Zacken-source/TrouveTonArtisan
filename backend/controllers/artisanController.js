const { Artisan, Specialite, Categorie } = require('../models');
const { Op } = require('sequelize');

/**
 * GET /api/artisans
 * Liste tous les artisans avec leurs infos complètes
 */
exports.getAllArtisans = async (req, res) => {
  try {
    const artisans = await Artisan.findAll({
      include: [{
        model: Specialite,
        as: 'specialite',
        attributes: ['id', 'nom'],
        include: [{
          model: Categorie,
          as: 'categorie',
          attributes: ['id', 'nom']
        }]
      }],
      order: [['nom', 'ASC']]
    });
    
    res.json({
      success: true,
      count: artisans.length,
      data: artisans
    });
  } catch (error) {
    console.error('Erreur getAllArtisans:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des artisans'
    });
  }
};

/**
 * GET /api/artisans/top
 * Récupère les 3 artisans du mois (top = true)
 */
exports.getTopArtisans = async (req, res) => {
  try {
    const topArtisans = await Artisan.findAll({
      where: { top: true },
      include: [{
        model: Specialite,
        as: 'specialite',
        attributes: ['id', 'nom'],
        include: [{
          model: Categorie,
          as: 'categorie',
          attributes: ['id', 'nom']
        }]
      }],
      limit: 3,
      order: [['note', 'DESC']]
    });
    
    res.json({
      success: true,
      count: topArtisans.length,
      data: topArtisans
    });
  } catch (error) {
    console.error('Erreur getTopArtisans:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des artisans du mois'
    });
  }
};

/**
 * GET /api/artisans/:id
 * Détails complets d'un artisan
 */
exports.getArtisanById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const artisan = await Artisan.findByPk(id, {
      include: [{
        model: Specialite,
        as: 'specialite',
        include: [{
          model: Categorie,
          as: 'categorie'
        }]
      }]
    });
    
    if (!artisan) {
      return res.status(404).json({
        success: false,
        message: 'Artisan non trouvé'
      });
    }
    
    res.json({
      success: true,
      data: artisan
    });
  } catch (error) {
    console.error('Erreur getArtisanById:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération de l\'artisan'
    });
  }
};

/**
 * GET /api/artisans/categorie/:categorieId
 * Liste des artisans d'une catégorie
 */
exports.getArtisansByCategorie = async (req, res) => {
  try {
    const { categorieId } = req.params;
    
    const artisans = await Artisan.findAll({
      include: [{
        model: Specialite,
        as: 'specialite',
        where: { id_categorie: categorieId },
        include: [{
          model: Categorie,
          as: 'categorie'
        }]
      }],
      order: [['note', 'DESC'], ['nom', 'ASC']]
    });
    
    res.json({
      success: true,
      count: artisans.length,
      data: artisans
    });
  } catch (error) {
    console.error('Erreur getArtisansByCategorie:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des artisans'
    });
  }
};

/**
 * GET /api/artisans/search?q=terme
 * Recherche d'artisans par nom
 */
exports.searchArtisans = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q || q.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Le terme de recherche doit contenir au moins 2 caractères'
      });
    }
    
    const artisans = await Artisan.findAll({
      where: {
        nom: {
          [Op.like]: `%${q.trim()}%`
        }
      },
      include: [{
        model: Specialite,
        as: 'specialite',
        include: [{
          model: Categorie,
          as: 'categorie'
        }]
      }],
      order: [['note', 'DESC'], ['nom', 'ASC']],
      limit: 20
    });
    
    res.json({
      success: true,
      count: artisans.length,
      query: q.trim(),
      data: artisans
    });
  } catch (error) {
    console.error('Erreur searchArtisans:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la recherche'
    });
  }
};

/**
 * POST /api/artisans/:id/contact
 * Formulaire de contact pour un artisan
 */
exports.contactArtisan = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, email, objet, message } = req.body;
    
    // Validation basique
    if (!nom || !email || !objet || !message) {
      return res.status(400).json({
        success: false,
        message: 'Tous les champs sont requis'
      });
    }
    
    // Vérifier que l'artisan existe
    const artisan = await Artisan.findByPk(id);
    
    if (!artisan) {
      return res.status(404).json({
        success: false,
        message: 'Artisan non trouvé'
      });
    }
    
    // TODO: Implémenter l'envoi d'email avec Nodemailer
    // Pour le moment, on simule l'envoi
    console.log(`Email à envoyer à ${artisan.email}:`);
    console.log('De:', nom, `<${email}>`);
    console.log('Objet:', objet);
    console.log('Message:', message);
    
    res.json({
      success: true,
      message: 'Message envoyé avec succès. L\'artisan vous répondra sous 48h.'
    });
  } catch (error) {
    console.error('Erreur contactArtisan:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'envoi du message'
    });
  }
};