const Categorie = require('./Categorie');
const Specialite = require('./Specialite');
const Artisan = require('./Artisan');

Categorie.hasMany(Specialite, {
  foreignKey: 'id_categorie',
  as: 'specialites',
  onDelete: 'CASCADE'
});

Specialite.belongsTo(Categorie, {
  foreignKey: 'id_categorie',
  as: 'categorie'
});

Specialite.hasMany(Artisan, {
  foreignKey: 'id_specialite',
  as: 'artisans',
  onDelete: 'RESTRICT'
});

Artisan.belongsTo(Specialite, {
  foreignKey: 'id_specialite',
  as: 'specialite'
});

module.exports = {
  Categorie,
  Specialite,
  Artisan
};