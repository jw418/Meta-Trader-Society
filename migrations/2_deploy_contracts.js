var RatRaceNFT = artifacts.require("./RatRaceNFT.sol");

module.exports = function (deployer) {
  //Si on veut mettre des addresses directement via le contructeur c'est ici que ça va se faire
  deployer.deploy(
    RatRaceNFT,
    "ipfs://QmZmSxYD77kYeFNi5FUB8qd6J6rUEZqieGATAbpigfqLqK/",
    [
      "0x4BA1ed62756D0Cb2b2327349adC1E0088Aed513C",
      "0x00e075882d414fc1eD737444c8Deef120221F906",
    ],
    [50, 50]
  );
};
