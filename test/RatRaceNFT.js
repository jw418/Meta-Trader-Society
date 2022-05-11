const RatRaceNFT = artifacts.require("./RatRaceNFT.sol");
const {  BN, expectRevert, expectEvent, ether,} = require("@openzeppelin/test-helpers");
const { expect } = require("chai");
const constants = require("@openzeppelin/test-helpers/src/constants");

contract("RatRaceNFT", function (accounts) {
  const owner = accounts[0];
  const user1 = accounts[1];
  const user2 = accounts[2];

  beforeEach(async function () {
    this.RatRaceNFTInstance = await RatRaceNFT.new({ from: owner });
  });

  //
  it("max_supply must be equal to 3333", async function () {
    const maxSupply = await this.RatRaceNFTInstance.max_supply();
    await expect(maxSupply).to.be.bignumber.equal("3333", "max_supply is not 3333");
  });

  it("max_mint_allowed must be equal to 3", async function () {
    const maxMintAllowed = await this.RatRaceNFTInstance.max_mint_allowed();
    await expect(maxMintAllowed).to.be.bignumber.equal("3", "max_mint_allowed supply is not 3");
  });

  it("priceSale must be equal to 1 ether", async function () {
    const priceSale = await this.RatRaceNFTInstance.priceSale();
    await expect(priceSale).to.be.bignumber.equal(ether("1"),"priceSale is not equal to 1 ether");
  });

    it('mintOpen must be true', async function () {
        const mintOpen = await this.RatRaceNFTInstance.mintOpen();        
        await expect(mintOpen).to.be.equal(true, "MintOpen is not true");
    });


    it('nftBalance of owner must be equal to 0', async function () {
        const nftBalance = await this.RatRaceNFTInstance.nftBalance(owner);        
        await expect(nftBalance).to.be.bignumber.equal('0', "nftBalance is not 0");
    });

    it('nftBalance of user1 must be equal to 0', async function () {
        const nftBalance = await this.RatRaceNFTInstance.nftBalance(user1);
        await expect(nftBalance).to.be.bignumber.equal('0', "nftBalance is not 0");
    });

    it('nftBalance of user2 must be equal to 0', async function () {
        const nftBalance = await this.RatRaceNFTInstance.nftBalance(user2);        
        await expect(nftBalance).to.be.bignumber.equal('0', "nftBalance is not 0");
    });

    it('name must be RatRace', async function () {
        const name = await this.RatRaceNFTInstance.name();                
        await expect(name).to.be.equal('RatRace', "the name is not RatRace");
    });

    it('symbole must be RAT', async function () {
        const symbol = await this.RatRaceNFTInstance.symbol();                
        await expect(symbol).to.be.equal('RAT', "the symbol is not RAT");
    });

    it('totalSupply must be equal to 0', async function () {
        const totalSupply = await this.RatRaceNFTInstance.totalSupply();                
        await expect(totalSupply).to.be.bignumber.equal('0', "the totalSupply is not 0");
    });

    it('totalShares must be equal to 100', async function () {
        const totalShares = await this.RatRaceNFTInstance.totalShares();                
        await expect(totalShares).to.be.bignumber.equal('100', "the totalShares is not 100");
    });

    it('baseURI must be an empty string', async function () {
        const baseURI = await this.RatRaceNFTInstance.baseURI();                
        await expect(baseURI).to.be.equal('', "the baseURI is not an empty string");
    });


    it('baseUri must be change', async function () {
        const NewUri = 'newuri.test';
        await this.RatRaceNFTInstance.setBaseUri(NewUri);
        const baseURI = await this.RatRaceNFTInstance.baseURI();             
        await expect(baseURI).to.be.equal('newuri.test', "the baseUri is not correctly changed");
    });



})