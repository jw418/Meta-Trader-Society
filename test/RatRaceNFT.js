const RatRaceNFT = artifacts.require("./RatRaceNFT.sol");
const {
  BN,
  expectRevert,
  expectEvent,
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
    this.RatRaceNFTInstance = await RatRaceNFT.new("URI", { from: owner });
  });

  //--Test deja fait
  //Supply  = 3333 V
  // Max Mint = 3 V
  // Price Sale = 1 V
  // mintOpen = true V
  // NFTBalance = 0 V
  // NFTBalance of all users = 0 V
  // Name =RatRace V
  // Symbol = RAT V
  // TotalSupply = 0 V
  // totalShare = 100 V
  // baseURI = "" V
  // baseURI mustChange V
  // priceSale Change V
  // Max mint change V
  // Mint 1 token V
  // Mint 2 token V
  // Mint 3 token V
  // Fail to mint 4 Token V
  // Fail to ming 3 + 1

  //--Tristan
  // test mint (Test URI, test max supply)
  // release
  // test share for each address

  //--Julien

  //---------Ce qu'on doit faire
  //Tester les fonctions only owner
  //Refuser le mint quand le nombre est trop élevé
  //Tester tous les requires
  //Tester les events
  //Variable avant après changemenet
  //Tester les sucesion d'event (mint 1 puis re mint 1)

  //Numéroter les tests ?

  it("max_supply must be equal to 3333", async function () {
    const maxSupply = await this.RatRaceNFTInstance.max_supply();
    await expect(maxSupply).to.be.bignumber.equal(
      "3333",
      "max_supply is not 3333"
    );
  });

  it("max_mint_allowed must be equal to 3", async function () {
    const maxMintAllowed = await this.RatRaceNFTInstance.max_mint_allowed();
    await expect(maxMintAllowed).to.be.bignumber.equal(
      "3",
      "max_mint_allowed supply is not 3"
    );
  });

  it("priceSale must be equal to 1 ether", async function () {
    const priceSale = await this.RatRaceNFTInstance.priceSale();
    await expect(priceSale).to.be.bignumber.equal(
      ether("1"),
      "priceSale is not equal to 1 ether"
    );
  });

  it("mintOpen must be true", async function () {
    const mintOpen = await this.RatRaceNFTInstance.mintOpen();
    await expect(mintOpen).to.be.equal(true, "MintOpen is not true");
  });

  it("nftBalance of owner must be equal to 0", async function () {
    const nftBalance = await this.RatRaceNFTInstance.nftBalance(owner);
    await expect(nftBalance).to.be.bignumber.equal("0", "nftBalance is not 0");
  });

  it("nftBalance of user1 must be equal to 0", async function () {
    const nftBalance = await this.RatRaceNFTInstance.nftBalance(user1);
    await expect(nftBalance).to.be.bignumber.equal("0", "nftBalance is not 0");
  });

  it("nftBalance of user2 must be equal to 0", async function () {
    const nftBalance = await this.RatRaceNFTInstance.nftBalance(user2);
    await expect(nftBalance).to.be.bignumber.equal("0", "nftBalance is not 0");
  });

  it("name must be RatRace", async function () {
    const name = await this.RatRaceNFTInstance.name();
    await expect(name).to.be.equal("RatRace", "the name is not RatRace");
  });

  it("symbole must be RAT", async function () {
    const symbol = await this.RatRaceNFTInstance.symbol();
    await expect(symbol).to.be.equal("RAT", "the symbol is not RAT");
  });

  it("totalSupply must be equal to 0", async function () {
    const totalSupply = await this.RatRaceNFTInstance.totalSupply();
    await expect(totalSupply).to.be.bignumber.equal(
      "0",
      "the totalSupply is not 0"
    );
  });

  it("totalShares must be equal to 100", async function () {
    const totalShares = await this.RatRaceNFTInstance.totalShares();
    await expect(totalShares).to.be.bignumber.equal(
      "100",
      "the totalShares is not 100"
    );
  });

  it("baseURI must be an empty string", async function () {
    const baseURI = await this.RatRaceNFTInstance.baseURI();
    await expect(baseURI).to.be.equal(
      "URI",
      "the baseURI is not an empty string"
    );
  });

  it("baseUri must be change", async function () {
    const NewUri = "newuri.test";
    await this.RatRaceNFTInstance.setBaseUri(NewUri);
    const baseURI = await this.RatRaceNFTInstance.baseURI();
    await expect(baseURI).to.be.equal(
      "newuri.test",
      "the baseUri is not correctly changed"
    );
  });

  it("priceSale will be changed", async function () {
    await this.RatRaceNFTInstance.changePriceSale(ether("2"));
    const newPriceSale = await this.RatRaceNFTInstance.priceSale();
    await expect(newPriceSale).to.be.bignumber.equal(
      ether("2"),
      "priceSale is not equal to 1 ether"
    );
  });

  context("test mint", () => {
    it("max mint will be changed", async function () {
      await this.RatRaceNFTInstance.changeMaxMintAllowed("5");
      const newMAxMintAllowed =
        await this.RatRaceNFTInstance.max_mint_allowed();
      await expect(newMAxMintAllowed).to.be.bignumber.equal("5");
    });

    it("will mint 1 new token", async function () {
      await this.RatRaceNFTInstance.mintNFT("1", {
        from: user1,
        value: reelAmount,
      });
      const balance = await this.RatRaceNFTInstance.nftBalance(user1);
      const totalSupply = await this.RatRaceNFTInstance.totalSupply();
      await expect(balance).to.be.bignumber.equal("1");
      await expect(totalSupply).to.be.bignumber.equal("1");
    });

    it("will mint 2 new token", async function () {
      await this.RatRaceNFTInstance.mintNFT("2", {
        from: user1,
        value: 2 * reelAmount,
      });
      const balance = await this.RatRaceNFTInstance.nftBalance(user1);
      const totalSupply = await this.RatRaceNFTInstance.totalSupply();
      await expect(balance).to.be.bignumber.equal("2");
      await expect(totalSupply).to.be.bignumber.equal("2");
    });

    it("will mint 3 new token", async function () {
      await this.RatRaceNFTInstance.mintNFT("3", {
        from: user1,
        value: 3 * reelAmount,
      });
      const balance = await this.RatRaceNFTInstance.nftBalance(user1);
      const totalSupply = await this.RatRaceNFTInstance.totalSupply();
      await expect(balance).to.be.bignumber.equal("3");
      await expect(totalSupply).to.be.bignumber.equal("3");
    });

    it("will fail to mint 4 new token", async function () {
      await expectRevert(
        this.RatRaceNFTInstance.mintNFT("4", {
          from: user1,
          value: 4 * reelAmount,
        }),
        "You can mint more NFT"
      );
    });

    it("will fail to mint 3 + 1", async function () {
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

  context("test release", () => {
    it("should release", async function () {
      await send.ether(owner, this.RatRaceNFTInstance.address, reelAmount);
      //Problème on ne peut pas test pour le moment car les addresses sont définit en dur dans le code
      await expect(
        await this.RatRaceNFTInstance.isTeam(
          "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"
        )
      ).to.be.equal(true);
    });
  });
});
