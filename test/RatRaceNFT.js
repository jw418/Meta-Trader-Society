const RatRaceNFT = artifacts.require("./RatRaceNFT.sol");
const { BN, expectRevert, expectEvent } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');
const constants = require('@openzeppelin/test-helpers/src/constants');

contract('RatRaceNFT', function (accounts) {
    const owner = accounts[0];
    const user1 = accounts[1];
    const user2 = accounts[2];

    beforeEach(async function () {
        this.RatRaceNFTInstance = await RatRaceNFT.new({ from: owner });
        
    });

     // on vérifie bien que l'etat isRegisterd est bien sur false quand le contrat est deployé
     it('Max_supply must be equal to 3333', async function () {
        const maxSupply = await this.RatRaceNFTInstance.max_supply();        
        await expect(maxSupply).to.be.bignumber.equal('3333', "Max supply is not 3333");
    });
})