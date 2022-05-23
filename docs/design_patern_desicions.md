# Design patern desicions 	:bookmark_tabs:
 
## Choix de la Blockchain
 
Notre projet a pour but la création d'une collection de 3333 NFT, qui permet l'accès à un robot de trading.
Nous devions donc dans premier temps choisir la blockchain sur laquelle nos contrats allaient être déployés.
On s'est tourné vers le blockchain Ethereum, car nous voulions pouvoir toucher le plus de monde possible. Nous savions que les frais de gas n'allaient pas être un problème pour le public que nous ciblons.
 
## Choix de l'ERC
 
On a choisi de prendre la librairie ERC721 de OpenZepplin car c'est un standard dans la création de NFT.
Nous avions aussi le choix de prendre ERC721A qui est plus efficace en matière de consommation de gas, mais nous manquons de recul sur ce contract.
On a donc opté sur le choix de la sécurité et décidé de prendre un contrat qui a déjà fait ses preuves, en l'occurrence ERC721.
 
## Dependencies
 
### ERC721Enumerable
 
ERC721Enumerable est une librairie d'OpenZepplin, elle nous donne accès à des fonctions de suivi de la totalSupply et l'accès aux infos de l'utilisateur qui détient un token selon son index.
### PayementSplitter 
 
PayementSplitter  est une librairie d'OpenZepplin, elle nous permet de répartir les fonds à des adresses et un pourcentage défini lors de la création du smart contract.
 
### Ownable
 
Ownable gère l'ownership de notre smart contract, il nous donne la possibilité de donner accès à certaines fonctions uniquement à l'owner du contrat, mais aussi de changer ce owner.
 
## Assemblage des calques et metadata
 
Pour la génération de nos NFT nous avions besoin de gérer différentes configurations de calques  ainsi que la création des métadata.
 
hashlips_art_engine est outil créé spécifiquement pour ça, il permet de gérer facilement différentes configurations de layer, la randomisation de l'assemblage, et la création de métadata, dont le format est compatible avec l'interface d'opensea.

## Stockage des images et des metadata

Pinata et NFT.Storage sont les deux principaux service de stockage décentarlisé, nous avons utilisé Pinata lors du dévloppement de ce projet ( ...cela peut changer) 
