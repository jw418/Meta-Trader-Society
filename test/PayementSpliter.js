const PayementSpliter = artifacts.require("./PayementSpliter.sol");
const { BN, expectRevert, expectEvent } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');
const constants = require('@openzeppelin/test-helpers/src/constants');


contract('ContractNFT', function (accounts) {
    const owner = accounts[0];
    const user1 = accounts[1];
    const user2 = accounts[2];

    beforeEach(async function () {
        this.PayementSpliterInstance = await PayementSpliter.new({ from: owner });
        
    });

}