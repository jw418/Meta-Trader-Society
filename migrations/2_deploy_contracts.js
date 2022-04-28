var MetaTraderSociety = artifacts.require("./MetaTraderSociety.sol");

module.exports = function(deployer) {
  deployer.deploy(MetaTraderSociety);
};
