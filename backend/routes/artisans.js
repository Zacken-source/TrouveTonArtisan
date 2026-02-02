const express = require('express');
const router = express.Router();
const artisanController = require('../controllers/artisanController');
const { body } = require('express-validator');

router.get('/', artisanController.getAllArtisans);

router.get('/top', artisanController.getTopArtisans);

router.get('/search', artisanController.searchArtisans);

router.get('/categorie/:categorieId', artisanController.getArtisansByCategorie);

router.get('/:id', artisanController.getArtisanById);

router.post(
  '/:id/contact',
  [
    body('nom')
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('Le nom doit contenir entre 2 et 100 caractères'),
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Email invalide'),
    body('objet')
      .trim()
      .isLength({ min: 5, max: 200 })
      .withMessage('L\'objet doit contenir entre 5 et 200 caractères'),
    body('message')
      .trim()
      .isLength({ min: 10, max: 2000 })
      .withMessage('Le message doit contenir entre 10 et 2000 caractères')
  ],
  artisanController.contactArtisan
);

module.exports = router;