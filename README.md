# 🏛️ Portail Numérique de la Police Administrative Communale
### *Municipal Administrative Police & Citizen Complaint Tracking Portal*
### *البوابة الرقمية للشرطة الإدارية الجماعية وتدبير الشكايات*

[![CI/CD Pipeline](https://github.com/bilalch-dev/police_administratifs_site_web/actions/workflows/ci.yml/badge.svg)](https://github.com/bilalch-dev/police_administratifs_site_web/actions)
[![Python Version](https://img.shields.io/badge/Python-3.11-blue.svg)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Framework-Flask_2.3+-green.svg)](https://palletsprojects.com/p/flask/)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL_15-blue.svg)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Containerized-Docker_Compose-2496ED.svg)](https://www.docker.com/)
[![Nginx](https://img.shields.io/badge/Web_Server-Nginx_Alpine-009639.svg)](https://nginx.org/)
[![Bilingual](https://img.shields.io/badge/Languages-Arabe_%7C_Français-orange.svg)](#-moteur-bilingue--accessibilité)

---

## 📌 Présentation du Projet (Project Overview)

Le **Portail Numérique de la Police Administrative Communale** est une solution web full-stack 3-tiers conçue pour moderniser la gouvernance locale, vulgariser le cadre juridique de la police administrative communale au Maroc (notamment la **Loi 113-14** et les **articles 40, 49 et 50 de la Charte Communale**), et digitaliser le cycle complet de gestion et d'instruction des réclamations citoyennes.

Déployé pour la collectivité territoriale de **Taza (تازة)**, le système répond à un double objectif :
1. **Pour les Citoyens** : Sensibilisation juridique, consultation des procédures de licences/autorisations, dépôt instantané de plaintes géolocalisées avec génération d'un code unique de suivi (`POL-2026-XXXXX`).
2. **Pour les Agents Communaux (BMH & Services Techniques)** : Espace d'administration sécurisé par JWT, tableau de bord statistique en temps réel, filtrage multicritère et workflow d'instruction en 4 étapes clés.

---

## 🏗️ Architecture Globale du Système (3-Tiers)

Le projet repose sur une **architecture conteneurisée modulaire** interconnectée via un réseau virtuel Docker :

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                       NAVIGATEUR WEB (Citoyen / Agent)                      │
│                Interface Bilingue Réactive (Français / العربية)             │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ Requête HTTP (:8085)
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ TIER 1 : PRÉSENTATION & REVERSE PROXY (Nginx Alpine)                        │
│ ─────────────────────────────────────────────────────────────────────────── │
│ • Distribution ultra-rapide des assets statiques (HTML5, CSS3, JS Vanilla)  │
│ • Reverse Proxy transparent : redirection des requêtes /api/* vers le port 5000│
│ • Gestion unifiée de la même origine (CORS-friendly)                       │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ Proxy interne (police-network)
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ TIER 2 : LOGIQUE MÉTIER & SÉCURITÉ (Python Flask + Gunicorn WSGI)            │
│ ─────────────────────────────────────────────────────────────────────────── │
│ • API RESTful modulaire via Flask Blueprints (auth, complaints, admin)      │
│ • Authentification sécurisée par JWT (JSON Web Tokens)                      │
│ • ORM SQLAlchemy : mapping objet-relationnel & validation métier           │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ Port 5432 (Protocole PostgreSQL)
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ TIER 3 : PERSISTANCE DES DONNÉES (PostgreSQL 15 Alpine)                     │
│ ─────────────────────────────────────────────────────────────────────────── │
│ • Conformité ACID & transactions sécurisées                                │
│ • Persistance via Volume Docker nommé (postgres_data)                       │
│ • Support complet de l'encodage UTF-8 (Arabe / Français)                   │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🌟 Fonctionnalités Majeures (Core Features)

### 1. 🌐 Moteur Bilingue & Accessibilité (AR / FR - RTL / LTR)
- Basculement instantané entre l'Arabe et le Français sans rechargement lourd.
- Inversion dynamique du sens de lecture (`dir="rtl"` / `dir="ltr"`).
- Dictionnaire réactif centralisé dans `js/data.js` couvrant l'intégralité des 7 pages du portail.

### 2. 📝 Portail Citoyen & Suivi des Plaintes
- Formulaire interactif de dépôt de réclamation ciblant les 5 domaines communaux :
  - 🏥 **Hygiène, Santé & Salubrité** (الصحة والنظافة والبيئة)
  - 🚦 **Voirie, Circulation & Stationnement** (السير والجولان)
  - 🐕 **Animaux Errants & Police Rurale** (الكلاب الضالة والحيوانات)
  - 🔊 **Tranquillité Publique & Nuisances Sonores** (السكينة العامة والإزعاج)
  - 🏪 **Établissements Classés & Commerces** (المؤسسات المرتبة والصحية)
- Génération automatique d'un **Tracking ID** sécurisé (ex : `POL-2026-78A1B`).
- Moteur de suivi en direct restituant l'étape courante, l'historique et les notes de l'agent.

### 3. 🛡️ Espace Agent & Tableau de Bord (`admin.html`)
- Connexion sécurisée avec génération de jeton JWT d'une durée de validité définie.
- Cartes statistiques dynamiques (Total, Étape 1, Étape 2, Étape 3, Étape 4).
- Recherche instantanée par mot-clé, filtre par domaine et filtre par étape d'avancement.
- Modale interactive d'instruction permettant le passage d'étape et l'ajout de notes d'intervention de terrain (BMH).

### 4. 📚 Bibliothèque Législative & Guide Officiel
- Visionneuse PDF intégrée pour feuilleter et télécharger le *Guide de la Police Administrative Communale*.
- Moteur de recherche alphabétique dans le lexique juridique communal.

---

## 📁 Structure du Répertoire (Project Structure)

```text
police_administratifs_site_web/
├── .github/
│   └── workflows/
│       └── ci.yml                   # Pipeline GitHub Actions (Lint, Pytest, Trivy, GHCR)
├── backend/
│   ├── routes/
│   │   ├── __init__.py
│   │   ├── admin.py                 # Endpoints protégés du tableau de bord agent
│   │   ├── auth.py                  # Authentification JWT des officiers
│   │   └── complaints.py            # Endpoints publics de dépôt et suivi de plaintes
│   ├── tests/
│   │   ├── __init__.py
│   │   ├── conftest.py              # Fixtures Pytest & configuration de test SQLite en mémoire
│   │   └── test_api.py              # Tests unitaires et d'intégration API
│   ├── app.py                       # Point d'entrée de l'application Flask
│   ├── config.py                    # Configurations (Dev, Prod, Test)
│   ├── Dockerfile                   # Image backend Python 3.11 Alpine
│   ├── models.py                    # Modèles SQLAlchemy (Complaint, User)
│   └── requirements.txt             # Dépendances Python (Flask, SQLAlchemy, JWT, Gunicorn...)
│
├── css/
│   ├── design-system.css            # Tokens CSS, palette HSL, typographie (Cairo & Tajawal), Thème Sombre/Clair
│   ├── pages.css                    # Styles des pages dédiées et tableaux de bord
│   └── style.css                    # Composants globaux (Navbar, Footer, Modales, Badges)
│
├── js/
│   ├── pages/
│   │   ├── admin.js                 # Logique du dashboard agent (Auth, Filtres, Modale)
│   │   ├── complaints.js            # Gestionnaire de formulaire citoyen & tracking
│   │   ├── domains.js               # Filtres des domaines d'intervention
│   │   ├── home.js                  # Animation et statistiques d'accueil
│   │   ├── legal.js                 # Navigation du cadre juridique
│   │   └── resources.js             # Moteur de recherche du lexique
│   ├── data.js                      # Dictionnaire bilingue centralisé (AR & FR)
│   └── main.js                      # Gestionnaire de thème, langue et composants partagés
│
├── admin.html                       # Tableau de bord municipal (Espace Agent)
├── complaints.html                  # Page citoyenne de dépôt et suivi de réclamation
├── docker-compose.yml               # Orchestration multi-conteneurs (Nginx, Flask, Postgres)
├── Dockerfile                       # Image frontend Nginx Alpine
├── domains.html                     # Domaines d'intervention de la police administrative
├── Guide_police_administrative.pdf  # Guide juridique officiel de référence
├── index.html                       # Page d'accueil du portail
├── legal.html                       # Cadre juridique & compétences du Président
├── nginx.conf                       # Configuration du reverse proxy Nginx
├── procedures.html                  # Guide des procédures et autorisations communales
├── resources.html                   # Bibliothèque législative et lexique
├── seed_complaints_api.py           # Script d'injection de données de démonstration (Taza)
└── README.md                        # Documentation officielle du projet
```

---

## 🔌 Référentiel des Endpoints API REST

| Méthode | Endpoint | Accès | Description |
|---|---|---|---|
| `GET` | `/api/health` | Public | Vérification de l'état de l'API (Healthcheck) |
| `POST` | `/api/complaints` | Public | Dépôt d'une nouvelle réclamation citoyenne |
| `GET` | `/api/complaints/<tracking_id>` | Public | Consultation de l'état d'avancement d'une plainte |
| `POST` | `/api/auth/login` | Public | Authentification agent et émission du jeton JWT |
| `GET` | `/api/admin/complaints` | 🔒 Protégé (JWT) | Récupération de la liste filtrable des réclamations |
| `PUT` | `/api/admin/complaints/<tracking_id>` | 🔒 Protégé (JWT) | Mise à jour de l'étape de traitement et ajout de notes |

---

## 🚀 Démarrage Rapide (Getting Started)

### Prérequis
- [Docker](https://docs.docker.com/get-docker/) & [Docker Compose](https://docs.docker.com/compose/install/)
- Ou Python 3.11+ et PostgreSQL 15 en cas d'exécution locale hors conteneur.

### 1. Lancement via Docker Compose (Recommandé)

Cloner le projet et lancer la pile complète en une seule commande :

```bash
# Cloner le dépôt
git clone https://github.com/bilalch-dev/police_administratifs_site_web.git
cd police_administratifs_site_web

# Construire et démarrer les 3 conteneurs en arrière-plan
docker compose up -d --build
```

Les services sont immédiatement opérationnels :
- 🌐 **Portail Web & Espace Admin** : [http://localhost:8085](http://localhost:8085) (ou [http://localhost:8085/admin.html](http://localhost:8085/admin.html))
- ⚡ **API Backend Flask** : [http://localhost:5000](http://localhost:5000)
- 🗄️ **Base de Données PostgreSQL** : `localhost:5432` (`police_portal_db`)

### 2. Identifiants Démo pour l'Espace Agent

| Rôle | Nom d'utilisateur | Mot de passe |
|---|---|---|
| **Officier Communal / BMH** | `admin` | `admin123` |

### 3. Alimentation en Données de Test (Taza)

Un script interactif utilisant exclusivement l'API REST permet d'injecter 10 réclamations géolocalisées à Taza :

```bash
python seed_complaints_api.py
```

---

## 🧪 Tests & Démarche Qualité (CI/CD)

Le projet intègre une suite de tests automatisés validée à chaque commit via **GitHub Actions** :

```bash
# Exécution manuelle des tests en local
cd backend
python -m pytest tests/ -v

# Vérification du style de code PEP8
flake8 . --count --statistics
```

Le pipeline CI/CD automatisé (`.github/workflows/ci.yml`) exécute :
1. Linting statique de la syntaxe avec `flake8`.
2. Tests unitaires et d'intégration avec `pytest` sur une base SQLite en mémoire.
3. Analyse de vulnérabilités de sécurité des images Docker avec `Trivy`.
4. Publication des images conteneurisées sur **GitHub Container Registry (GHCR)**.

---

## ⚖️ Conformité Légale & Références

- **Constitution du Royaume du Maroc de 2011** (Principes de bonne gouvernance et de décentralisation).
- **Loi organique n° 113-14 relative aux communes** (Attributions du Président du conseil en matière de police administrative).
- **Dahir du 15 février 1916** relatif à l'alignement, aux plans d'aménagement et aux voiries.
- **Loi n° 55-19** relative à la simplification des procédures et des formalités administratives.
- **Loi n° 09-08** relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel (CNDP).

---

## 👤 Auteur & Contact

- **Développeurs & Concepteurs** : [Bilal (bilalch-dev)](https://github.com/bilalch-dev) & [Hafsa (hafsa-gi)](https://github.com/hafsa-gi)
- **Projet** : Stage de Fin d'Études / Stage d'Application — Police Administrative Communale de Taza.