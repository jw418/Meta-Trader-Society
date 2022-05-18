Dans ce document nous allons listé les attaques les plus commune et les mesures prises pour éviter que nos smart contract y soient vulnérable.
Nous nous baserons sur ceux référencer par consensys https://consensys.github.io/smart-contract-best-practices/attacks/

Reentrancy => {
Nous avons placé les modifications des variables avant les transactions (withdraw, mint)
}
Oracle Manipulation => {
Cette attaque ne nous concerne pas car nous n'utilisont pas d'oracle
}
Frontrunning => {
Ne concerne pas notre sécteur
}
Timestamp Dependence => {
Cette attaque ne nous concerne pas car nous n'utilisont pas de block.timestamp
}
Denial of Service => {
On utilise pas de fonction qui rendre des eth, nous sommes pas concerner par cette attaque
Ou de fonction qui peuvent causer un gas limit
}
Insecure Arithmetic
Griefing
Force Feeding
