var RatRaceNFT = artifacts.require("./RatRaceNFT.sol");

module.exports = function (deployer) {
  //Si on veut mettre des addresses directement via le contructeur c'est ici que ça va se faire
  deployer.deploy(
    RatRaceNFT,
    "ipfs://QmZmSxYD77kYeFNi5FUB8qd6J6rUEZqieGATAbpigfqLqK/",
    [
      "0xb55bF36f0627C878573e5C5B7dd010EE2234AAd2",
      "0x00e075882d414fc1eD737444c8Deef120221F906",
    ],
    [50, 50]
  );
};
