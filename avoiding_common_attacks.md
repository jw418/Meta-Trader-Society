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
On utilise pas de fonction qui rendre des eth, nous sommes pas concernés par cette attaque
Ou de fonction qui peuvent causer un gas limit
## Insecure Arithmetic 
## Griefing
## Force Feeding
