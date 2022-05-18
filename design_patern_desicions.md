Collection nft => Blockchain => erc721 => hashlips => pinate / ipfs
||
Dependencies => Enumerable , Payement splitter, Ownable

Notre projet, a pour but la création d'une collection de 3333 NFT, qui permet l'accès à un robot de traiding.
Nous devions donc dans premier temps choisir la blockchain sur laquelle nos contrats allaient être déployés.
On s'est tourné vers le blockchain Ethereum, car nous voulions pouvoir toucher le plus de monde possible. Nous savions les frais de gas n'allaient pas être un problème pour le public que nous ciblons.
On a choisi de prendre la librairie ERC721 de OpenZepplin car c'est un standard dans la création de NFT.
Nous avions aussi le choix de prendre ERC721A qui est plus efficace en matière de consommation de gas, mais nous manquons de recul sur ce contract.
On a donc opté sur le choix de la sécurité et décidé de prendre un contract qui a déjà fait ses preuves, en l'occurrence ERC721.

Dependencies :
ERC721Enumerable est une librairie d'OpenZepplin, elle nous donne accès à des fonctions de suivi de la totalSupply et l'accès au infos de l'utilisateur qui détient un token selon son index.
PayementSplitter est une librairie d'OpenZepplin, elle nous permet de répartir les fonds à des adresses et un pourcentage définit lors de la création du smart contract.
Ownable gère l'ownership de notre smart contract il nous donne la posiblité de donner accès à certaines fonctions uniquement à l'owner du contract,
mais aussi de changer cette owner.
