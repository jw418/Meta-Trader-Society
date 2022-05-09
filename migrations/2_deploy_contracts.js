// var MetaTraderSociety = artifacts.require("./MetaTraderSociety.sol");
var ContractNFT = artifacts.require("./RatRaceNFT.sol");


module.exports = function(deployer) {
  // deployer.deploy(MetaTraderSociety);
  deployer.deploy(ContractNFT);
};
