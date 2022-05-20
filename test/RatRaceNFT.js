const RatRaceNFT = artifacts.require("./RatRaceNFT.sol");
const {  BN,
  expectRevert,
  expectEvent,
  balance,
  send,
  ether,
} = require("@openzeppelin/test-helpers");
const { expect } = require("chai");
const constants = require("@openzeppelin/test-helpers/src/constants");

contract("RatRaceNFT", function (accounts) {
  const owner = accounts[0];
  const user1 = accounts[1];
  const user2 = accounts[2];

  const team = [accounts[2], accounts[3], accounts[4]];
  const share = [45, 45, 10];

  const reelAmount = ether("1");

  beforeEach(async function () {
    this.RatRaceNFTInstance = await RatRaceNFT.new("URI", team, share, {
      from: owner,
    });
  });

  //--Tristan
  // test max supply

  //--Julien

  //---------Ce qu'on doit faire
  //Tester les fonctions only owner V
  //Refuser le mint quand le nombre est trop élevé V
  //Tester tous les requires V
  //Tester les events (pour l'instant on a pas d'event)
  //Variable avant après changemenet
  //Tester les sucesion d'event (mint 1 puis re mint 1)

  context("variable test", () => {
    it("1 : max_supply must be equal to 3333", async function () {
      const maxSupply = await this.RatRaceNFTInstance.max_supply();
      await expect(maxSupply).to.be.bignumber.equal(
        "3333",
        "max_supply is not 3333"
      );
    });

    it("2 : max_mint_allowed must be equal to 3", async function () {
      const maxMintAllowed = await this.RatRaceNFTInstance.max_mint_allowed();
      await expect(maxMintAllowed).to.be.bignumber.equal(
        "3",
        "max_mint_allowed supply is not 3"
      );
    });

    it("3 : priceMin must be equal to 1 ether", async function () {
      const priceMin = await this.RatRaceNFTInstance.priceMin();
      await expect(priceMin).to.be.bignumber.equal(
        ether("1"),
        "priceMin is not equal to 1 ether"
      );
    });
    
    it("3 Bis : priceMax must be equal to 5 ether", async function () {
      const priceMax = await this.RatRaceNFTInstance.priceMax();
      await expect(priceMax).to.be.bignumber.equal(
        ether("5"),
        "priceMax is not equal to 5 ether"
      );
    });

    it("3 Ter: priceSale must be equal to 1 ether", async function () {
      const priceSale = await this.RatRaceNFTInstance.priceSale();
      await expect(priceSale).to.be.bignumber.equal(
        ether("1"),
        "priceSale is not equal to 1 ether"
      );
    });

    it("4 : mintOpen must be true", async function () {
      const mintOpen = await this.RatRaceNFTInstance.mintOpen();
      await expect(mintOpen).to.be.equal(true, "MintOpen is not true");
    });

    it("5 : nftBalance of owner must be equal to 0", async function () {
      const nftBalance = await this.RatRaceNFTInstance.nftBalance(owner);
      await expect(nftBalance).to.be.bignumber.equal(
        "0",
        "nftBalance is not 0"
      );
    });

    it("6 : nftBalance of user1 must be equal to 0", async function () {
      const nftBalance = await this.RatRaceNFTInstance.nftBalance(user1);
      await expect(nftBalance).to.be.bignumber.equal(
        "0",
        "nftBalance is not 0"
      );
    });

    it("7 : nftBalance of user2 must be equal to 0", async function () {
      const nftBalance = await this.RatRaceNFTInstance.nftBalance(user2);
      await expect(nftBalance).to.be.bignumber.equal(
        "0",
        "nftBalance is not 0"
      );
    });
  });

  context("test contructor", () => {
    it("8 : name must be RatRace", async function () {
      const name = await this.RatRaceNFTInstance.name();
      await expect(name).to.be.equal("RatRace", "the name is not RatRace");
    });

    it("9 : symbole must be RAT", async function () {
      const symbol = await this.RatRaceNFTInstance.symbol();
      await expect(symbol).to.be.equal("RAT", "the symbol is not RAT");
    });

    it("10 : totalSupply must be equal to 0", async function () {
      const totalSupply = await this.RatRaceNFTInstance.totalSupply();
      await expect(totalSupply).to.be.bignumber.equal(
        "0",
        "the totalSupply is not 0"
      );
    });

    it("11 : totalShares must be equal to 100", async function () {
      const totalShares = await this.RatRaceNFTInstance.totalShares();
      await expect(totalShares).to.be.bignumber.equal(
        "100",
        "the totalShares is not 100"
      );
    });

    it("12 : baseURI must be an empty string", async function () {
      const baseURI = await this.RatRaceNFTInstance.baseURI();
      await expect(baseURI).to.be.equal(
        "URI",
        "the baseURI is not an empty string"
      );
    });
  });

  context("change value", () => {
    it("13 : baseUri must be change", async function () {
      const NewUri = "newuri.test";
      await this.RatRaceNFTInstance.setBaseUri(NewUri);
      const baseURI = await this.RatRaceNFTInstance.baseURI();
      await expect(baseURI).to.be.equal(
        "newuri.test",
        "the baseUri is not correctly changed"
      );
    });

   
    it("14 : Should have a revert: this price is too low", async function () {
      await this.RatRaceNFTInstance.changePriceSale(ether("2"));
      const newPriceSale = await this.RatRaceNFTInstance.priceSale();
      await expect(newPriceSale).to.be.bignumber.equal(
        ether("2"),
        "priceSale is not equal to 1 ether"
      );
    });
    
    it("14 : Should Have a revert: this price is above the limit", async function () {
      await this.RatRaceNFTInstance.changePriceSale(ether("2"));
      const newPriceSale = await this.RatRaceNFTInstance.priceSale();
      await expect(newPriceSale).to.be.bignumber.equal(
        ether("2"),
        "priceSale is not equal to 1 ether"
      );
    });
      
    it("14 : priceSale will be changed", async function () {
      await this.RatRaceNFTInstance.changePriceSale(ether("2"));
      const newPriceSale = await this.RatRaceNFTInstance.priceSale();
      await expect(newPriceSale).to.be.bignumber.equal(
        ether("2"),
        "priceSale is not equal to 1 ether"
      );
    });

    it("15 : max mint will be changed", async function () {
      await this.RatRaceNFTInstance.changeMaxMintAllowed("5");
      const newMAxMintAllowed =
        await this.RatRaceNFTInstance.max_mint_allowed();
      await expect(newMAxMintAllowed).to.be.bignumber.equal("5");
    });
  });

  context("test mint", () => {
    it("16 : will fail to mint not enought funds", async function () {
      await expectRevert(
        this.RatRaceNFTInstance.mintNFT("1", {
          from: user1,
          value: ether("0.5"),
        }),
        "Not enought funds"
      );
    });

    it("17 : will mint 1 new token", async function () {
      await this.RatRaceNFTInstance.mintNFT("1", {
        from: user1,
        value: reelAmount,
      });
      const balance = await this.RatRaceNFTInstance.nftBalance(user1);
      const totalSupply = await this.RatRaceNFTInstance.totalSupply();
      await expect(balance).to.be.bignumber.equal("1");
      await expect(totalSupply).to.be.bignumber.equal("1");
    });

    it("18 : will mint 2 new token", async function () {
      await this.RatRaceNFTInstance.mintNFT("2", {
        from: user1,
        value: 2 * reelAmount,
      });
      const balance = await this.RatRaceNFTInstance.nftBalance(user1);
      const totalSupply = await this.RatRaceNFTInstance.totalSupply();
      await expect(balance).to.be.bignumber.equal("2");
      await expect(totalSupply).to.be.bignumber.equal("2");
    });

    it("19 : will mint 3 new token", async function () {
      await this.RatRaceNFTInstance.mintNFT("3", {
        from: user1,
        value: 3 * reelAmount,
      });
      const balance = await this.RatRaceNFTInstance.nftBalance(user1);
      const totalSupply = await this.RatRaceNFTInstance.totalSupply();
      await expect(balance).to.be.bignumber.equal("3");
      await expect(totalSupply).to.be.bignumber.equal("3");
    });

    it("20 : will fail to mint 4 new token", async function () {
      await expectRevert(
        this.RatRaceNFTInstance.mintNFT("4", {
          from: user1,
          value: 4 * reelAmount,
        }),
        "You can mint more NFT"
      );
    });

    it("21 : will fail to mint 3 + 1", async function () {
      await this.RatRaceNFTInstance.mintNFT("3", {
        from: user1,
        value: 3 * reelAmount,
      });
      await expectRevert(
        this.RatRaceNFTInstance.mintNFT("1", {
          from: user1,
          value: 1 * reelAmount,
        }),
        "Too much mint"
      );
    });
  });

  context("only owner", () => {
    it("22 : Should revert priceSale", async function () {
      await expectRevert(
        this.RatRaceNFTInstance.changePriceSale(ether("2"), {
          from: accounts[1],
        }),
        "Ownable: caller is not the owner"
      );
    });

    it("23 : Should revert changeMaxMint", async function () {
      await expectRevert(
        this.RatRaceNFTInstance.changeMaxMintAllowed("2", {
          from: accounts[1],
        }),
        "Ownable: caller is not the owner"
      );
    });
    it("24 : Should revert setBaseURI", async function () {
      await expectRevert(
        this.RatRaceNFTInstance.setBaseUri("newURI", { from: accounts[1] }),
        "Ownable: caller is not the owner"
      );
    });
  });

  context("test release", () => {
    it("25 : Should release to a member of the team", async function () {
      //Send 1 eth
      await send.ether(owner, this.RatRaceNFTInstance.address, reelAmount);
      await expect(
        await this.RatRaceNFTInstance.isTeam(accounts[2])
      ).to.be.equal(true);
      await expect(
        await this.RatRaceNFTInstance.isTeam(accounts[3])
      ).to.be.equal(true);
      await expect(
        await this.RatRaceNFTInstance.isTeam(accounts[4])
      ).to.be.equal(true);
      //Test first share
      const tracker1 = await balance.tracker(accounts[2]);
      await this.RatRaceNFTInstance.release(accounts[2], {
        from: accounts[3],
      });
      const profit1 = await tracker1.delta();
      await expect(profit1).to.be.bignumber.equal(ether("0.45"));
      //Test second share
      const tracker2 = await balance.tracker(accounts[3]);
      await this.RatRaceNFTInstance.release(accounts[3], {
        from: accounts[2],
      });
      const profit2 = await tracker2.delta();
      await expect(profit2).to.be.bignumber.equal(ether("0.45"));
      //Test third share
      const tracker3 = await balance.tracker(accounts[4]);
      await this.RatRaceNFTInstance.release(accounts[4], {
        from: accounts[3],
      });
      const profit3 = await tracker3.delta();
      await expect(profit3).to.be.bignumber.equal(ether("0.10"));
    });

    it("26 : Shouldn't release", async function () {
      await send.ether(owner, this.RatRaceNFTInstance.address, reelAmount);
      await expectRevert(
        this.RatRaceNFTInstance.release(accounts[2], { from: owner }),
        "not member of the team."
      );
    });
  });

  context("tokenURI", () => {
    it("27 : Shouldn't return tokenId doesn't exist", async function () {
      await expectRevert(
        this.RatRaceNFTInstance.tokenURI("5"),
        "id doesn't exist"
      );
    });

    it("28 : should return tokenId", async function () {
      await this.RatRaceNFTInstance.mintNFT("1", {
        from: user1,
        value: reelAmount,
      });
      let tokenURI = await this.RatRaceNFTInstance.tokenURI("1");
      await expect(tokenURI).to.be.equal("URI1.json");
    });
  });
});
