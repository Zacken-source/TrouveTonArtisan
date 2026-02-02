const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Artisan = sequelize.define('Artisan', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom: {
    type: DataTypes.STRING(200),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Le nom ne peut pas être vide'
      },
      len: {
        args: [2, 200],
        msg: 'Le nom doit contenir entre 2 et 200 caractères'
      }
    }
  },
  id_specialite: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'specialites',
      key: 'id'
    }
  },
  note: {
    type: DataTypes.DECIMAL(2, 1),
    allowNull: false,
    validate: {
      min: {
        args: [0],
        msg: 'La note doit être au minimum 0'
      },
      max: {
        args: [5],
        msg: 'La note doit être au maximum 5'
      }
    }
  },
  ville: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'La ville ne peut pas être vide'
      }
    }
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      isEmail: {
        msg: 'Email invalide'
      }
    }
  },
  site_web: {
    type: DataTypes.STRING(255),
    allowNull: true,
    validate: {
      isUrl: {
        msg: 'URL invalide'
      }
    }
  },
  a_propos: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  top: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'artisans',
  timestamps: true
});

module.exports = Artisan;