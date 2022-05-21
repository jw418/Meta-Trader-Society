# Explication de nos tests :test_tube:

## Contract RatRaceNFT :

### Test des variables :

Test si toutes les variables déclarées dans notre contrat sont correctes.

### Test contructor :

Test si les valeurs entrées lors du déploiement du smart contract étaient correctes.

### Test StateMint :

Test des fonctions de changement d'état, si les states changent bien après l'utilisation de ces fonctions

### Change value :

Test si les valeurs sont bien changées après l'utilisation des fonctions set

### Test mint :

Test de la fonction de mint, de toutes les possibilités (1 mint, 2 mints, 3 mints, 3+1 mint) les cas où la somme n'est pas assez élevée.

### Test gift :

On vérifie que la fonction gift fonctionne bien et qu'on peut accèder à cette fonction que si on est dans l'état premint et que la limite de gift n'a pas été dépassée

### Only owner :

On vérifie que seulement l'owner peut appeler les fonctions OnlyOwner.

### Test release :

On vérifie que la fonction release de payement splitter est bien accessible depuis notre contrat NFT et que les adresses peuvent bien retirer la somme qui leur est allouée on teste aussi si cette fonction est accessible uniquement par un membre de la team.

### TokenURI :

Test si on arrive à bien obtenir l'URI d'un token spécifique, et qu'on obtient rien si le token n'existe pas.

### Test events :

On vérifie que les fonctions émettent bien des évènements.

## Contract PayementSplitter :

On teste uniquement si l'élément qu'on a ajouté dans le contrat fonctionne, en l'occurrence l'ajout d'un modifier onlyTeam à la fonction release.
