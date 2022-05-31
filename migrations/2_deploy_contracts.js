var RatRaceNFT = artifacts.require("./RatRaceNFT.sol");

module.exports = function (deployer) {
  //Si on veut mettre des addresses directement via le contructeur c'est ici que ça va se faire
  deployer.deploy(
    RatRaceNFT,
    "ipfs://QmdV4hue7KhgVkox8YRWXYPv9JKjHWaA18N28uQBW1rCvT/",
    [
      "0xb55bF36f0627C878573e5C5B7dd010EE2234AAd2",
      "0x4BA1ed62756D0Cb2b2327349adC1E0088Aed513C",
    ],
    [50, 50]
  );
};
