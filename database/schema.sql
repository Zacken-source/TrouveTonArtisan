-- SCRIPT DE CRÉATION DE LA BASE DE DONNÉES
-- Projet : Trouve ton artisan

DROP DATABASE IF EXISTS trouve_ton_artisan;
CREATE DATABASE trouve_ton_artisan CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE trouve_ton_artisan;

-- TABLE : categories
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_nom (nom)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- TABLE : specialites
CREATE TABLE specialites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    id_categorie INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_categorie) REFERENCES categories(id) ON DELETE CASCADE,
    INDEX idx_nom (nom),
    INDEX idx_categorie (id_categorie)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- TABLE : artisans
CREATE TABLE artisans (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(200) NOT NULL,
    id_specialite INT NOT NULL,
    note DECIMAL(2,1) NOT NULL CHECK (note >= 0 AND note <= 5),
    ville VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    site_web VARCHAR(255),
    a_propos TEXT,
    top BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_specialite) REFERENCES specialites(id) ON DELETE RESTRICT,
    INDEX idx_nom (nom),
    INDEX idx_note (note),
    INDEX idx_ville (ville),
    INDEX idx_top (top),
    INDEX idx_specialite (id_specialite)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- VUE : Artisans avec informations complètes
CREATE VIEW v_artisans_complets AS
SELECT 
    a.id,
    a.nom,
    a.note,
    a.ville,
    a.email,
    a.site_web,
    a.a_propos,
    a.top,
    s.nom AS specialite,
    s.id AS id_specialite,
    c.nom AS categorie,
    c.id AS id_categorie
FROM artisans a
INNER JOIN specialites s ON a.id_specialite = s.id
INNER JOIN categories c ON s.id_categorie = c.id;