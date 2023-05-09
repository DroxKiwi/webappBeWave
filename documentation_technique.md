# Sommaire

- ## 1 Technologies séléctionnées pour le développement et la mise en production du projet
- - 1.0 Technologie concernant la base de données
- - 1.1 Technologie concernant le backoffice
- - 1.2 Technologie concernant l'API
- - 1.3 Technologie concernant le frontoffice
- - 1.4 Technologie concernant le cloud
- - 1.5 Technologie concernant l'espace de travail
- ## 2 Base de données
- - 2.0 Choix et description des entitées
- - 2.1 UML
- - - 2.1.0 MLD
- - - 2.1.1 MPD
- ## 3 BackOffice
- - 3.0 Index.js / secureSSL.js / package.json / .env.*
- - 3.1 bin
- - 3.2 Models
- - 3.3 Fixtures
- - 3.4 Controllers
- - 3.5 CRUD
- - 3.6 Utils
- - 3.7 Routes
- - 3.8 node_modules
- ## 4 FrontOffice
- - 4.0 Views
- - 4.1 Public
- ## 5 API
- - 5.0 Controller
- - 5.1 Route

___

# 1 Technologies séléctionnées pour le développement et la mise en production du projet

## 1.0 Technologie concernant la base de données

Pour la base de donnée j'ai choisis ***PostgreSQL***, notre ancien backoffice fonctionnait sur la même technologie il était donc plus simple de la conserver pour faire la migration de technologie (passage de Symfony vers Express).

***[PostgreSQL](https://www.postgresql.org/)***

## 1.1 Technologie concernant le backoffice

Pour le backoffice, j'ai donc décidé de faire la migration de Symfony vers Express. Ce dernier étant plus simple à développer, déployer et maintenir pour une application de petite envergure. La second raison est que j'ai développé un coup de coeur pour JS avec le temps.
Pour gérer le contenu des requêtes entre le front et le back j'ai utilisé les libraires "*cookie-parser*", "*body-parser*" et "*express-fileupload*".

***[Express](https://expressjs.com/fr/)***

## 1.2 Technologie concernant l'API

L'API repause sur la gestions des routes via Express et la librairie "*cors*" pour le partage de ressource cross-origin.
Pour tester l'API durant son développement j'ai utilisé Postman.

***[CORS](https://developer.mozilla.org/fr/docs/Glossary/CORS)***

***[Postman](https://www.postman.com/)***

## 1.3 Technologie concernant le frontoffice

Pour le front j'ai choisis comme moteur de rendu "*Twig*" et comme librairie de rendu "*Bootstrap*". 

## 1.4 Technologie concernant le cloud

Pour l'hôte distant je suis resté sur ce que nous utilisions déjà auparavant "*DigitalOcean*"

## 1.5 Technologie concernant l'espace de travail

Mon environnement de travail est basé sur "*PopOS*" qui est une version LINUX basée sur Ubuntu. Pour visualiser et modifier mon code j'utilise l'IDE "*VScode*" avec pour principal extension : 
- ESlint
- GitHub Pull Requests
- HTMLHint
- Live Sass Compiler
- Remote - SSH
- Twig
- Tabnine AI Autocomplete

Pour installer et manager les dépendances du projet j'utilise "*NPM*". Pour faire fonctionner le projet j'utilise "*Node*", et "*Nodemon*" pour la version de développement.

# 2 Base de données

## 2.0 Choix et description des entitées

