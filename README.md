# BeWave ¹ site + API pour application mobile (sans l’application ² )

## But : 
- Mettre en place un BackOffice qui gère le site de la société (forum, souscription
bêta test, ..) + une gestion de l’API qui discutera avec l’application mobile Ios et
Android.

## Résumé
- L’application web est composée d’une base de données basée sur PostgreSQL, d’un
Backend basé sur Express et d’un front basé sur Twig (pour le site). Le tout hébergé sur DigitalOcean.
- Le site et l’application mobile partagent le même backoffice. L’utilisateur qui créé un compte depuis l’application mobile pourra se connecter sur le site avec le même compte et inversement.
- Le site est composé d’une page d’accueil qui annonce les mises à jour à venir et
d’un forum pour mettre en contact les utilisateurs, les bêta testeurs et l’équipe de
développement du projet.
- Le site dispose d’un tableau de bord qui permet aux utilisateurs ayant pour rôle
administrateur, de gérer le contenu du site, le respect des règles du forum, d’accéder à une gestion des utilisateurs et de la base de données.
- La base de données concernée est celle du site et de l’application mobile, c’est bien le backoffice présenté dans ce projet qui mettra à disposition une API pour
l’application mobile. Le tableau de bord administrateur servira donc à gérer aussi
bien le site que le contenu de l’application mobile.


- *¹ BeWave est un projet d’application lancé par deux autres collaborateurs et moi même en août 2021. Aujourd’hui nous sommes neuf collaborateurs. Nous avons décidé en mars de migrer de technologie. J’en profite pour effectuer la migration de Symfony vers Express (seul) et de m’en servir comme projet à vous présenter.*
- *² L’application mobile est développée par mes collaborateurs.*

___
