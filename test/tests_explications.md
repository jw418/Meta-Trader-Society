Explication de nos tests :

Contract RatRaceNFT :
Test des variables :
Test si toutes les variables déclaraient dans notre contract sont correct.
Test contructor :
Test si les valeurs entrées lors du déploiement du smart contract étaient correct.
Change value :
Test si les valeurs sont bien changées après l'utilisation des fonctions set
Test mint :
Test de la fonction de mint, de toutes les possibilités (1 mint, 2 mints, 3 mints, 3+1 mint) les cas ou la somme n'est pas assez élevé.
Only owner :
On vérifie que seulement l'owner peut appeler les fonctions OnlyOwner.
Test release :
On vérifie que la fonction release de payement splitter est bien accessible depuis notre contract NFT et que les adresses peuvent bien retirer la somme qui leur est allouée on teste aussi si cette fonction est accessible uniquement par un membre de la team.
TokenURI :
Test si on arrive bien obtenir l'URI d'un token spécifique, et qu'on obtient rien si le token n'existe pas.

Contract PayementSplitter :
On test uniquement si l'élément qu'on a ajouter dans le contract fonctionne, en l'ocurrance l'ajout d'un modifier onlyTeam à la fonction release.
