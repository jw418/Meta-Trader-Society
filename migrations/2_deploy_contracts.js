var RatRaceNFT = artifacts.require("./RatRaceNFT.sol");

module.exports = function (deployer) {
  //Si on veut mettre des addresses directement via le contructeur c'est ici que ça va se faire
  deployer.deploy(
    RatRaceNFT,
    "ipfs://QmZmSxYD77kYeFNi5FUB8qd6J6rUEZqieGATAbpigfqLqK/",
    [
      "0xde28322100395F0aaFaAb232993cF9ef14334328",
      "0x9A09c80fccede9b53b8125c36832e4e8354825b3",
    ],
    [50, 50]
  );
};
