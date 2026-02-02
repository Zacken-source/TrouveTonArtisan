-- SCRIPT D'ALIMENTATION DE LA BASE DE DONNÉES
-- Basé sur le fichier data.xlsx fourni

USE trouve_ton_artisan;

-- INSERTION DES CATÉGORIES
INSERT INTO categories (nom) VALUES
('Bâtiment'),
('Services'),
('Fabrication'),
('Alimentation');

-- INSERTION DES SPÉCIALITÉS
INSERT INTO specialites (nom, id_categorie) VALUES
-- Alimentation (id_categorie = 4)
('Boucher', 4),
('Boulanger', 4),
('Chocolatier', 4),
('Traiteur', 4),
-- Bâtiment (id_categorie = 1)
('Chauffagiste', 1),
('Électricien', 1),
('Menuisier', 1),
('Plombier', 1),
-- Fabrication (id_categorie = 3)
('Bijoutier', 3),
('Couturier', 3),
('Ferronnier', 3),
-- Services (id_categorie = 2)
('Coiffeur', 2),
('Fleuriste', 2),
('Toiletteur', 2),
('Webdesigner', 2);

-- INSERTION DES ARTISANS
INSERT INTO artisans (nom, id_specialite, note, ville, email, site_web, a_propos, top) VALUES
-- Alimentation
('Boucherie Dumont', 1, 4.5, 'Lyon', 'boucherie.dumont@gmail.com', NULL, 
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend.', TRUE),
 
('Au pain chaud', 2, 4.8, 'Montélimar', 'aupainchaud@hotmail.com', NULL, 
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend.', TRUE),
 
('Chocolaterie Labbé', 3, 4.9, 'Lyon', 'chocolaterie-labbe@gmail.com', 'https://chocolaterie-labbe.fr', 
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend.', TRUE),
 
('Traiteur Truchon', 4, 4.1, 'Lyon', 'contact@truchon-traiteur.fr', 'https://truchon-traiteur.fr', 
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend.', FALSE),

-- Bâtiment
('Droguet le chaud', 5, 4.0, 'Évian', 'eleifend@plomberie-chambert.com', NULL, 
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend.', FALSE),

('Mont Blanc Électricité', 6, 4.5, 'Chamonix', 'contact@mont-blanc-electricite.com', 'https://mont-blanc-electricite.com', 
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend.', FALSE),
 
('Boutot & fils', 7, 4.7, 'Bourg-en-bresse', 'boutot-menuiserie@gmail.com', 'https://boutot-menuiserie.com', 
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend.', FALSE),
 
('Wolfs Bâtisseur', 8, 4.0, 'Vienne', 'plomberie-bellemare@gmail.com', 'https://plomberie-bellemare.com', 
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend.', FALSE),

-- Fabrication
('Claude Quinn', 9, 4.2, 'Aix-les-bains', 'claude.quinn@gmail.com', NULL, 
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend.', FALSE),
 
('Amitee Lecuyer', 10, 4.5, 'Annecy', 'a.amitee@hotmail.com', 'https://lecuyer-couture.com', 
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend.', FALSE),
 
('Ernest Ranger', 11, 5.0, 'Le Puy-en-Velay', 'ernest@hotmail.com', NULL, 
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend.', FALSE),

-- Services
('Royden Charbonneau', 12, 3.8, 'Saint-Priest', 'r.charbonneau@gmail.com', NULL, 
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend.', FALSE),
 
('Leela Dennis', 12, 3.8, 'Chambéry', 'l.dennis@hotmail.fr', 'https://coiffure-leela-chambery.fr', 
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend.', FALSE),
 
('Cela Bellefleur', 12, 4.1, 'Romans-sur-Isère', 'bellefleur.cela@gmail.com', 'https://fige-hair.fr', 
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend.', FALSE),
 
('Le monde des fleurs', 13, 4.6, 'Annonay', 'contact@le-monde-des-fleurs-annonay.fr', 'https://le-monde-des-fleurs-annonay.fr', 
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend.', FALSE),
 
('Valérie Laderoute', 14, 4.5, 'Valence', 'v.laderoute@gmail.com', NULL, 
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend.', FALSE),
 
('CM graphisme', 15, 4.4, 'Valence', 'contact@cm-graphisme.com', 'https://cm-graphisme.com', 
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend.', FALSE);

-- VÉRIFICATIONS
SELECT COUNT(*) as nb_categories FROM categories;
SELECT COUNT(*) as nb_specialites FROM specialites;
SELECT COUNT(*) as nb_artisans FROM artisans;
SELECT COUNT(*) as nb_artisans_top FROM artisans WHERE top = TRUE;

-- Afficher les artisans du mois
SELECT nom, note, ville FROM artisans WHERE top = TRUE ORDER BY note DESC;