# Trouve ton artisan 🔨

Plateforme de mise en relation entre particuliers et artisans de la région Auvergne-Rhône-Alpes.

## 📋 Description

Ce projet permet aux particuliers de trouver facilement un artisan qualifié dans la région Auvergne-Rhône-Alpes. Les utilisateurs peuvent parcourir les artisans par catégorie, consulter leurs fiches détaillées et les contacter via un formulaire.

## 🛠️ Technologies utilisées

### Frontend
- **React.js** 18.2 - Framework JavaScript
- **React Router** 6.21 - Routing
- **Bootstrap** 5.3 - Framework CSS
- **React Bootstrap** 2.9 - Composants Bootstrap pour React
- **Sass** 1.69 - Préprocesseur CSS
- **Axios** 1.6 - Client HTTP

### Backend
- **Node.js** 18+ - Environnement d'exécution
- **Express** 4.18 - Framework web
- **Sequelize** 6.35 - ORM pour MySQL
- **MySQL** 8.0 - Base de données

### Sécurité
- **Helmet** - Protection contre les vulnérabilités
- **CORS** - Gestion des origines
- **Express Rate Limit** - Limitation des requêtes
- **Express Validator** - Validation des données

### Outils
- **Git & GitHub** - Versionning
- **Figma** - Maquettage

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** version 18 ou supérieure
- **npm** version 9 ou supérieure
- **MySQL** version 8.0 ou supérieure
- **Git** pour le versionning

Vérifier les versions installées :
```bash
node --version
npm --version
mysql --version
git --version
```

## 🚀 Installation

### 1. Cloner le repository
```bash
git clone https://github.com/zacken-source/trouve-ton-artisan.git
cd trouve-ton-artisan
```

### 2. Configuration de la base de données
```bash
# Se connecter à MySQL
mysql -u root -p

# Exécuter les scripts SQL
mysql -u root -p < database/schema.sql
mysql -u root -p < database/seed.sql
```

Vérifier que les données sont bien insérées :
```sql
USE trouve_ton_artisan;
SELECT COUNT(*) FROM categories;  -- Devrait retourner 4
SELECT COUNT(*) FROM artisans;    -- Devrait retourner 18
```

### 3. Configuration du Backend
```bash
cd backend

# Installer les dépendances
npm install

# Copier le fichier .env
cp .env.example .env

# Éditer .env avec vos paramètres
nano .env
```

Contenu du fichier `.env` :
```
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=votre_mot_de_passe
DB_NAME=trouve_ton_artisan

FRONTEND_URL=http://localhost:3000
```

Démarrer le serveur backend :
```bash
npm run dev
```

Le serveur devrait démarrer sur `http://localhost:5000`

### 4. Configuration du Frontend
```bash
cd frontend

# Installer les dépendances
npm install

# Copier le fichier .env
cp .env.example .env
```

Contenu du fichier `.env` :
```
REACT_APP_API_URL=http://localhost:5000/api
```

Démarrer l'application React :
```bash
npm start
```

L'application devrait s'ouvrir automatiquement sur `http://localhost:3000`

## 📁 Structure du projet
```
trouve-ton-artisan/
│
├── frontend/                 # Application React
│   ├── public/
│   ├── src/
│   │   ├── components/      # Composants réutilisables
│   │   ├── pages/           # Pages de l'application
│   │   ├── services/        # Services API
│   │   ├── styles/          # Fichiers Sass
│   │   ├── utils/           # Fonctions utilitaires
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── backend/                  # API Node.js
│   ├── config/
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   ├── middlewares/
│   ├── server.js
│   └── package.json
│
├── database/
│   ├── schema.sql
│   └── seed.sql
│
├── docs/
│   └── maquettes/
│
└── README.md
```

## 🔌 Routes API disponibles

### Catégories
- `GET /api/categories` - Récupérer toutes les catégories
- `GET /api/categories/:id` - Récupérer une catégorie par ID

### Artisans
- `GET /api/artisans` - Récupérer tous les artisans
- `GET /api/artisans/top` - Récupérer les 3 artisans du mois
- `GET /api/artisans/:id` - Récupérer un artisan par ID
- `GET /api/artisans/categorie/:categorieId` - Artisans d'une catégorie
- `GET /api/artisans/search?q=terme` - Rechercher des artisans
- `POST /api/artisans/:id/contact` - Contacter un artisan

## 🧪 Tests

### Tests recommandés

1. **Navigation** : Tester tous les liens et le routing
2. **Recherche** : Chercher "Boucher", "Lyon", etc.
3. **Formulaire** : Envoyer un message de contact
4. **Responsive** : Tester sur mobile, tablette, desktop
5. **Accessibilité** : Navigation au clavier, lecteurs d'écran
6. **Performance** : PageSpeed Insights
7. **Validation** : W3C Validator pour HTML/CSS

## 🔒 Sécurité

### Mesures implémentées

1. **Helmet.js** - Protection contre XSS, clickjacking
2. **CORS** - Restriction des origines autorisées
3. **Rate Limiting** - 100 requêtes / 15 minutes par IP
4. **Validation** - Express-validator sur tous les inputs
5. **Requêtes paramétrées** - Sequelize pour éviter les injections SQL
6. **Variables d'environnement** - Données sensibles dans .env
7. **HTTPS** - Obligatoire en production

### Audit de sécurité
```bash
npm audit
npm audit fix
```

## 📦 Déploiement

### Frontend sur Vercel
```bash
cd frontend
npm run build
npx vercel --prod
```

Variables d'environnement Vercel :
- `REACT_APP_API_URL` : URL de votre API

### Backend sur Railway

1. Créer un compte sur railway.app
2. Créer un projet et ajouter MySQL
3. Connecter votre repository GitHub
4. Configurer les variables d'environnement
5. Railway déploie automatiquement

## 👥 Auteur

**Votre Nom**
- GitHub: [zacken-soucre](https://github.com/zacken-soucre)
- Email: mchereau05@gmail.com

## 📄 Licence

© 2026 Région Auvergne-Rhône-Alpes - Tous droits réservés