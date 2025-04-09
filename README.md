# Park'n'Co - Application Frontend

Ce projet est l'interface utilisateur de l'application Park'n'Co, développée avec [Next.js](https://nextjs.org).

## Description

Park'n'Co est une application de gestion de parkings intelligents qui permet aux utilisateurs de :
- Créer un compte et gérer leur profil utilisateur
- Trouver et réserver des places de parking en temps réel
- Consulter l'historique de leurs réservations
- Interagir avec les services IoT des parkings
- Recevoir des notifications sur l'état de leurs réservations
- Gérer leurs véhicules
- Participer à un système de gamification
- Consulter des statistiques d'utilisation
- Échanger des messages avec d'autres utilisateurs
- Noter et évaluer les autres utilisateurs

## Technologies Utilisées

- Next.js
- TypeScript pour un typage fort
- Tailwind CSS pour le styling
- Axios pour les requêtes complexes vers les microservices
- Fetch API pour les requêtes simples
- Cypress pour les tests E2E
- JWT pour l'authentification
- OpenRoute API pour les services de géolocalisation
- ESLint pour le linting du code

## Prérequis

- Node.js (version 16 ou supérieure)
- npm ou yarn
- Un navigateur web moderne (Chrome, Firefox, Safari, Edge)
- Le backend Park'n'Co en cours d'exécution en local

## Installation

1. Clonez le dépôt :
```bash
git clone [URL_DU_REPO]
cd cesi-parknco-frontend
```

2. Installez les dépendances :
```bash
npm install
# ou
yarn install
```

3. Configurez les variables d'environnement :
Créez un fichier `.env.local` à la racine du projet avec les variables suivantes :
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_AUTH_SERVICE_URL=http://localhost:3002
NEXT_PUBLIC_IOT_SERVICE_URL=http://localhost:3003
NEXT_PUBLIC_METIER_SERVICE_URL=http://localhost:3004
NEXT_PUBLIC_ADMIN_SERVICE_URL=http://localhost:3005
```

4. Assurez-vous que le backend est en cours d'exécution :
- Le service d'authentification doit être lancé sur le port 3002
- Le service IoT doit être lancé sur le port 3003
- Le service métier doit être lancé sur le port 3004
- Le service administrateur doit être lancé sur le port 3005

5. Lancez le serveur de développement :
```bash
npm run dev
# ou
yarn dev
```

L'application sera accessible à l'adresse [http://localhost:3000](http://localhost:3000).

## Structure du Projet

- `/src` : Code source principal
  - `/components` : Composants React réutilisables
    - `/global` : Composants globaux (header, footer, formulaires, etc.)
    - `/trip` : Composants liés aux trajets
    - `/stats` : Composants pour les statistiques
    - `/admin` : Composants pour l'interface administrateur
  - `/pages` : Routes et pages de l'application Next.js
    - `/profile` : Pages de gestion du profil et des véhicules
    - `/admin` : Pages d'administration (utilisateurs, statistiques, gamification)
    - `/api` : Routes API internes
  - `/services` : Services d'API et de gestion des données
    - `auth.ts` : Service d'authentification
    - `tripService.ts` : Service de gestion des trajets
    - `vehicleService.ts` : Service de gestion des véhicules
    - `userService.ts` : Service de gestion des utilisateurs
    - `statsService.ts` : Service de statistiques
    - `gamificationService.ts` : Service de gamification
    - `openRouteService.ts` : Service d'intégration avec OpenRoute API
  - `/hooks` : Hooks React personnalisés
    - `useAuth.ts` : Hook de gestion de l'authentification
    - `useVehicles.ts` : Hook de gestion des véhicules
    - `useLoginForm.ts` : Hook de gestion du formulaire de connexion
    - `useTripFormValidation.ts` : Hook de validation des formulaires de trajet
  - `/config` : Fichiers de configuration
    - `api.ts` : Configuration des endpoints API
  - `/styles` : Fichiers CSS et configurations de style
  - `/types` : Définitions de types TypeScript
    - `trip.ts` : Types liés aux trajets
- `/public` : Assets statiques (images, icônes)
- `/cypress` : Tests E2E avec Cypress

## Tests

Pour lancer les tests unitaires :
```bash
npm run test
# ou
yarn test
```

Pour les tests E2E avec Cypress :
```bash
npm run cypress:open
# ou
yarn cypress:open
```

## Fonctionnalités Principales

### Authentification
- Inscription avec email et mot de passe
- Connexion sécurisée
- Récupération de mot de passe
- Gestion de session
- Gestion de la photo de profil

### Gestion des Parkings
- Recherche de parkings par localisation
- Affichage des places disponibles en temps réel
- Réservation de places
- Historique des réservations

### Gestion des Véhicules
- Ajout et modification de véhicules
- Association de véhicules au compte utilisateur

### Messagerie
- Échange de messages entre utilisateurs
- Notifications de nouveaux messages

### Système de Notation
- Évaluation des conducteurs par les passagers
- Évaluation des passagers par les conducteurs
- Affichage des notes moyennes

### Gamification
- Système de points et de récompenses
- Suivi des statistiques d'utilisation

### Administration
- Interface dédiée pour les administrateurs
- Gestion des utilisateurs et des parkings
- Consultation des statistiques globales
- Configuration du système de gamification

### Application Mobile First
L'application a été conçue en suivant une approche "Mobile First", optimisée pour une utilisation sur smartphones et tablettes, tout en restant accessible sur desktop.
