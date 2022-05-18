# Avoiding common attacks
Dans ce document nous allons listé les attaques les plus communes et les mesures prises pour éviter que nos smart contract y soient vulnérables.
Nous nous baserons sur ceux référencer par consensys https://consensys.github.io/smart-contract-best-practices/attacks/
 
## Reentrancy 
Nous avons placé les modifications des variables avant les transactions (withdraw, mint)
## Oracle Manipulation 
Cette attaque ne nous concerne pas car nous n'utilisons pas d'oracle
## Frontrunning 
Ne concerne pas notre secteur
## Timestamp Dependence 
Cette attaque ne nous concerne pas car nous n'utilisons pas de block.timestamp
## Denial of Service 
On n’utilise pas de fonction qui renvoie des eth, nous sommes pas concernés par cette attaque
Ou de fonction qui peuvent causer un gas limit
## Insecure Arithmetic
Après vérification, il nous semble qu'aucune valeur ne peut dépasser la valeur maximale pour un uint, l'incrimination de nos variables se fait qu'avec des faibles valeurs, aucune de nos variables ne peut être décrémenter.
## Griefing
Pour ce type d'attaque, les fonctions appelées sont soit issues d'oppenzeplin  ou limitées à une liste restreinte d'adresses de confiance.
## Force Feeding
Recevoir des ethers de force ne nous pose pas de problèmes de comptabilité interne