# Projet Platinium Bank - API de Gestion Bancaire

## Description
Cette API est développée avec NestJS pour simuler les fonctionnalités d'une banque en ligne fictive, Platinium Bank. Elle permet la gestion des utilisateurs, des comptes bancaires, et des cartes bancaires, ainsi que la simulation des opérations via un Distributeur Automatique de Billets (DAB).

## Fonctionnalités
- **Gestion des Utilisateurs** : Créer et gérer les utilisateurs de la banque.
- **Gestion des Comptes Bancaires** : Création, mise à jour, et consultation des comptes bancaires avec différents types :
  - Compte Courant
  - Compte Pro
  - Livret A
  - Compte Commun
- **Gestion des Cartes Bancaires** : Associer des cartes aux comptes selon des règles spécifiques.
- **Distributeur Automatique de Billets (DAB)** :
  - Authentification de l'utilisateur via la carte et le code PIN.
  - Consultation des soldes des comptes.
  - Consultation des dernières opérations.
  - Retrait d'argent.
  - Virement entre comptes de l'utilisateur.
  - Dépôt de chèques.
  - Déconnexion.

## Structure du Projet
Le projet est structuré en modules suivant l'architecture de NestJS :
- `users` : Gestion des utilisateurs.
- `accounts` : Gestion des comptes bancaires, y compris la consultation des soldes.
- `cards` : Gestion des cartes bancaires et de l'authentification par carte.
- `dab` : Orchestration des fonctionnalités du DAB, comme le retrait et la consultation des comptes.
- `database` : Configuration et gestion de la base de données.
- `deals` : Gestion des transactions bancaires.

## Installation

Faire la commande :
- `npm install`
- Initialisé le .env pour le JWT TOKEN, avec un JWT_SECRET
