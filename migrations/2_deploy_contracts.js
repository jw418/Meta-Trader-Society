var RatRaceNFT = artifacts.require("./RatRaceNFT.sol");

module.exports = function (deployer) {
  //Si on veut mettre des addresses directement via le contructeur c'est ici que ça va se faire
  deployer.deploy(
    RatRaceNFT,
    "ipfs://QmZmSxYD77kYeFNi5FUB8qd6J6rUEZqieGATAbpigfqLqK/"
  );
};
