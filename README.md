# Rat Race NFT :rat:

Lancement de la première collection NFTs ART TRADING BOT qui rassemble l'art numérique, la technologie algorithmique prédictive et l'intelligence artificielle appliquée au trading.

![](https://github.com/jw418/Meta-Trader-Society/blob/main/logo.png)

## Présentation du projet

Le ticket d'entrée au Hedge Fund étant réservé aux plus fortunés à ce jour, Meta Trader Society(MTS) a pour but d'en démocratiser l’accès via la création d'un hedge fund collaboratif (DAO), où les trade seront effectués par bot de trading, crée grâce à l'intelligence artificielle.
Dans le but de créer cette DAO, nous avons besoin d'établir notre communauté et pour ce faire nous allons créer trois séries de NFT.

Ceci est le repo github de notre première série 

Libérez-vous de la Rat Race! Minter un Rat!! En plus de l'œuvre désigner par (Nom de l'auteur), cette première série vous donnera des avantages pour les étapes suivantes de notre roadmap mais vous donnera également accès à un bot de trading (insérer les specs du bot ici(AI,MT4, etc..)).

Pour plus d'info consultez notre site web : https://mtsalyra.herokuapp.com/

## Livrables Certification :file_folder:

Le README du Smart Contract RatRaceNFT.sol :
https://github.com/jw418/Meta-Trader-Society/blob/main/docs/RatRaceNFTDoc.md

Le README du Smart Contract PayementSpliter.sol :
https://github.com/jw418/Meta-Trader-Society/blob/main/docs/PayementSplitterDoc.md

Le README du Smart Contract TestTxOrigin.sol :
https://github.com/jw418/Meta-Trader-Society/blob/main/docs/TestTxOriginDoc.md

Le document avoiding_common_atacks.md qui éxplique quelles mesures ont été prises pour éviter les failles de sécurité:
https://github.com/jw418/Meta-Trader-Society/blob/main/docs/avoiding_common_attacks.md

le document design_pattern_desicions.md qui éxplique les modèles de conception choisis et la raison du choix:
https://github.com/jw418/Meta-Trader-Society/blob/main/docs/design_patern_desicions.md

Le document deployed_addresses.md:
https://github.com/jw418/Meta-Trader-Society/blob/main/docs/deployed_addresses.md

Le document tests_explications.md:
https://github.com/jw418/Meta-Trader-Society/blob/main/test/tests_explications.md
## Installation 🛠️

Vous pouvez copiez notre repo avec la commande : 
```sh
git clone https://github.com/jw418/Meta-Trader-Society.git
```

Pour installer les dépendances allez à la racine du fichier et utilisez les commandes suivante :
```sh
npm install
cd client
npm install
```

Pensez à modifier le fichier truffle-config.js selon le réseau choisi.
https://trufflesuite.com/docs/truffle/reference/configuration/

Pensez à créer et à configurer votre fichier .ENV à la racine et l'ajouter à votre .gitignore.

Pour l’assemblage des calques et la créations des metadata nous avons 
utiliser Hashlips_Art_Engine.
Le lien de leur repo : https://github.com/HashLips/hashlips_art_engine

## Usage

### Front
Pour voir le front en local:
```sh
 cd client
 npm run start
```
Sinon directement sur: https://mtsalyra.herokuapp.com/

#### Importer dans metamask

Rendez-vous sur votre compte metamask et cilquez sur "importer des jetons".
![](https://github.com/jw418/Meta-Trader-Society/blob/main/CaptureMetamask.PNG.png)

Renseignez L'addresse du contrat(ROPSTEN Testnet) et mettre 0 pour "Token Decimal".
```sh
0x438505946e9F4b1dFE7Bd83cf353b5B5505651F3
```
![](https://github.com/jw418/Meta-Trader-Society/blob/main/addToken.PNG)

Voila, vous pouvez visualiser le nombre de NFT que vous possédez.

![](https://github.com/jw418/Meta-Trader-Society/blob/main/ratToken.PNG)


### Tests :test_tube:

Vous pouvez exécuter les scripts de tests de nos smart contracts:

Pour RatRaceNFT.sol tapez la commande:
```sh
truffle  test test/RatRaceNFT.js
```
Pour PayementSpliter.sol tapez la commande:
```sh
 truffle  test test/PayementSpliter.js
```