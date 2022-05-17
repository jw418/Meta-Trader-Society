Dans ce document nous allons listé les attaques les plus commune et les mesures prises pour éviter que nos smart contract y soient vulnérable.
Nous nous baserons sur ceux référencer par consensys https://consensys.github.io/smart-contract-best-practices/attacks/

Reentrancy => {
Nous avons placé les modifications des variables avant les transactions (withdraw, mint)
}
Oracle Manipulation => {
Cette attaque ne nous concerne pas car nous n'utilisont pas d'orable
}
Frontrunning => {
Ne concerne pas notre sécteur
}
Timestamp Dependence => {
Cette attaque ne nous concerne pas car nous n'utilisont pas de block.timestamp
}
Insecure Arithmetic
Denial of Service => {

}
Griefing
Force Feeding
