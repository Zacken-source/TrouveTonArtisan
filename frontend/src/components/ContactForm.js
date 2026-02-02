import React, { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { artisansService } from '../services/api';
import { isValidEmail, getErrorMessage } from '../utils/helpers';

function ContactForm({ artisanId, artisanNom }) {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    objet: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Gestion des changements dans les champs
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Effacer l'erreur du champ modifié
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  /**
   * Validation du formulaire
   */
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nom.trim() || formData.nom.trim().length < 2) {
      newErrors.nom = 'Le nom doit contenir au moins 2 caractères';
    }
    
    if (!formData.email.trim() || !isValidEmail(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    
    if (!formData.objet.trim() || formData.objet.trim().length < 5) {
      newErrors.objet = 'L\'objet doit contenir au moins 5 caractères';
    }
    
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Le message doit contenir au moins 10 caractères';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Soumission du formulaire
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError(null);
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      await artisansService.contact(artisanId, formData);
      setSuccess(true);
      // Réinitialiser le formulaire
      setFormData({
        nom: '',
        email: '',
        objet: '',
        message: ''
      });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-form">
      <h3 className="mb-4">Contacter {artisanNom}</h3>
      
      {/* Message de succès */}
      {success && (
        <Alert variant="success" onClose={() => setSuccess(false)} dismissible>
          Message envoyé avec succès ! L'artisan vous répondra sous 48h.
        </Alert>
      )}
      
      {/* Message d'erreur */}
      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )}
      
      <Form onSubmit={handleSubmit} noValidate>
        {/* Nom */}
        <Form.Group className="mb-3" controlId="formNom">
          <Form.Label>Nom *</Form.Label>
          <Form.Control
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            isInvalid={!!errors.nom}
            placeholder="Votre nom"
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.nom}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Email */}
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email *</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            isInvalid={!!errors.email}
            placeholder="votre.email@exemple.com"
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Objet */}
        <Form.Group className="mb-3" controlId="formObjet">
          <Form.Label>Objet *</Form.Label>
          <Form.Control
            type="text"
            name="objet"
            value={formData.objet}
            onChange={handleChange}
            isInvalid={!!errors.objet}
            placeholder="Demande de devis, renseignement..."
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.objet}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Message */}
        <Form.Group className="mb-3" controlId="formMessage">
          <Form.Label>Message *</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            name="message"
            value={formData.message}
            onChange={handleChange}
            isInvalid={!!errors.message}
            placeholder="Décrivez votre demande..."
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.message}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Bouton d'envoi */}
        <Button 
          variant="primary" 
          type="submit" 
          disabled={loading}
          className="w-100"
        >
          {loading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="me-2"
              />
              Envoi en cours...
            </>
          ) : (
            'Envoyer le message'
          )}
        </Button>
        
        <Form.Text className="text-muted d-block mt-2">
          * Champs obligatoires
        </Form.Text>
      </Form>
    </div>
  );
}

export default ContactForm;