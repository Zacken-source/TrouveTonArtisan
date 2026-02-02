# Sécurité - Trouve ton artisan

## 🔒 Mesures de sécurité implémentées

### 1. Protection Backend (Express)

#### Helmet.js
- **Description** : Middleware de sécurité qui configure les en-têtes HTTP
- **Protection contre** : XSS, clickjacking, injection de scripts
- **Implémentation** : `app.use(helmet())`

#### CORS (Cross-Origin Resource Sharing)
- **Description** : Contrôle les origines autorisées à accéder à l'API
- **Configuration** : 
  - Origine autorisée : `process.env.FRONTEND_URL`
  - En production : URL du domaine frontend uniquement
- **Implémentation** : `app.use(cors(corsOptions))`

#### Rate Limiting
- **Description** : Limite le nombre de requêtes par IP
- **Configuration** : 100 requêtes par 15 minutes
- **Protection contre** : Attaques par force brute, DDoS
- **Implémentation** : `express-rate-limit`

#### Express Validator
- **Description** : Validation et sanitization des données d'entrée
- **Utilisation** : 
  - Validation des emails
  - Validation des longueurs de chaînes
  - Normalisation des données
- **Routes concernées** : Formulaire de contact

### 2. Base de données

#### Sequelize ORM
- **Protection contre** : Injections SQL
- **Principe** : Requêtes paramétrées automatiques
- **Avantage** : Pas de concaténation de SQL brut

#### Contraintes de base de données
- Clés étrangères avec `ON DELETE CASCADE/RESTRICT`
- Contraintes CHECK sur les notes (0-5)
- Index pour améliorer les performances
- Validation au niveau du modèle

### 3. Gestion des données sensibles

#### Variables d'environnement
- **Fichier** : `.env` (non versionné dans Git)
- **Données stockées** :
  - Credentials de base de données
  - Clés API
  - URLs de services
- **Principe** : Jamais de données sensibles en dur dans le code

#### .gitignore
```
.env
.env.local
.env.production
node_modules/
*.log
```

### 4. Frontend (React)

#### Protection XSS
- **React** : Échappement automatique des variables
- **Principe** : `dangerouslySetInnerHTML` non utilisé
- **Validation** : Côté client ET serveur

#### Validation des formulaires
- Validation en temps réel
- Messages d'erreur clairs
- Désactivation du bouton submit pendant l'envoi

### 5. HTTPS en production

- **Obligatoire** : Toutes les communications doivent être chiffrées
- **Déploiement** : Vercel et Railway fournissent HTTPS automatiquement
- **Cookies** : Flag `secure` et `httpOnly` en production

## 🔍 Audit de sécurité

### Commandes d'audit
```bash
# Backend
cd backend
npm audit
npm audit fix

# Frontend
cd frontend
npm audit
npm audit fix
```

### Résultats de l'audit (exemple)
```
# Vulnérabilités trouvées : 0
# Packages audités : 847
# Dernier audit : 2026-01-30
```

## 🛡️ Veille de sécurité

### Outils de veille

1. **npm audit**
   - Fréquence : Hebdomadaire
   - Action : Mise à jour des dépendances vulnérables

2. **Snyk.io**
   - Surveillance continue
   - Alertes automatiques
   - Intégration GitHub

3. **GitHub Dependabot**
   - Pull requests automatiques
   - Mises à jour de sécurité

4. **OWASP Top 10**
   - Révision annuelle
   - Documentation : https://owasp.org/www-project-top-ten/

### Vulnérabilités courantes surveillées

1. **Injection SQL** → Prévenu par Sequelize
2. **XSS (Cross-Site Scripting)** → Prévenu par React + Helmet
3. **Broken Authentication** → Pas d'authentification pour v1
4. **Sensitive Data Exposure** → Variables d'environnement
5. **XML External Entities (XXE)** → Pas d'utilisation de XML
6. **Broken Access Control** → Rate limiting
7. **Security Misconfiguration** → Helmet + Configuration explicite
8. **XSS** → Protection React native
9. **Insecure Deserialization** → Validation des inputs
10. **Using Components with Known Vulnerabilities** → npm audit

## 📋 Checklist de sécurité

### Avant chaque déploiement

- [ ] Audit npm exécuté (0 vulnérabilités critiques)
- [ ] Variables d'environnement configurées
- [ ] HTTPS activé
- [ ] CORS configuré correctement
- [ ] Rate limiting activé
- [ ] Logs d'erreurs désactivés en production
- [ ] `.env` non versionné
- [ ] Validation des inputs testée
- [ ] Headers de sécurité vérifiés

### Tests de sécurité
```bash
# Tester les headers de sécurité
curl -I https://votre-api.com/api/health

# Tester le rate limiting
for i in {1..101}; do curl https://votre-api.com/api/artisans; done

# Tester la validation
curl -X POST https://votre-api.com/api/artisans/1/contact \
  -H "Content-Type: application/json" \
  -d '{"nom":"A","email":"invalid"}'
```

## 🚨 Signalement de vulnérabilités

Si vous découvrez une vulnérabilité de sécurité :

1. **NE PAS** créer d'issue publique
2. Envoyer un email à : security@trouve-ton-artisan.fr
3. Inclure :
   - Description de la vulnérabilité
   - Étapes pour la reproduire
   - Impact potentiel
   - Suggestions de correction (optionnel)

## 📚 Ressources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Express Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [React Security Best Practices](https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml)
- [Node.js Security Checklist](https://blog.risingstack.com/node-js-security-checklist/)

## 📅 Mises à jour

- **2026-01-30** : Documentation initiale de sécurité
- **À venir** : Ajout de l'authentification utilisateur
- **À venir** : Implémentation de CSP (Content Security Policy)