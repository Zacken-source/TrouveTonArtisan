import axios from 'axios';

// Configuration de l'URL de base de l'API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Création de l'instance axios
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Intercepteur pour les requêtes
api.interceptors.request.use(
  config => {
    // Vous pouvez ajouter ici un token d'authentification
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => {
    console.error('Erreur requête:', error);
    return Promise.reject(error);
  }
);

// Intercepteur pour les réponses
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      console.error('Erreur API:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('Pas de réponse du serveur:', error.request);
    } else {
      console.error('Erreur de configuration:', error.message);
    }
    return Promise.reject(error);
  }
);

// ===== SERVICES CATÉGORIES =====

export const categoriesService = {
  getAll: () => api.get('/categories'),
  getById: (id) => api.get(`/categories/${id}`)
};

// ===== SERVICES ARTISANS =====

export const artisansService = {
  getAll: () => api.get('/artisans'),
  getTop: () => api.get('/artisans/top'),
  getById: (id) => api.get(`/artisans/${id}`),
  getByCategorie: (categorieId) => api.get(`/artisans/categorie/${categorieId}`),
  search: (query) => api.get(`/artisans/search?q=${encodeURIComponent(query)}`),
  contact: (id, data) => api.post(`/artisans/${id}/contact`, data)
};

export default api;