const RatRaceNFT = artifacts.require("./RatRaceNFT.sol");
const { BN, expectRevert, expectEvent, ether } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');
const constants = require('@openzeppelin/test-helpers/src/constants');

contract('RatRaceNFT', function (accounts) {
    const owner = accounts[0];
    const user1 = accounts[1];
    const user2 = accounts[2];

    beforeEach(async function () {
        this.RatRaceNFTInstance = await RatRaceNFT.new({ from: owner });
        
    });

     // 
     it('max_supply must be equal to 3333', async function () {
        const maxSupply = await this.RatRaceNFTInstance.max_supply();                
        await expect(maxSupply).to.be.bignumber.equal('3333', "max_supply is not 3333");
    });

    it('max_mint_allowed must be equal to 3', async function () {
        const maxMintAllowed = await this.RatRaceNFTInstance.max_mint_allowed();                
        await expect(maxMintAllowed).to.be.bignumber.equal('3', "max_mint_allowed supply is not 3");
    });

    it('priceSale must be equal to 1 ether', async function () {
        const priceSale = await this.RatRaceNFTInstance.priceSale();        
        await expect(priceSale).to.be.bignumber.equal(ether('1') , "priceSale is not equal to 1 ether");
    });

    it('mintOpen must be true', async function () {
        const mintOpen = await this.RatRaceNFTInstance.mintOpen();        
        await expect(mintOpen).to.be.equal(true, "MintOpen is not true");
    });

    it('nftBalance of owner must be 0', async function () {
        const nftBalance = await this.RatRaceNFTInstance.nftBalance();
        console.log(nftBalance);
        await expect(nftBalance).to.be.equal('0', "nftBalance is not true");
    });

    it('name must be RatRace', async function () {
        const name = await this.RatRaceNFTInstance.name();                
        await expect(name).to.be.equal('RatRace', "the name is not RatRace");
    });
})