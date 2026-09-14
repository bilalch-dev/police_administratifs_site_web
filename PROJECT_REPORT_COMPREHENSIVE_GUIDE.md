# 📘 Administrative Police Web Portal (البوابة الرسمية للشرطة الإدارية الجماعية)
## Comprehensive Technical & Functional Report Guide

> **Document Purpose**: This document serves as the complete technical, functional, architectural, and operational reference for the **Administrative Police Web Portal** project. It is specifically structured to provide all the necessary information, diagrams, data schemas, API specifications, and DevOps walkthroughs required to compile an exhaustive, professional project report.

---

## Table of Contents
1. [Project Overview & Executive Summary](#1-project-overview--executive-summary)
2. [Legal Framework & Contextual Background](#2-legal-framework--contextual-background)
3. [System Architecture & Tech Stack](#3-system-architecture--tech-stack)
4. [Functional Modules & Page-by-Page Walkthrough](#4-functional-modules--page-by-page-walkthrough)
5. [Bilingual Engine & UI/UX Design System](#5-bilingual-engine--uiux-design-system)
6. [Database Schema & Data Models](#6-database-schema--data-models)
7. [REST API Specifications & Endpoints Contract](#7-rest-api-specifications--endpoints-contract)
8. [Security & Authentication Architecture](#8-security--authentication-architecture)
9. [Containerization & Docker Architecture](#9-containerization--docker-architecture)
10. [DevOps, Testing & CI/CD Pipeline](#10-devops-testing--cicd-pipeline)
11. [Installation, Execution & Deployment Guide](#11-installation-execution--deployment-guide)
12. [Suggested Structure for the Final Report](#12-suggested-structure-for-the-final-report)

---

## 1. Project Overview & Executive Summary

### 1.1 Context
In Morocco, the **Communal Administrative Police (الشرطة الإدارية الجماعية)** constitutes one of the most critical municipal competencies. Governed by the Moroccan Communal Charter (*Charte Communale - Loi n° 78.00 modifiée par la Loi 17.08 et la Loi Organique 113.14*), it regulates public order, hygiene, urban safety, traffic, economic activities, and rural protection at the municipal level.

### 1.2 Problem Statement
Prior to this project, citizens, newly elected officials, and administrative practitioners faced significant friction:
* **Information Asymmetry**: Legal texts, municipal bylaws, and licensing procedures were scattered, fragmented, and difficult for citizens to understand.
* **Complex Procedures**: Lack of clear, standardized document checklists for permits (public domain occupation, classified establishments, construction, burial).
* **Absence of Digital Tracking**: Incident reporting and complaints regarding public health or safety lacked a direct digital channel and real-time status tracking.
* **Lack of Municipal Management Tools**: Municipal hygiene and police agents (*BMH*) lacked a unified dashboard to triage complaints, update inspection stages, and log official notes.

### 1.3 The Solution
The **Administrative Police Web Portal** is a production-grade, containerized, bilingual (Arabic & French) web platform providing:
1. **Public Digital Guide**: An interactive guide categorizing 10 intervention domains, governance principles, statutory decrees, and licensing requirements.
2. **Citizen Incident Filing & Tracking System**: Allows citizens to submit complaints with instant tracking codes (`POL-2026-XXXXX`) and monitor 4-step resolution workflows in real-time.
3. **Official PDF Document Center**: Integrated high-performance PDF reader for the official 28-page DGCT administrative guide.
4. **Municipal Officer Portal (Admin)**: Protected management dashboard with JWT authentication for municipal agents to inspect and update complaint lifecycles.
5. **Robust Micro-Stack**: Nginx Frontend, Python Flask REST API, PostgreSQL database, and automated GitHub Actions CI/CD pipeline.

---

## 2. Legal Framework & Contextual Background

The portal's content and business logic strictly mirror the official legal framework defined by the Moroccan Ministry of the Interior (DGCT):

```
                       MOROCCAN ADMINISTRATIVE POLICE
                       ┌────────────────────────────┐
                       │   Dahir & Organic Laws     │
                       └─────────────┬──────────────┘
                                     │
         ┌───────────────────────────┼───────────────────────────┐
         ▼                           ▼                           ▼
┌──────────────────┐       ┌──────────────────┐       ┌──────────────────┐
│  Maire / Conseil │       │  Autorité Locale │       │  Conseil         │
│  (Article 50)    │       │  (Pacha / Caïd)  │       │  Communal        │
│  • Salubrité     │       │  (Article 49)    │       │  (Articles 37-40)│
│  • Voirie        │       │  • Sécurité &    │       │  • Classement du │
│  • Permis        │       │    Ordre Public  │       │    Domaine Public│
│  • Exécution     │       │  • Associations  │       │  • Règlements    │
│    d'office      │       │  • Surveillance  │       │    d'Hygiène     │
└──────────────────┘       └──────────────────┘       └──────────────────┘
```

### 2.1 Key Legal Authorities
* **President of the Communal Council (Maire - Article 50)**: Holds direct executive police power over public health, traffic regulation, trade licensing, municipal cemeteries, and direct enforcement (*Exécution d'office* under Articles 52 & 53).
* **Local State Authority (Pacha / Caïd - Article 49)**: Exercises sovereign state police competencies, specifically public order, demonstrations, firearms, alcohol licensing, and ambulatory vendors.
* **Communal Council (Le Conseil Communal - Articles 37-40)**: The deliberative body responsible for voting general bylaws, hygiene regulations, and public domain classification.

### 2.2 The 3 Governance Principles
1. **Principle of Non-Contradiction (مبدأ عدم التناقض)**: Municipal bylaws must never contradict national laws or higher statutory regulations.
2. **Principle of Non-Encroachment (مبدأ عدم التطاول)**: Municipal authorities must not encroach upon competencies reserved exclusively for the national state police.
3. **Principle of Non-Substitution (مبدأ عدم الحلول)**: State authorities cannot substitute themselves for municipal authorities unless expressly authorized by statute.

---

## 3. System Architecture & Tech Stack

The system follows a **3-Tier Micro-Container Architecture** orchestrated through Docker Compose:

```
                          CLIENT BROWSER / MOBILE
                                     │
                                     │ HTTP (Port 8085)
                                     ▼
      ┌─────────────────────────────────────────────────────────────┐
      │  CONTAINER 1: FRONTEND & REVERSE PROXY (Nginx Alpine)       │
      │  • Static Assets (HTML5, CSS3, Vanilla JS, Images, PDF)     │
      │  • Gzip Compression & Static Cache Engine                   │
      │  • Reverse Proxy: /api/* ➔ backend:5000                     │
      └──────────────────────────────┬──────────────────────────────┘
                                     │ Internal Docker Network
                                     ▼
      ┌─────────────────────────────────────────────────────────────┐
      │  CONTAINER 2: BACKEND REST API (Python 3.11 + Flask)        │
      │  • WSGI Server: Gunicorn (2 Workers)                        │
      │  • JWT Authentication (Flask-JWT-Extended)                  │
      │  • Business Logic & Tracking ID Generator                   │
      │  • ORM: SQLAlchemy                                          │
      └──────────────────────────────┬──────────────────────────────┘
                                     │ TCP Port 5432
                                     ▼
      ┌─────────────────────────────────────────────────────────────┐
      │  CONTAINER 3: DATABASE (PostgreSQL 15 Alpine)               │
      │  • Persistent Data Storage (postgres_data Volume)           │
      │  • Tables: complaints, users                                │
      │  • Automated Schema Initialization & Default Admin Seed     │
      └─────────────────────────────────────────────────────────────┘
```

### 3.1 Technology Stack Summary

| Component | Technology | Version | Purpose |
|---|---|---|---|
| **Frontend UI** | HTML5 / CSS3 / JavaScript | ES6+ | Lightweight, zero-dependency client architecture. |
| **Styling & Theme** | CSS Custom Properties (Variables) | CSS3 | Dark/Light theme, glassmorphism, responsive grid. |
| **Typography** | Cairo, Tajawal, Inter | Google Fonts | Optimized Arabic RTL & Latin LTR readability. |
| **Web Server** | Nginx | 1.25 (Alpine) | High-performance static serving, reverse proxy, Gzip. |
| **Backend Framework** | Python / Flask | 3.0.2 | REST API routing, business logic, JSON serialization. |
| **WSGI Server** | Gunicorn | 21.2.0 | Production WSGI HTTP server for Python containers. |
| **Database ORM** | Flask-SQLAlchemy / SQLAlchemy | 3.1.1 | Object-Relational Mapping, connection pooling. |
| **Auth Security** | Flask-JWT-Extended | 4.7.4 | JSON Web Tokens for municipal officer dashboard access. |
| **Database** | PostgreSQL | 15 (Alpine) | ACID-compliant relational data store. |
| **Testing** | Pytest | 8.0.2 / 9.1 | Automated unit and integration testing suite. |
| **Linting** | Flake8 | 7.3.0 | PEP 8 compliance and static code analysis. |
| **Containerization** | Docker & Docker Compose | v2+ | Multi-container isolated runtime environment. |
| **CI/CD** | GitHub Actions | v4/v5 | Automated testing, Docker building, GHCR publishing. |
| **Security Scanning** | Trivy (Aqua Security) | Latest | Container vulnerability and CVE security scanner. |

---

## 4. Functional Modules & Page-by-Page Walkthrough

The portal comprises **6 Citizen-Facing Pages** and **1 Municipal Officer Admin Portal**:

```
                               PORTAL SITEMAP
                                     │
   ┌───────────┬───────────┬─────────┴─┬───────────┬───────────┬───────────┐
   ▼           ▼           ▼           ▼           ▼           ▼           ▼
Accueil     Cadre Légal Domaines   Procédures   Plaintes   Ressources   Espace Agent
(index)     (legal)     (domains)  (procedures) (complaints)(resources) (admin)
```

### 4.1 Page 1: Homepage (`index.html`)
* **Hero Banner & Live Search**: Search input with instant modal overlay and filter pills (*Santé & Hygiène, Domaine Public, Établissements Classés, Chiens Errants, Lutte contre la Rage*).
* **Live Statistics Counters**: 4 animated key performance indicators (3 Domains, 50+ Regulated Services, 100% Legal Framework, 24/7 Citizen Portal).
* **Featured Domains Grid**: Interactive cards linking directly to detailed domain breakdowns.
* **Governance Card**: Summary of the 3 legal principles with color-coded badges.
* **Exclusive Official PDF Reader**: High-performance interactive PDF modal with direct download link for the 28-page DGCT guide.

### 4.2 Page 2: Legal Framework (`legal.html`)
* **Core Concepts**: General vs Special Administrative Police, Police vs Public Service distinction.
* **Execution Measures**: Regulatory Decisions (*Décisions Réglementaires*), Individual Decisions (*Décisions Individuelles*), and Direct Enforcement (*Exécution d'office*).
* **Authorities Grid**: Deep breakdown of powers allocated to the Mayor, Local Authority (*Pacha/Caïd*), and Municipal Council.
* **Governance Rules**: Legal safeguards against conflicting municipal bylaws.

### 4.3 Page 3: Intervention Domains (`domains.html`)
* **Category Filter Tabs**: Filter across All (10), Health & Hygiene (5), Traffic & Public Domain (3), and Rural Police (2).
* **Detailed Domain Cards**:
  1. *Salubrité Publique & Propreté des Voies* (Article 50).
  2. *Salubrité des Logements & Environnement* (Articles 40 & 50).
  3. *Hygiène dans les Établissements Publics & Restaurants* (Article 50).
  4. *Établissements Classés Incommodes & Dangereux* (Dahir 1914).
  5. *Police des Funérailles & Cimetières* (Article 50).
  6. *Signalisation Routière & Sécurité* (Article 50).
  7. *Gares Routières & Stationnement* (Article 50).
  8. *Occupation Temporaire du Domaine Public* (Articles 37 & 50).
  9. *Chiens Errants & Lutte contre la Rage* (Article 50).
  10. *Prévention des Incendies & Risques Naturels* (Article 50).
* **Interactive Domain Modals**: Deep-dive popups displaying explicit obligations and legal articles.
* **Classified Establishments Spotlight**: Explanation of 1st, 2nd, and 3rd category risks.

### 4.4 Page 4: Procedures & Licensing (`procedures.html`)
* **Licensing Guides**: Step-by-step guides for Public Domain Occupation, Classified Establishments (2nd/3rd class), Building/Occupancy Permits, Burial Permits, and *Exécution d'Office*.
* **Processing Timelines & Fee Scales**: Displays statutory processing windows (e.g. 15 days, 30 days, 24/7 emergency) and applicable municipal tax references.
* **Document Checklist Generator**: Interactive modal wizard with one-click **Copy to Clipboard** and **Print Dossier** functionality.

### 4.5 Page 5: Complaints & Citizen Reports (`complaints.html`)
* **Incident Submission Form**: Captures citizen name, phone, incident category, location, and description.
* **Automatic Tracking Code Generation**: Generates unique cryptographic codes (`POL-2026-XXXXX`).
* **Real-time Status Progress Bar**: Visual 4-step progress tracker:
  * Step 1: 📥 *Reçu et Enregistré* (Received)
  * Step 2: 🔍 *Inspection en cours - BMH* (Field Inspection)
  * Step 3: ⚙️ *Procédure d'Arrêté / Mise en demeure* (Enforcement Action)
  * Step 4: ✅ *Traité & Clôturé* (Resolved)
* **Local Storage & Database Sync**: Submits directly to the Flask REST API with graceful offline caching.
* **FAQ Accordion**: Answers to common citizen legal questions.

### 4.6 Page 6: Digital Resources & Glossary (`resources.html`)
* **Interactive Legal Lexicon**: Searchable dictionary of administrative police terms (*Ordre Public, Salubrité, Tranquillité, Exécution d'office, etc.*).
* **Alphabetical Filter Bar**: Instant single-letter filtering (Arabic letters `أ`-`ي` and French `A`-`Z`).
* **Statutory Decrees Grid**: Summaries of foundational legislation (*Charte Communale 78.00/17.08, Décret 2.78.157, Dahir 17 Août 1914, Loi 12.90*).

### 4.7 Page 7: Municipal Officer Portal (`admin.html`)
* **Secure JWT Login**: Restricts access to authorized municipal agents (**`admin`** / **`admin123`**).
* **Live Dashboard Metrics**: Dynamic counters for Total Complaints, Received (Step 1), Inspection (Step 2), Enforcement (Step 3), and Resolved (Step 4).
* **Search & Filter Toolbar**: Search by tracking code or citizen name; filter by category or workflow step.
* **Status Inspection Modal**: Allows agents to advance the workflow step (1 to 4) and record official municipal notes.

---

## 5. Bilingual Engine & UI/UX Design System

### 5.1 Dynamic Translation & Direction Engine (`js/data.js` & `js/main.js`)
The portal features a zero-dependency translation engine:
* **Centralized Bilingual Data Store**: Complete dictionaries for Arabic (`ar`) and French (`fr`).
* **Instant Direction Switching**:
  * Arabic: `dir="rtl" lang="ar"` with `Cairo` and `Tajawal` typography.
  * French: `dir="ltr" lang="fr"` with `Inter` typography.
* **Persistent Preference**: Stored in `localStorage.getItem('police_portal_lang')`.
* **Dynamic DOM Translation**: Automatically updates page titles, form labels, dropdown options, placeholders, modals, and badges without page reload glitches.

### 5.2 CSS Design System & Theme Engine (`css/design-system.css`)
* **Emerald Authority Palette**: HSL color tokens for primary emerald (`hsl(168, 76%, 28%)`) and golden accent (`hsl(38, 94%, 52%)`).
* **Dark / Light Theme Manager**: Persistent dark mode stored in `localStorage` with automated CSS variable swaps.
* **Glassmorphism & Micro-Interactions**: Modern backdrop blur (`backdrop-filter: blur(16px)`), smooth CSS transitions, and subtle hover animations.

---

## 6. Database Schema & Data Models

The PostgreSQL database uses two core relational tables managed via SQLAlchemy:

```
                            DATABASE SCHEMA
  ┌─────────────────────────────────────────────────────────────┐
  │                        complaints                           │
  ├──────────────────┬──────────────────┬───────────────────────┤
  │ Field            │ Type             │ Description           │
  ├──────────────────┼──────────────────┼───────────────────────┤
  │ id (PK)          │ VARCHAR(20)      │ e.g. POL-2026-X8B9K   │
  │ name             │ VARCHAR(100)     │ Citizen Full Name     │
  │ phone            │ VARCHAR(20)      │ Contact Phone Number  │
  │ category         │ VARCHAR(100)     │ Domain Category       │
  │ title            │ VARCHAR(200)     │ Short Subject         │
  │ location         │ VARCHAR(200)     │ Street / District     │
  │ details          │ TEXT             │ Incident Details      │
  │ status           │ VARCHAR(50)      │ Human Status Label    │
  │ status_step      │ INTEGER (1 to 4) │ Workflow Step Number  │
  │ notes            │ TEXT             │ Official Agent Notes  │
  │ created_at       │ TIMESTAMP (UTC)  │ Submission Date       │
  └──────────────────┴──────────────────┴───────────────────────┘
                                ▲
                                │ Managed via JWT
  ┌─────────────────────────────┴───────────────────────────────┐
  │                           users                             │
  ├──────────────────┬──────────────────┬───────────────────────┤
  │ Field            │ Type             │ Description           │
  ├──────────────────┼──────────────────┼───────────────────────┤
  │ id (PK)          │ SERIAL           │ Auto-increment ID     │
  │ username         │ VARCHAR(80)      │ Unique Login Username │
  │ password_hash    │ VARCHAR(200)     │ SHA-256 Encrypted PWD │
  │ role             │ VARCHAR(50)      │ ADMIN / INSPECTOR     │
  └──────────────────┴──────────────────┴───────────────────────┘
```

### 6.1 Complaint Lifecycle State Machine
```text
  [Step 1: RECEIVED] ──► [Step 2: INSPECTION] ──► [Step 3: ENFORCEMENT] ──► [Step 4: RESOLVED]
  • Code Generated       • BMH Dispatched         • Mise en demeure         • Infraction Removed
  • Citizen Notified     • Health Verification    • Exécution d'office      • Dossier Closed
```

---

## 7. REST API Specifications & Endpoints Contract

All API endpoints are served under the `/api` route prefix and return standardized JSON payloads:

### 7.1 Public Endpoints (Citizen Services)

#### 1. System Health Check
* **Route**: `GET /api/health`
* **Response `200 OK`**:
  ```json
  {
    "service": "Police Administrative Flask API",
    "status": "healthy"
  }
  ```

#### 2. Submit Citizen Complaint
* **Route**: `POST /api/complaints`
* **Request Payload**:
  ```json
  {
    "name": "Karim El Alaoui",
    "phone": "0661998877",
    "category": "Propreté & Environnement",
    "title": "Dépôt sauvage d'ordures",
    "location": "Quartier Salam - Rue 14",
    "details": "Accumulation de déchets à proximité d'une école."
  }
  ```
* **Response `201 Created`**:
  ```json
  {
    "message": "تم تسجيل البلاغ بنجاح",
    "complaint": {
      "id": "POL-2026-X8B9K",
      "name": "Karim El Alaoui",
      "phone": "0661998877",
      "category": "Propreté & Environnement",
      "title": "Dépôt sauvage d'ordures",
      "location": "Quartier Salam - Rue 14",
      "details": "Accumulation de déchets à proximité d'une école.",
      "status": "تم الاستلام وتسجيل البلاغ",
      "statusStep": 1,
      "notes": "تم تسجيل الشكاية بنجاح وإحالتها على المصالح الجماعية المختصة.",
      "date": "2026-08-24 10:15:00"
    }
  }
  ```

#### 3. Lookup Complaint by Tracking Code
* **Route**: `GET /api/complaints/<tracking_id>`
* **Response `200 OK`**: Returns complaint object with current `statusStep` and inspector `notes`.
* **Response `404 Not Found`**: Returns `{"error": "لم يتم العثور على شكاية بهذا الرمز"}`.

---

### 7.2 Protected Endpoints (Municipal Officers)

#### 4. Officer Authentication (Login)
* **Route**: `POST /api/auth/login`
* **Request Payload**:
  ```json
  {
    "username": "admin",
    "password": "admin123"
  }
  ```
* **Response `200 OK`**:
  ```json
  {
    "message": "تم تسجيل الدخول بنجاح",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "username": "admin",
      "role": "ADMIN"
    }
  }
  ```

#### 5. Retrieve All Complaints (Dashboard Feed)
* **Route**: `GET /api/admin/complaints?category=...&step=...`
* **Headers**: `Authorization: Bearer <JWT_TOKEN>`
* **Response `200 OK`**: Returns array of all stored complaints ordered by creation date.

#### 6. Update Complaint Workflow Step & Notes
* **Route**: `PUT /api/admin/complaints/<tracking_id>`
* **Headers**: `Authorization: Bearer <JWT_TOKEN>`
* **Request Payload**:
  ```json
  {
    "statusStep": 2,
    "notes": "Équipe du BMH dépêchée sur les lieux pour constatation et désinfection."
  }
  ```
* **Response `200 OK`**: Returns updated complaint object.

---

## 8. Security & Authentication Architecture

1. **JSON Web Token (JWT) Authentication**: Protected admin endpoints use standard `Bearer <token>` validation via `Flask-JWT-Extended` with 256-bit cryptographic keys.
2. **Password Hashing**: Stored passwords use SHA-256 cryptographic hashing to prevent plaintext credential exposure.
3. **CORS Isolation**: Cross-Origin Resource Sharing is controlled via `Flask-CORS`, scoped exclusively to `/api/*`.
4. **Input Validation**: Backend strictly enforces payload completeness, preventing SQL injection via SQLAlchemy parameterized queries.
5. **Reverse Proxy Shield**: Nginx shields the Flask backend from direct external exposure; all client communication is mediated through Nginx.
6. **Secret Segregation**: Environment variables (`SECRET_KEY`, `JWT_SECRET_KEY`, `DATABASE_URL`) are isolated from version control using `.gitignore` and `.env.example`.

---

## 9. Containerization & Docker Architecture

### 9.1 Container 1: Frontend & Reverse Proxy (`Dockerfile`)
* **Base Image**: `nginx:alpine` (~25 MB).
* **Features**: Static file serving, Gzip compression, 7-day browser caching headers for CSS/JS/PDF, reverse proxy routing for `/api/` traffic.

### 9.2 Container 2: Backend API (`backend/Dockerfile`)
* **Base Image**: `python:3.11-alpine` (~55 MB).
* **WSGI Execution**: Runs Gunicorn (`gunicorn --bind 0.0.0.0:5000 app:app`).
* **Optimized Build**: Pre-compiles C extensions for PostgreSQL driver (`psycopg2-binary`).

### 9.3 Container 3: Database (`postgres:15-alpine`)
* **Image**: `postgres:15-alpine` (~80 MB).
* **Persistence**: Named volume `postgres_data` mapping to `/var/lib/postgresql/data`.
* **Healthcheck**: Automated health verification (`pg_isready -U postgres`).

### 9.4 Orchestration (`docker-compose.yml`)
```yaml
version: '3.8'

services:
  frontend:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: police-frontend-app
    ports:
      - "8085:80"
    depends_on:
      - backend-api
    restart: unless-stopped

  backend-api:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: police-backend-api
    ports:
      - "5000:5000"
    environment:
      - SECRET_KEY=police_portal_super_secret_key_2026
      - JWT_SECRET_KEY=jwt_secret_police_administrative_2026
      - DATABASE_URL=postgresql://postgres:police_db_pass_2026@postgres-db:5432/police_portal_db
    depends_on:
      postgres-db:
        condition: service_healthy
    restart: unless-stopped

  postgres-db:
    image: postgres:15-alpine
    container_name: police-postgres-db
    environment:
      - POSTGRES_DB=police_portal_db
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=police_db_pass_2026
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres -d police_portal_db"]
      interval: 5s
      timeout: 5s
      retries: 5
    restart: unless-stopped

volumes:
  postgres_data:
```

---

## 10. DevOps, Testing & CI/CD Pipeline

### 10.1 Automated Pytest Suite (`backend/tests/test_api.py`)
The project includes **12 automated unit and integration tests** executing in `< 0.6s` with an in-memory SQLite database:
1. `test_health_check`: Verifies `200 OK` on health probe.
2. `test_create_complaint_success`: Verifies complaint creation and regex pattern `^POL-2026-[A-Z0-9]{5}$`.
3. `test_create_complaint_missing_fields_returns_400`: Verifies rejection of invalid payloads.
4. `test_get_complaint_by_tracking_id_success`: Verifies tracking lookup.
5. `test_get_complaint_not_found_returns_404`: Verifies 404 on invalid tracking ID.
6. `test_admin_login_success`: Verifies JWT issuance for valid credentials.
7. `test_admin_login_invalid_password_returns_401`: Verifies auth failure handling.
8. `test_admin_login_missing_fields_returns_400`: Verifies login payload validation.
9. `test_get_all_complaints_without_jwt_returns_401`: Verifies JWT security barrier.
10. `test_get_all_complaints_with_jwt_success`: Verifies protected dashboard retrieval.
11. `test_update_complaint_status_step_and_notes`: Verifies workflow step advancement.
12. `test_update_complaint_not_found_returns_404`: Verifies update failure handling.

### 10.2 Continuous Integration & Registry Pipeline (`.github/workflows/ci.yml`)
Every push or pull request to `main` triggers a 3-stage GitHub Actions pipeline:

```text
  GitHub Push / PR
         │
         ▼
  ┌─────────────────────────────────────────────────────────────┐
  │ STAGE 1: Test & Lint Backend                                │
  │ • Python 3.11 Setup & Cache                                 │
  │ • Flake8 PEP 8 Linting (0 Errors / 0 Warnings)              │
  │ • Pytest Execution (12/12 Passed)                           │
  └──────────────────────────────┬──────────────────────────────┘
                                 │ (Passes ✅)
                                 ▼
  ┌─────────────────────────────────────────────────────────────┐
  │ STAGE 2: Build & Publish to GitHub Container Registry       │
  │ • Buildx Matrix Setup                                       │
  │ • Build & Push Frontend (ghcr.io/.../police-frontend)       │
  │ • Build & Push Backend (ghcr.io/.../police-backend)         │
  │ • Semantic Tagging (:latest, :sha-xxxx, :v1.0.0)            │
  └──────────────────────────────┬──────────────────────────────┘
                                 │
                                 ▼
  ┌─────────────────────────────────────────────────────────────┐
  │ STAGE 3: Security & Vulnerability Scan (Trivy)              │
  │ • Scans generated Docker images for CVEs                    │
  │ • Filters for actionable CRITICAL & HIGH vulnerabilities     │
  └─────────────────────────────────────────────────────────────┘
```

---

## 11. Installation, Execution & Deployment Guide

### 11.1 Prerequisites
* **Docker Engine** (v24+) and **Docker Compose** (v2+)
* **Python** (3.11+) *(Optional, for local testing)*
* **Git**

### 11.2 Launching the Application (Single Command)
1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/police_administratifs_site_web.git
   cd police_administratifs_site_web
   ```
2. Build and start the 3-container stack:
   ```bash
   docker-compose up -d --build
   ```
3. Verify running containers:
   ```bash
   docker ps
   ```

### 11.3 Access URLs
* **Citizen Portal (Homepage)**: `http://localhost:8085`
* **Complaints & Tracking**: `http://localhost:8085/complaints.html`
* **Municipal Officer Portal (Admin)**: `http://localhost:8085/admin.html`
  * *Default Username*: `admin`
  * *Default Password*: `admin123`
* **Backend API Health Probe**: `http://localhost:8085/api/health`

### 11.4 Running the Automated Test Suite Locally
```bash
python -m pip install -r backend/requirements.txt
python -m pytest backend/tests -v
```

---

## 12. Suggested Structure for the Final Report

Your coworker can structure their formal project report using the following academic/professional layout:

1. **Title Page & Acknowledgements (Page de garde & Remerciements)**
2. **Abstract / Résumé (English, French & Arabic)**
3. **General Introduction & Problematic (Introduction Générale & Problématique)**
   * Context of communal police in Moroccan territorial administration.
   * Challenges of transparency, licensing, and citizen reporting.
   * Project objectives and scope.
4. **Chapter 1: Legal & Business Analysis (Analyse Juridique & Métier)**
   * Overview of Charte Communale (Loi 78.00 / 113.14).
   * Distribution of powers (Maire vs Pacha/Caïd vs Conseil).
   * 10 Intervention domains and the 3 governance principles.
5. **Chapter 2: Requirements Specification & System Design (Conception & Spécifications)**
   * Functional & non-functional requirements.
   * Use Case diagrams (Citizen vs Municipal Agent).
   * Data Flow & Complaint Lifecycle State Machine.
   * Database relational schema.
6. **Chapter 3: Technical Implementation & Architecture (Réalisation & Architecture)**
   * 3-tier micro-stack architecture.
   * Frontend design system, bilingual RTL/LTR engine, and PDF viewer.
   * Flask REST API, JWT authentication, and PostgreSQL ORM.
   * Municipal Officer Dashboard implementation.
7. **Chapter 4: DevOps, Testing & Containerization (DevOps & Déploiement)**
   * Docker & Docker Compose containerization strategy.
   * Automated unit testing with Pytest (12 test cases).
   * Continuous Integration & Registry publishing with GitHub Actions & GHCR.
   * Container vulnerability scanning with Trivy.
8. **Conclusion & Perspectives (Conclusion Générale & Perspectives d'Évolution)**
   * Summary of achieved milestones.
   * Future perspectives (SMS alerts, mobile app, GIS geolocation mapping).
9. **References & Appendix (Références Juridiques & Annexes)**

---
*Document Version: 1.0.0 | Generated for Technical Reporting | August 2026*
