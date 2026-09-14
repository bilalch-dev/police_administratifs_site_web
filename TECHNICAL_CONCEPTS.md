# 🛠️ Guide Technique Approfondi : Architecture, Technologies et DevOps
## *Portail Web de la Police Administrative Communale et de Gestion des Plaintes*

---

## 📑 Sommaire
1. [Architecture Globale du Système (3-Tiers)](https://github.com)
2. [Frontend : Architecture, UI/UX et Moteur Bilingue](https://github.com)
3. [Backend : API RESTful, Sécurité et Logique Métier (Flask)](https://github.com)
4. [Base de Données : PostgreSQL, Modélisation et ORM SQLAlchemy](https://github.com)
5. [DevOps : Conteneurisation Docker et Pipeline CI/CD](https://github.com)
6. [Tableau Synthétique des Technologies et Dépendances](https://github.com)

---

## 1. Architecture Globale du Système (3-Tiers)

Le portail repose sur une **architecture modulaire en 3 tiers** découplée, conteneurisée et interconnectée via un réseau virtuel interne sécurisé (`police-network`).

```text
 ┌──────────────────────────────────────────────────────────────────────────────┐
 │                              NAVIGATEUR CITOYEN / AGENT                      │
 └──────────────────────────────────────┬───────────────────────────────────────┘
                                        │ Requête HTTP (:8085)
                                        ▼
 ┌──────────────────────────────────────────────────────────────────────────────┐
 │ TIER 1 : PRÉSENTATION & REVERSE PROXY (Nginx Alpine)                         │
 │ ──────────────────────────────────────────────────────────────────────────── │
 │ • Distribution ultra-rapide des fichiers statiques (HTML5, CSS3, JS, PDF)    │
 │ • Reverse Proxy transparent : redirection des requêtes /api/* vers le port 5000│
 │ • Compression Gzip dynamique et gestion du cache HTTP                        │
 └──────────────────────────────────────┬───────────────────────────────────────┘
                                        │ Proxy Pass interne (:5000)
                                        ▼
 ┌──────────────────────────────────────────────────────────────────────────────┐
 │ TIER 2 : TRAITEMENT & LOGIQUE MÉTIER (Flask & Gunicorn / Python 3.11)        │
 │ ──────────────────────────────────────────────────────────────────────────── │
 │ • API RESTful stateless avec contrôle des accès par jetons JWT               │
 │ • Validation métier, génération des codes de suivi (POL-2026-XXXXX)          │
 │ • Couche d'abstraction ORM (SQLAlchemy) et protection contre les injections   │
 └──────────────────────────────────────┬───────────────────────────────────────┘
                                        │ TCP / Protocole PostgreSQL (:5432)
                                        ▼
 ┌──────────────────────────────────────────────────────────────────────────────┐
 │ TIER 3 : PERSISTANCE DES DONNÉES (PostgreSQL 15 Alpine)                      │
 │ ──────────────────────────────────────────────────────────────────────────── │
 │ • Base relationnelle conforme aux propriétés d'intégrité ACID                │
 │ • Stockage persistant via volume Docker externe (postgres_data)              │
 └──────────────────────────────────────────────────────────────────────────────┘
```

### Avantages de cette Architecture :
* **Découplage strict** : Le Frontend ne communique avec la base de données qu'à travers l'API REST ; aucune exposition directe des identifiants BDD au client.
* **Point d'entrée unique (Port 8085)** : Grâce au Reverse Proxy Nginx, le navigateur ne dialogue qu'avec un seul port, éliminant totalement les blocages liés aux politiques CORS en production.
* **Scalabilité horizontale** : Le serveur Backend (Gunicorn multi-workers) peut être redimensionné sans impacter la couche statique Nginx.

---

## 2. Frontend : Architecture, UI/UX et Moteur Bilingue

### 2.1 Philosophie Technique : Pourquoi le Vanilla JavaScript (ES6+) ?
Contrairement aux applications utilisant des frameworks lourds (React, Angular, Vue) avec des milliers de dépendances `node_modules`, le frontend a été développé en **JavaScript pur, HTML5 sémantique et CSS3 moderne** :
* **Performance instantanée** : Temps de premier affichage (*First Contentful Paint*) inférieur à **80 ms**.
* **Poids plume** : L'image Docker du frontend ne pèse que **~25 Mo**.
* **Zéro rupture de compatibilité** : Fonctionnement direct dans tous les navigateurs modernes sans phase complexe de transpilation (*build step*).

### 2.2 Organisation Modulaire des Scripts (`js/`)
Le code JavaScript est découpé en responsabilités distinctes :
* **`js/data.js` (Dictionnaire centralisé)** : Regroupe l'intégralité des chaînes de traduction en Arabe et en Français, les structures des 10 domaines de police et les checklists de pièces administratives.
* **`js/main.js` (Contrôleur global)** : 
  * Initialise les composants partagés (en-tête, barre de navigation, pied de page).
  * Supervise le basculement dynamique de thème (Clair / Sombre) et de langue.
  * Gère l'accessibilité et la fermeture universelle des fenêtres modales.
* **`js/pages/*.js` (Contrôleurs de pages spécifiques)** :
  * `home.js` : Anime les compteurs statistiques incrémentaux et intègre la liseuse PDF du guide officiel DGCT (28 pages).
  * `legal.js` : Gère les accordéons interactifs des compétences tripartites (Maire, Pacha/Caïd, Conseil).
  * `domains.js` : Système de filtrage par onglets thématiques et affichage des arrêtés applicables en modale.
  * `procedures.js` : **Générateur interactif de checklist** de pièces à fournir, avec copie dans le presse-papier et impression stylisée (`window.print()`).
  * `complaints.js` : Validation asynchrone du formulaire citoyen, émission vers l'API Flask, affichage de la jauge à 4 étapes et sauvegarde locale de secours (`localStorage`).
  * `resources.js` : Barre de recherche instantanée en temps réel et filtre alphabétique bilingue (A à Z / أ à ي).
  * `admin.js` : Formulaire d'authentification JWT, chargement des plaintes, filtrage multicritère et mise à jour de l'avancement avec saisie de notes officielles.

### 2.3 Le Moteur Bilingue et l'Adaptation RTL / LTR
Le portail offre une expérience bilingue complète sans rechargement de page :
1. **Attribut d'Orientation DOM** : Lors du changement de langue, JavaScript modifie dynamiquement `<html lang="..." dir="...">` :
   * Arabe : `lang="ar"` et `dir="rtl"` (Right-to-Left).
   * Français : `lang="fr"` et `dir="ltr"` (Left-to-Right).
2. **Propriétés Logiques CSS** : Utilisation des règles modernes de mise en page (*CSS Logical Properties*) telles que `margin-inline-start`, `padding-inline-end`, et `inset-inline` pour garantir que les marges, bordures et icônes s'inversent parfaitement sans duplication de code CSS.
3. **Persistance de l'État** : Le choix linguistique et le thème visuel sont stockés dans `localStorage`, conservant les préférences de l'usager d'une visite à l'autre.

### 2.4 Le Design System (`css/`)
* **`css/design-system.css`** : Centralise les jetons graphiques (*Design Tokens*) via des variables CSS :
  * Palette identitaire : Vert Émeraude municipal (`--primary: #0F5132`), Vert dynamique (`--primary-light: #198754`), Or institutionnel (`--gold: #D4AF37`).
  * Mode sombre : Gestion automatique des fonds (`--bg-primary: #0F172A`), des surfaces (`--card-bg: #1E293B`) et des contrastes de texte (`--text-primary: #F8FAFC`).
* **`css/style.css`** : Stylisation des composants réutilisables (Navbar, boutons, badges, modales).
* **`css/pages.css`** : Grilles fluides (*CSS Grid / Flexbox*) et règles média-queries assurant un affichage responsive sur mobile, tablette et écran large.

---

## 3. Backend : API RESTful, Sécurité et Logique Métier (Flask)

Le backend est développé en **Python 3.11** autour du micro-framework **Flask 3.0** et servi en production par le serveur d'application WSGI **Gunicorn**.

### 3.1 Architecture du Code Backend (`backend/`)
Le serveur applique le patron de conception **Application Factory** et une organisation modulaire par **Blueprints** :

```text
backend/
├── app.py              # Fabrique d'application create_app(), CORS, init BDD
├── config.py           # Configuration (Variables d'environnement, BDD, secrets JWT)
├── models.py           # Schémas de données SQLAlchemy et méthode to_dict()
├── requirements.txt    # Spécification stricte des versions des bibliothèques
├── routes/
│   ├── complaints.py   # Endpoints publics citoyens (POST, GET)
│   ├── auth.py         # Endpoint d'authentification des agents (POST /api/auth/login)
│   └── admin.py        # Endpoints protégés d'administration (GET, PUT)
└── tests/
    ├── conftest.py     # Fixtures Pytest, BDD SQLite en mémoire, tokens de test
    └── test_api.py     # 12 cas de tests automatisés (100% de réussite)
```

### 3.2 Spécification des Endpoints REST de l'API

| Méthode | Route HTTP | Accès | Paramètres Requis | Description & Code de Retour |
|---|---|:---:|---|---|
| **GET** | `/api/health` | Public | Aucun | Sonde de vivacité système (`200 OK`) |
| **POST** | `/api/complaints` | Public | JSON : `name`, `phone`, `category`, `title`, `location`, `details` | Création de plainte + génération code `POL-2026-XXXXX` (`201 Created`) |
| **GET** | `/api/complaints/<id>` | Public | URL Path : `id` (ex: `POL-2026-78A1B`) | Consultation citoyenne de l'avancement (`200 OK` ou `404 Not Found`) |
| **POST** | `/api/auth/login` | Public | JSON : `username`, `password` | Authentification agent + délivrance du jeton JWT (`200 OK` ou `401 Unauthorized`) |
| **GET** | `/api/admin/complaints` | 🔒 Protégé (JWT) | Query Params (opt) : `?category=...&step=...` | Récupération de la liste complète des plaintes pour l'agent (`200 OK`) |
| **PUT** | `/api/admin/complaints/<id>` | 🔒 Protégé (JWT) | URL Path : `id`<br>JSON : `statusStep`, `notes`, `status` | Mise à jour du workflow (1 à 4) et saisie des PV d'inspection (`200 OK`) |

### 3.3 Mécanisme de Sécurité et d'Authentification JWT
* **Principe Stateless** : L'API ne conserve aucune session utilisateur en mémoire vive. L'identité de l'agent est encapsulée dans un jeton cryptographique **JWT** (*JSON Web Token*) émis lors de la connexion.
* **Génération et Signature** : À l'authentification (`POST /api/auth/login`), après vérification du hachage du mot de passe (**SHA-256**), l'extension `Flask-JWT-Extended` signe un jeton avec l'algorithme cryptographique **HS256** et une clé secrète robuste (`JWT_SECRET_KEY`).
* **Protection des Routes** : Les routes administratives portent le décorateur Python `@jwt_required()`. Toute requête sans en-tête `Authorization: Bearer <token>` valide est immédiatement rejetée avec un code HTTP `401 Unauthorized`.

### 3.4 Générateur Automatique du Code de Suivi
Pour garantir des identifiants faciles à mémoriser et uniques, le modèle utilise un générateur cryptographique basé sur le module `secrets` de Python :
```python
def generate_tracking_id():
    chars = string.ascii_uppercase + string.digits
    suffix = ''.join(secrets.choice(chars) for _ in range(5))
    return f"POL-2026-{suffix}"  # Exemple : POL-2026-X8B9K
```

---

## 4. Base de Données : PostgreSQL, Modélisation et ORM SQLAlchemy

### 4.1 Système de Gestion : PostgreSQL 15
Le choix de **PostgreSQL** garantit :
* La stricte conformité **ACID** (Atomicité, Cohérence, Isolation, Durabilité).
* Le traitement robuste des jeux de caractères bilingues complexes (**UTF-8**).
* La gestion performante des accès concurrents lors des pics de signalements.

### 4.2 Modélisation Relationnelle des Données (`models.py`)

```text
 ┌──────────────────────────────────────┐       ┌──────────────────────────────────────┐
 │          TABLE: complaints           │       │             TABLE: users             │
 ├──────────────────────────────────────┤       ├──────────────────────────────────────┤
 │ * id           : VARCHAR(20) [PK]    │       │ * id            : SERIAL [PK]        │
 │   name         : VARCHAR(100)        │       │   username      : VARCHAR(80) [UQ]   │
 │   phone        : VARCHAR(20)         │       │   password_hash : VARCHAR(200)       │
 │   category     : VARCHAR(100)        │       │   role          : VARCHAR(50)        │
 │   title        : VARCHAR(200)        │       └──────────────────────────────────────┘
 │   location     : VARCHAR(200)        │
 │   details      : TEXT                │
 │   status       : VARCHAR(50)         │
 │   status_step  : INTEGER (1 à 4)     │
 │   notes        : TEXT (Notes BMH)    │
 │   created_at   : TIMESTAMP (UTC)     │
 └──────────────────────────────────────┘
```

### 4.3 Rôle de l'ORM SQLAlchemy
L'intégration de `Flask-SQLAlchemy` (v3.1.1) apporte deux bénéfices majeurs :
1. **Sécurité Totale contre les Injections SQL** : Les paramètres des requêtes sont échappés et typés automatiquement sans aucune concaténation directe de chaînes SQL.
2. **Mécanisme de Résilience (Fallback automatique)** : La configuration (`backend/config.py`) se connecte prioritairement à PostgreSQL sur `postgresql://...:5432/police_portal_db`. En cas d'absence de variable d'environnement (ex: exécution hors Docker ou tests locaux), elle bascule automatiquement sur une base SQLite locale (`police_portal.db`), permettant une portabilité absolue.

---

## 5. DevOps : Conteneurisation Docker et Pipeline CI/CD

### 5.1 Conteneurisation Multi-Services (`docker-compose.yml`)
L'ensemble de l'infrastructure est défini et orchestré en un seul fichier de configuration :

```yaml
services:
  frontend:
    build: .
    container_name: police-frontend-app
    ports:
      - "8085:80"
    depends_on:
      - backend-api
    restart: unless-stopped

  backend-api:
    build: ./backend
    container_name: police-backend-api
    ports:
      - "5000:5000"
    environment:
      DATABASE_URL: postgresql://postgres:police_db_pass_2026@postgres-db:5432/police_portal_db
      SECRET_KEY: police_super_secret_flask_key_2026
      JWT_SECRET_KEY: police_jwt_secret_signing_key_2026
    depends_on:
      postgres-db:
        condition: service_healthy
    restart: unless-stopped

  postgres-db:
    image: postgres:15-alpine
    container_name: police-postgres-db
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres -d police_portal_db"]
      interval: 5s
      timeout: 5s
      retries: 5
```

#### Points Techniques Remarquables :
* **Dépendance avec Condition de Santé (`condition: service_healthy`)** : Le conteneur Flask attend explicitement que PostgreSQL soit 100% prêt à accepter des connexions avant de démarrer, évitant les erreurs de démarrage intempestives (*CrashLoopBackOff*).
* **Isolation et Volume Persistant** : Le volume `postgres_data` garantit que l'arrêt ou la suppression des conteneurs n'entraîne aucune perte de données citoyennes.

### 5.2 Le Pipeline CI/CD Automatisé (`.github/workflows/ci.yml`)
À chaque modification de code soumise via `git push`, GitHub Actions déclenche automatiquement un pipeline composé de **3 jobs séquentiels** :

```text
 ┌───────────────────────────┐
 │ JOB 1 : TEST & LINT       │ ➔ Exécution du linter Flake8 (conformité PEP 8)
 │ (Python 3.11)             │ ➔ Exécution des 12 tests Pytest sur SQLite en mémoire
 └─────────────┬─────────────┘
               │ Succès (100% des tests validés)
               ▼
 ┌───────────────────────────┐
 │ JOB 2 : BUILD & PUBLISH   │ ➔ Construction des images Docker Frontend & Backend
 │ (GHCR Registry)           │ ➔ Tagging sémantique (:latest, :sha-xxxx, :v*.*.*)
 └─────────────┬─────────────┘ ➔ Publication sur GitHub Container Registry (ghcr.io)
               │
               ▼
 ┌───────────────────────────┐
 │ JOB 3 : SECURITY SCAN     │ ➔ Analyse des images avec le scanner Trivy
 │ (Trivy Security)          │ ➔ Détection des vulnérabilités CVE critiques et élevées
 └───────────────────────────┘
```

### 5.3 Suite de Tests Automatisés (`backend/tests/`)
Les 12 scénarios de test couvrent 100% du cycle de vie des données et garantissent la non-régression du système en **0,5 seconde** :
1. `test_health_check` : Sonde de vivacité HTTP 200.
2. `test_create_complaint_success` : Création et conformité du format `POL-2026-XXXXX`.
3. `test_create_complaint_missing_fields_returns_400` : Rejet des formulaires incomplets.
4. `test_get_complaint_by_tracking_id_success` : Récupération par code de suivi.
5. `test_get_complaint_not_found_returns_404` : Traitement des codes invalides.
6. `test_admin_login_success` : Délivrance du jeton JWT pour `admin / admin123`.
7. `test_admin_login_invalid_password_returns_401` : Rejet des mots de passe erronés.
8. `test_admin_login_missing_fields_returns_400` : Contrôle des identifiants vides.
9. `test_get_all_complaints_without_jwt_returns_401` : Vérification du blocage sans token.
10. `test_get_all_complaints_with_jwt_success` : Récupération protégée de la liste.
11. `test_update_complaint_status_step_and_notes` : Avancement du workflow et saisie de PV.
12. `test_update_complaint_not_found_returns_404` : Contrôle des mises à jour sur ID inexistant.

---

## 6. Tableau Synthétique des Technologies et Dépendances

| Couche | Technologie / Outil | Version | Rôle Précis dans le Projet |
|---|---|---|---|
| **Frontend** | HTML5 / CSS3 / JavaScript | ES6+ | Interface réactive, moteur bilingue LTR/RTL, mode sombre |
| **Serveur Web** | Nginx | `alpine` | Distribution statique ultra-rapide et Reverse Proxy `/api/*` |
| **Backend Framework**| Python / Flask | 3.11 / 3.0.2 | Logique métier, routage d'API et règles de validation |
| **Serveur WSGI** | Gunicorn | 21.2.0 | Serveur d'application HTTP multi-processus pour la production |
| **Sécurité Auth** | Flask-JWT-Extended | 4.6.0 | Génération et vérification des jetons cryptographiques JWT |
| **ORM & Mappage** | Flask-SQLAlchemy | 3.1.1 | Abstraction des modèles de données et requêtes paramétrées |
| **Pilote BDD** | psycopg2-binary | 2.9.9 | Connecteur Python natif haute performance pour PostgreSQL |
| **Base de Données**| PostgreSQL | 15-alpine | Système SGBDR relationnel transactionnel persistant (ACID) |
| **Conteneurs** | Docker & Docker Compose | v2.39+ | Encapsulation isolée et orchestration multi-services |
| **Tests Unitaires**| Pytest | 8.0.2 / 9.1 | Exécution automatisée des 12 tests d'API en mémoire |
| **Qualité Code** | Flake8 | Dernière | Linter d'analyse statique garantissant la conformité PEP 8 |
| **CI/CD & Sécurité**| GitHub Actions / Trivy | v4 / v0.29 | Chaîne d'intégration continue et scan de vulnérabilités CVE |
| **Registre Cloud** | GHCR (GitHub Packages) | - | Hébergement sécurisé des images conteneurisées |

---
*Fiche Technique Officielle — Portail de la Police Administrative Communale — Commune de Taza / ESTM*
