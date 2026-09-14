# 🏛️ Concept Global du Projet : Portail Numérique de la Police Administrative Communale
## *Plateforme Intégrée de Réglementation Municipale, de Participation Citoyenne et de Traçabilité des Signalements*

---

## Sommaire Exécutif
1. [Vision et Identité du Projet](#1-vision-et-identité-du-projet)
2. [Contexte et Fondements Juridiques](#2-contexte-et-fondements-juridiques)
3. [Problématique et Défis Territoriaux](#3-problématique-et-défis-territoriaux)
4. [Proposition de Valeur et Piliers Stratégiques](#4-proposition-de-valeur-et-piliers-stratégiques)
5. [Cartographie des Utilisateurs (Personas & Parcours)](#5-cartographie-des-utilisateurs-personas--parcours)
6. [Architecture Conceptuelle et Fonctionnelle](#6-architecture-conceptuelle-et-fonctionnelle)
7. [Cycle de Vie du Signalement Citoyen (Workflow à 4 Étapes)](#7-cycle-de-vie-du-signalement-citoyen-workflow-à-4-étapes)
8. [Philosophie Technique et Choix Architecturaux](#8-philosophie-technique-et-choix-architecturaux)
9. [Impact Territorial, Gouvernance et Perspectives](#9-impact-territorial-gouvernance-et-perspectives)

---

## 1. Vision et Identité du Projet

### 1.1 L'Énoncé de Vision
> **« Rapprocher l'administration communale de l'administré en transformant la police administrative d'une autorité punitive perçue en un service public numérique, transparent, préventif et collaboratif. »**

Le **Portail Numérique de la Police Administrative Communale** est une solution d'administration électronique (*E-Gouvernement territorial*) conçue pour moderniser la gestion de l'ordre public au niveau des collectivités territoriales marocaines (communes urbaines et rurales). 

Il matérialise la transition d'une gestion administrative traditionnelle sur support papier vers un **écosystème numérique unifié**, permettant aux citoyens de s'informer et de participer activement à la qualité de leur cadre de vie, tout en offrant aux services municipaux un outil opérationnel de traitement et de traçabilité des infractions.

---

## 2. Contexte et Fondements Juridiques

La police administrative communale au Maroc ne relève pas de la force répressive judiciaire (qui dépend des tribunaux et de la police judiciaire), mais d'une **compétence administrative préventive** visant à préserver la trilogie traditionnelle de l'ordre public : **la salubrité, la sécurité et la tranquillité publiques**.

```text
                     LES 3 PILIERS DE L'ORDRE PUBLIC COMMUNAL
  ┌─────────────────────────┬─────────────────────────┬─────────────────────────┐
  │   SALUBRITÉ PUBLIQUE    │   TRANQUILLITÉ PUBLIQUE │    SÉCURITÉ PUBLIQUE    │
  ├─────────────────────────┼─────────────────────────┼─────────────────────────┤
  │ • Gestion des déchets   │ • Nuisances sonores     │ • Circulation & voirie  │
  │ • Hygiène alimentaire   │ • Encombrement des voies│ • Prévention incendies  │
  │ • Salubrité des eaux    │ • Animaux errants (rage)│ • Bâtiments menaçant    │
  │ • Cimetières & décès    │ • Établissements classés│   ruine / chantiers     │
  └─────────────────────────┴─────────────────────────┴─────────────────────────┘
```

### 2.1 Cadre Légal Régissant le Projet
Le portail puise sa légitimité dans les textes fondateurs du droit administratif marocain :
* **Loi Organique n° 113-14 relative aux communes** : Fixe l'organisation territoriale décentralisée et renforce les compétences du conseil communal.
* **Loi n° 78-00 portant Charte Communale (modifiée par la Loi 17-08)** :
  * **Article 50** : Attribue au Président du Conseil Communal le pouvoir de police administrative générale sur l'hygiène, la circulation, les autorisations d'exercer et la salubrité.
  * **Article 49** : Précise les compétences régaliennes de l'Autorité Locale (Pacha / Caïd) relatives à l'ordre sécuritaire public, aux rassemblements et aux armes.
  * **Articles 37 à 40** : Fixent le rôle délibératif du Conseil Communal (adoption des arrêtés fiscaux et des règlements sanitaires).
* **Dahir du 17 août 1914** : Régit la nomenclature et la surveillance des établissements industriels et commerciaux insalubres, incommodes ou dangereux (1ère, 2ème et 3ème classe).
* **Décret n° 2.78.157 du 26 mai 1980** : Encadre les conditions d'exécution d'office des arrêtés municipaux en cas d'urgence ou de carence des contrevenants.

### 2.2 Les 3 Principes Cardinaux de Gouvernance
1. **Principe de Non-Contradiction** : Un arrêté de police communal ne peut en aucun cas être en contradiction avec une loi nationale ou un décret ministériel.
2. **Principe de Non-Empiètement** : Les services municipaux ne peuvent empiéter sur les domaines réservés exclusivement aux autorités sécuritaires de l'État (Sûreté Nationale, Gendarmerie Royale, Autorité Locale).
3. **Principe de Non-Substitution** : L'autorité de tutelle provinciale ne peut se substituer au maire que dans des circonstances d'urgence expressément définies par la loi.

---

## 3. Problématique et Défis Territoriaux

L'administration communale fait face à plusieurs dysfonctionnements majeurs que le projet ambitionne de résoudre :

```text
              AVANT (Système Traditionnel)                APRÈS (Portail E-Police)
  ┌──────────────────────────────────────────────┐     ┌──────────────────────────────────────────────┐
  │ • Textes juridiques dispersés et opaques     │     │ • Bibliothèque juridique bilingue simplifiée │
  │ • Dépôt physique obligatoire des plaintes     │ ──► │ • Dépôt numérique en ligne 24h/24           │
  │ • Zéro visibilité pour le citoyen (opacité)  │     │ • Code de suivi unique & progression 4 étapes│
  │ • Registres papier manuels, risques de perte │     │ • Tableau de bord numérique et base de données│
  │ • Démarches de permis complexes et floues    │     │ • Checklist interactive de pièces à fournir  │
  └──────────────────────────────────────────────┘     └──────────────────────────────────────────────┘
```

### 3.1 Les 4 Défis Clés
1. **L'Asymétrie d'Information** : Les citoyens ignorent souvent les conditions légales requises pour ouvrir un commerce, occuper le domaine public ou contester une nuisance.
2. **Le Coût Émotionnel et Financier des Déplacements** : Nécessité de se déplacer plusieurs fois au bureau d'ordre pour déposer une lettre manuscrite sans garantie de traitement.
3. **L'Absence de Traçabilité** : Aucun accusé de réception numérique ni moyen de savoir si les inspecteurs du Bureau Municipal d'Hygiène (BMH) se sont déplacés.
4. **La Surcharge des Agents Communaux** : Difficulté à prioriser les urgences et à archiver l'historique des contrôles sur le terrain.

---

## 4. Proposition de Valeur et Piliers Stratégiques

Le concept repose sur **3 piliers fondamentaux** :

```text
                     LES 3 PILIERS DU PROJET
     ┌───────────────────────────┬───────────────────────────┐
     │                           │                           │
     ▼                           ▼                           ▼
[ 1. ACCULTURATION ]     [ 2. PARTICIPATION ]      [ 3. TRAÇABILITÉ ]
  Vulgariser le droit      Permettre le signalement  Outiller les agents
  et guider les démarches   direct avec code unique   avec un workflow 
  en Arabe & Français.      pour chaque citoyen.      de traitement en direct.
```

1. **Pilier 1 : Acculturation et Transparence Juridique**  
   * Rendre le droit accessible à tous via des guides simplifiés, un glossaire bilingue interactif (Arabe/Français) et la consultation directe en ligne du guide officiel de la DGCT.
   * Fournir un générateur de checklist permettant aux commerçants et citoyens d'imprimer la liste exacte des pièces administratives requises avant de se déplacer.

2. **Pilier 2 : Participation Citoyenne et E-Signalement**  
   * Offrir un canal d'alerte direct en cas d'atteinte à l'hygiène, à la voirie ou à la tranquillité publique.
   * Assurer une transparence totale grâce à un identifiant unique cryptographique (`POL-2026-XXXXX`) permettant de suivre chaque étape de résolution.

3. **Pilier 3 : Efficacité Opérationnelle et Modernisation Administrative**  
   * Équiper les inspecteurs et agents communaux d'un tableau de bord sécurisé (authentification JWT) pour visualiser, filtrer et traiter les réclamations.
   * Formaliser la chaîne d'instruction en associant des procès-verbaux et notes officielles à chaque étape.

---

## 5. Cartographie des Utilisateurs (Personas & Parcours)

```text
                             LES 3 UTILISATEURS DU SYSTÈME
  ┌───────────────────────────┬───────────────────────────┬───────────────────────────┐
  │        LE CITOYEN         │     L'ENTREPRENEUR /      │      L'AGENT / BMH        │
  │                           │        COMMERÇANT         │                           │
  ├───────────────────────────┼───────────────────────────┼───────────────────────────┤
  │ • Signale un incident     │ • Consulte les règlements │ • Authentification JWT    │
  │ • Suit l'avancement (1-4) │ • Génère une checklist    │ • Triage des réclamations │
  │ • Consulte les lois       │ • Prépare son dossier     │ • Saisie des rapports PV  │
  └───────────────────────────┴───────────────────────────┴───────────────────────────┘
```

### Parcours Utilisateur 1 : Le Citoyen Témoin d'une Infraction
1. Constate un dépôt sauvage d'ordures ou une meute de chiens errants dans son quartier.
2. Accède à `complaints.html` depuis son smartphone ou PC.
3. Remplit le formulaire en 1 minute (Catégorie, localisation précise, description).
4. Reçoit immédiatement son code de suivi unique (ex: `POL-2026-X8B9K`).
5. Reconnecte son code ultérieurement pour constater l'intervention du Bureau Municipal d'Hygiène.

### Parcours Utilisateur 2 : Le Commerçant / Porteur de Projet
1. Souhaite installer une terrasse de café ou ouvrir un commerce classé.
2. Accède à `procedures.html` et sélectionne la démarche souhaitée.
3. Consulte le délai légal d'instruction (ex: 30 jours) et la base de calcul de la taxe communale.
4. Génère sa checklist de documents personnalisée et l'imprime en un clic pour constituer son dossier physique.

### Parcours Utilisateur 3 : L'Inspecteur Municipal (Agent du BMH)
1. Se connecte sur `admin.html` via ses identifiants sécurisés (reçoit un jeton JWT).
2. Consulte le tableau de bord recensant les plaintes triées par priorité et date.
3. Filtre les dossiers relatifs à son domaine (ex: *Salubrité et Hygiène alimentaire*).
4. Effectue la visite de contrôle sur le terrain.
5. Fait évoluer le statut du dossier vers l'étape 2 (*Inspection BMH*) puis 3 (*Arrêté de mise en demeure*) en y consignant son compte-rendu officiel.

---

## 6. Architecture Conceptuelle et Fonctionnelle

Le portail s'articule autour de **7 modules interconnectés** :

```text
                               PORTAIL GLOBAL
                                     │
         ┌───────────────────────────┴───────────────────────────┐
         ▼                                                       ▼
   ESPACE CITOYEN                                          ESPACE ADMIN
   (Accès Libre)                                           (Accès Sécurisé JWT)
   ├── Accueil & Lecteur PDF (index.html)                  └── Tableau de Bord Agent (admin.html)
   ├── Cadre Légal (legal.html)                                ├── Triage & Recherche
   ├── 10 Domaines d'Action (domains.html)                     ├── Mise à jour Statuts (1 à 4)
   ├── Procédures & Checklists (procedures.html)               └── Saisie des Notes Officielles
   ├── Signalement & Suivi (complaints.html)
   └── Lexique & Décrets (resources.html)
```

---

## 7. Cycle de Vie du Signalement Citoyen (Workflow à 4 Étapes)

Le système implémente une **machine à états finis** garantissant que chaque réclamation passe par un cycle d'instruction rigoureux et documenté :

```text
  ┌────────────────┐       ┌────────────────┐       ┌────────────────┐       ┌────────────────┐
  │   ÉTAPE 1      │       │   ÉTAPE 2      │       │   ÉTAPE 3      │       │   ÉTAPE 4      │
  │  ENREGISTRÉ    │ ────► │  EN INSPECTION │ ────► │   EN EXÉCUTION │ ────► │    CLÔTURÉ     │
  └────────────────┘       └────────────────┘       └────────────────┘       └────────────────┘
   Dépôt citoyen            Vérification BMH         Mise en demeure          Constat de fin
   Code POL-2026            Sortie terrain           Arrêté municipal         Dossier résolu
```

1. **Étape 1 — Reçu et Enregistré** :  
   Le signalement est horodaté et inséré dans la base de données PostgreSQL. Le code de suivi est délivré au citoyen.
2. **Étape 2 — En cours d'Inspection (BMH)** :  
   L'agent communal prend en charge le dossier et mandate une équipe du Bureau Municipal d'Hygiène ou de la voirie pour constater l'infraction sur les lieux.
3. **Étape 3 — Procédure Réglementaire / Exécution** :  
   Si l'infraction est confirmée, la commune adresse une mise en demeure au contrevenant assortie d'un délai légal, ou engage une procédure d'exécution d'office en cas d'urgence.
4. **Étape 4 — Traité et Clôturé** :  
   L'infraction a été levée (déchets évacués, établissement mis en conformité, animaux capturés). L'agent consigne la note finale et clôture le dossier.

---

## 8. Philosophie Technique et Choix Architecturaux

Le projet repose sur des principes d'ingénierie logicielle stricts visant la **durabilité, la légèreté et la sécurité** :

```text
                         ARCHITECTURE TECHNIQUE EN 3 TIERS
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │ 1. PRÉSENTATION : Serveur Web Nginx (Alpine) — Port 8085                    │
  │    • Frontend Vanilla (HTML5 / CSS3 / ES6+)                                 │
  │    • Moteur Bilingue dynamique (Arabe RTL ↔ Français LTR)                   │
  │    • Reverse Proxy automatique pour les appels /api/*                       │
  └──────────────────────────────────────┬──────────────────────────────────────┘
                                         │ Requêtes HTTP REST
                                         ▼
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │ 2. TRAITEMENT : API REST Flask & Gunicorn (Python 3.11) — Port 5000         │
  │    • Sécurité sans état par jetons JWT (Flask-JWT-Extended)                 │
  │    • Protection contre les injections SQL via ORM SQLAlchemy                │
  │    • Génération cryptographique des identifiants de suivi                   │
  └──────────────────────────────────────┬──────────────────────────────────────┘
                                         │ Connexion TCP PostgreSQL
                                         ▼
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │ 3. PERSISTANCE : Base de Données Relationnelle PostgreSQL 15 — Port 5432    │
  │    • Conformité totale aux propriétés d'intégrité ACID                      │
  │    • Volume persistant Docker garantissant la non-perte des données         │
  └─────────────────────────────────────────────────────────────────────────────┘
```

### 8.1 Pourquoi le choix du Vanilla JS côté Frontend ?
Au lieu de recourir à des frameworks volumineux (React, Angular, Vue) nécessitant des centaines de mégaoctets de dépendances `node_modules`, le frontend a été réalisé en **HTML5/CSS3/JavaScript pur** :
* **Performance extrême** : Temps de chargement initial inférieur à 100 ms.
* **Sobriété numérique** : Image Docker du frontend de seulement **~25 Mo**.
* **Pérennité** : Zéro risque de rupture de compatibilité liée aux versions de frameworks tiers.

### 8.2 Pourquoi le choix de la Conteneurisation (Docker) ?
L'ensemble des services est encapsulé dans des conteneurs isolés via `docker-compose.yml`. Cela garantit :
* **La reproductibilité parfaite** : L'application s'exécute de façon identique sur n'importe quel système d'exploitation.
* **Le déploiement en une commande** : `docker compose up -d` initialise l'intégralité du système (serveurs, réseau et base de données).

### 8.3 Pourquoi un Pipeline CI/CD (GitHub Actions) ?
La qualité industrielle du code est surveillée automatiquement à chaque commit :
* **Qualité du code** : Linter Flake8 (conformité PEP 8 stricte, 0 avertissement).
* **Fiabilité fonctionnelle** : 12 tests unitaires et d'intégration Pytest exécutés automatiquement.
* **Sécurité des conteneurs** : Scanner de vulnérabilités Trivy détectant les failles système (CVE).

---

## 9. Impact Territorial, Gouvernance et Perspectives

### 9.1 Les Retombées Concrètes pour la Commune
* **Restauration de la Confiance** : En donnant au citoyen la preuve visuelle que sa réclamation est instruite, la municipalité valorise le travail de ses agents sur le terrain.
* **Optimisation des Dépenses Publiques** : Meilleure allocation des équipes du Bureau d'Hygiène grâce au regroupement géographique des réclamations.
* **Modernisation Institutionnelle** : Alignement direct sur les orientations nationales de la stratégie **Maroc Digital 2030** relative à la dématérialisation des services publics locaux.

### 9.2 Perspectives d'Évolution Futures
* 🗺️ **Cartographie Interactive (SIG / GIS)** : Intégrer une carte dynamique basée sur Leaflet.js pour visualiser les zones de forte concentration d'incidents (*Heatmap* urbaine).
* 📲 **Notifications Multicanales** : Informer automatiquement le déclarant par SMS ou WhatsApp dès le passage d'une étape à l'autre.
* 📊 **Tableau de Bord Décisionnel (Business Intelligence)** : Générer des rapports trimestriels automatisés destinés au Conseil Communal pour mesurer l'efficacité des services municipaux.

---
*Document de Conceptuel de Référence | Portail de la Police Administrative Communale | Septembre 2026*
