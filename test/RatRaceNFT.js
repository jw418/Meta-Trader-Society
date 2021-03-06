// Tests pour le Smart contract RatRaceNFT.sol
// import des SC
const RatRaceNFT = artifacts.require(`./RatRaceNFT.sol`);
const TestTxOrigin = artifacts.require(`./TestTxOrigin.sol`);
// import chai/test-helpers
const {
  BN,
  expectRevert,
  expectEvent,
  balance,
  send,
  ether,
} = require(`@openzeppelin/test-helpers`);
const { expect } = require(`chai`);



contract(`RatRaceNFT`, function (accounts) {

  // constant des adresses pour les tests
  const owner = accounts[0];
  const user1 = accounts[1];
  const user2 = accounts[2];
  const tester = accounts[9];

  // pour le constructeur
  const team = [accounts[2], accounts[3], accounts[4]];
  const share = [45, 45, 10];
  
  const reelAmount = ether(`1`);  // pour tester le prix du mint
 
  var testCounter = 0;   // variable qui permet de numéroter nos tests


  // on déploie le contrat avant chaque test
  beforeEach(async function () {
    this.RatRaceNFTInstance = await RatRaceNFT.new(`URI`, team, share, {
      from: owner,
    });
  });


  // on vérifie toutes les variables/constantes de notre contrat 
  context(`###### variable test ######`, () => {
    it(`${testCounter++}: max_supply must be equal to 3333`, async function () {
      const maxSupply = await this.RatRaceNFTInstance.max_supply();
      await expect(maxSupply).to.be.bignumber.equal(
        `3333`,
        `max_supply is not 3333`
      );
    });

    it(`${testCounter++}: giftLimit must be equal to 33`, async function () {
      const maxSupply = await this.RatRaceNFTInstance.giftLimit();
      await expect(maxSupply).to.be.bignumber.equal(
        `33`,
        `giftLimit is not 33`
      );
    });

    it(`${testCounter++}: min_qty_mint_allowed must be equal to 1`, async function () {
      const maxSupply = await this.RatRaceNFTInstance.min_qty_mint_allowed();
      await expect(maxSupply).to.be.bignumber.equal(
        `1`,
        `min_qty_mint_allowed is not 1`
      );
    });

    it(`${testCounter++}: max_qty_mint_allowed must be equal to 6`, async function () {
      const maxSupply = await this.RatRaceNFTInstance.max_qty_mint_allowed();
      await expect(maxSupply).to.be.bignumber.equal(
        `6`,
        `max_qty_mint_allowed is not 6`
      );
    });

    it(`${testCounter++} : max_mint_allowed must be equal to 3`, async function () {
      const maxMintAllowed = await this.RatRaceNFTInstance.max_mint_allowed();
      await expect(maxMintAllowed).to.be.bignumber.equal(
        `3`,
        `max_mint_allowed supply is not 3`
      );
    });

    it(`${testCounter++} : priceMin must be equal to 0.01 ether`, async function () {
      const priceMin = await this.RatRaceNFTInstance.priceMin();
      await expect(priceMin).to.be.bignumber.equal(
        ether(`0.01`),
        `priceMin is not equal to 1 ether`
      );
    });

    it(`${testCounter++} : priceMax must be equal to 5 ether`, async function () {
      const priceMax = await this.RatRaceNFTInstance.priceMax();
      await expect(priceMax).to.be.bignumber.equal(
        ether(`5`),
        `priceMax is not equal to 5 ether`
      );
    });

    it(`${testCounter++}: priceSale must be equal to 1 ether`, async function () {
      const priceSale = await this.RatRaceNFTInstance.priceSale();
      await expect(priceSale).to.be.bignumber.equal(
        ether(`1`),
        `priceSale is not equal to 1 ether`
      );
    });

    it(`${testCounter++}: baseExtension must be equal to ".json"`, async function () {
      const baseExtension = await this.RatRaceNFTInstance.baseExtension();
      await expect(baseExtension).to.be.equal(
        ".json",
        `baseExtension is not equal to ".json"`
      );
    });

    it(`${testCounter++}: balanceOfNftMinted of owner must be equal to 0`, async function () {
      const balanceOfNftMinted =
        await this.RatRaceNFTInstance.balanceOfNftMinted(owner);
      await expect(balanceOfNftMinted).to.be.bignumber.equal(
        `0`,
        `balanceOfNftMinted is not 0`
      );

      it(`${testCounter++}: balanceOfNftMinted of user1 must be equal to 0`, async function () {
        const balanceOfNftMinted =
          await this.RatRaceNFTInstance.balanceOfNftMinted(user1);
        await expect(balanceOfNftMinted).to.be.bignumber.equal(
          `0`,
          `balanceOfNftMinted is not 0`
        );
      });

      it(`${testCounter++}: balanceOfNftMinted of user2 must be equal to 0`, async function () {
        const balanceOfNftMinted =
          await this.RatRaceNFTInstance.balanceOfNftMinted(user2);
        await expect(balanceOfNftMinted).to.be.bignumber.equal(
          `0`,
          `balanceOfNftMinted is not 0`
        );
      });

      it(`${testCounter++}: user2 should be team`, async function () {
        await expect(await this.RatRaceNFTInstance.team(user2)).to.be.equal(
          true
        );
      });

      it(`${testCounter++}: user1 shouldn't be team`, async function () {
        await expect(await this.RatRaceNFTInstance.team(user1)).to.be.equal(
          false
        );
      });
    });

    // les tests pour le constructeur
    context(`###### test contructor ######`, () => {
      it(`${testCounter++}: name must be RatRace`, async function () {
        const name = await this.RatRaceNFTInstance.name();
        await expect(name).to.be.equal(`RatRace`, `the name is not RatRace`);
      });

      it(`${testCounter++}: symbole must be RAT`, async function () {
        const symbol = await this.RatRaceNFTInstance.symbol();
        await expect(symbol).to.be.equal(`RAT`, `the symbol is not RAT`);
      });

      it(`${testCounter++}: totalSupply must be equal to 0`, async function () {
        const totalSupply = await this.RatRaceNFTInstance.totalSupply();
        await expect(totalSupply).to.be.bignumber.equal(
          `0`,
          `the totalSupply is not 0`
        );
      });

      it(`${testCounter++}: totalShares must be equal to 100`, async function () {
        const totalShares = await this.RatRaceNFTInstance.totalShares();
        await expect(totalShares).to.be.bignumber.equal(
          `100`,
          `the totalShares is not 100`
        );
      });

      it(`${testCounter++}: baseURI must be an empty string`, async function () {
        const baseURI = await this.RatRaceNFTInstance.baseURI();
        await expect(baseURI).to.be.equal(
          `URI`,
          `the baseURI is not an empty string`
        );
      });
    });

    // test de enum statemint, on vérifie l'état au déploiement
    // puis que l'état du mint sois correcctement changé
    context(`###### test StateMint ######`, () => {
      it(`${testCounter++}: StateMint should be paused`, async function () {
        const state = await this.RatRaceNFTInstance.StateMint.call();
        await expect(state).to.be.bignumber.equal("0");
      });

      it(`${testCounter++}: StateMint should be to preMint`, async function () {
        await this.RatRaceNFTInstance.setToPremint({ from: owner });
        const state = await this.RatRaceNFTInstance.StateMint.call();
        await expect(state).to.be.bignumber.equal("1");
      });

      it(`${testCounter++}: StateMint should be open`, async function () {
        await this.RatRaceNFTInstance.setMintOpen({ from: owner });
        const state = await this.RatRaceNFTInstance.StateMint.call();
        await expect(state).to.be.bignumber.equal("2");
      });

      it(`${testCounter++}: StateMint should be paused`, async function () {
        await this.RatRaceNFTInstance.setToPremint({ from: owner });
        await this.RatRaceNFTInstance.setMintOpen({ from: owner });
        await this.RatRaceNFTInstance.setMintPaused({ from: owner });
        const state = await this.RatRaceNFTInstance.StateMint.call();
        await expect(state).to.be.bignumber.equal("0");
      });

      it(`${testCounter++}: setMintPaused Should Have a revert: state is already paused`, async function () {
        await expectRevert(
          this.RatRaceNFTInstance.setMintPaused({ from: owner }),
          "Contract already paused"
        );
      });

      it(`${testCounter++}: setToPremint Should Have a revert: mint is open`, async function () {
        await this.RatRaceNFTInstance.setMintOpen({ from: owner });
        await expectRevert(
          this.RatRaceNFTInstance.setToPremint({ from: owner }),
          "Mint already open or finished"
        );
      });
    });

    // on vérifie que les valeurs dans le contrat soit correctement changé
    context(`###### change value ######`, () => {
      it(`${testCounter++}: baseUri must be change`, async function () {
        const NewUri = `newuri.test`;
        await this.RatRaceNFTInstance.setBaseUri(NewUri);
        const baseURI = await this.RatRaceNFTInstance.baseURI();
        await expect(baseURI).to.be.equal(
          `newuri.test`,
          `the baseUri is not correctly changed`
        );
      });

      it(`${testCounter++}: StateMint must be Paused`, async function () {
        const StateMint = await this.RatRaceNFTInstance.StateMint();
        await expect(StateMint).to.be.bignumber.equal(
          "0",
          `StateMint is not Paused`
        );
      });

      it(`${testCounter++}: Should have a revert: this price is too low`, async function () {
        await this.RatRaceNFTInstance.changePriceSale(ether(`2`));
        const newPriceSale = await this.RatRaceNFTInstance.priceSale();
        await expect(newPriceSale).to.be.bignumber.equal(
          ether(`2`),
          `priceSale is not equal to 1 ether`
        );
      });

      it(`${testCounter++}: Should Have a revert: this price is above the limit`, async function () {
        await this.RatRaceNFTInstance.changePriceSale(ether(`2`));
        const newPriceSale = await this.RatRaceNFTInstance.priceSale();
        await expect(newPriceSale).to.be.bignumber.equal(
          ether(`2`),
          `priceSale is not equal to 1 ether`
        );
      });

      it(`${testCounter++}: priceSale will be changed`, async function () {
        await this.RatRaceNFTInstance.changePriceSale(ether(`2`));
        const newPriceSale = await this.RatRaceNFTInstance.priceSale();
        await expect(newPriceSale).to.be.bignumber.equal(
          ether(`2`),
          `priceSale is not equal to 1 ether`
        );
      });

      it(`${testCounter++}: max mint will be changed`, async function () {
        await this.RatRaceNFTInstance.changeMaxMintAllowed(`5`);
        const newMAxMintAllowed =
          await this.RatRaceNFTInstance.max_mint_allowed();
        await expect(newMAxMintAllowed).to.be.bignumber.equal(`5`);
      });
    });
    
    // on test la fonction mintNFT
    context(`###### test mint ######`, () => {

      // pour ce test on déploie un contrat de test (TestTxOrigin.sol) qui apelle la fonction minNFT 
      it(`${testCounter++}: minfNFT() should have a revert:"Contract cannot call this function"`, async function () {
        const addressRat = await this.RatRaceNFTInstance.address;
        await this.RatRaceNFTInstance.setMintOpen({ from: owner });
        const qty = 1;
        this.TestTxOriginInstance = await TestTxOrigin.new({ from: tester });
        await expectRevert(
          this.TestTxOriginInstance.testMint(addressRat, qty, { from: tester }),
          `Contract cannot call this function`
        );
      });

      it(`${testCounter++}: will fail to mint not enought funds`, async function () {
        await this.RatRaceNFTInstance.setMintOpen();
        await expectRevert(
          this.RatRaceNFTInstance.mintNFT(`1`, {
            from: user1,
            value: ether(`0.5`),
          }),
          `Not enought funds`
        );
      });

      it(`${testCounter++}: will mint 1 new token`, async function () {
        await this.RatRaceNFTInstance.setMintOpen();
        await this.RatRaceNFTInstance.mintNFT(`1`, {
          from: user1,
          value: reelAmount,
        });
        const balance = await this.RatRaceNFTInstance.balanceOfNftMinted(user1);
        const totalSupply = await this.RatRaceNFTInstance.totalSupply();
        await expect(balance).to.be.bignumber.equal(`1`);
        await expect(totalSupply).to.be.bignumber.equal(`1`);
      });

      it(`${testCounter++}: will mint 2 new token`, async function () {
        await this.RatRaceNFTInstance.setMintOpen();
        await this.RatRaceNFTInstance.mintNFT(`2`, {
          from: user1,
          value: 2 * reelAmount,
        });
        const balance = await this.RatRaceNFTInstance.balanceOfNftMinted(user1);
        const totalSupply = await this.RatRaceNFTInstance.totalSupply();
        await expect(balance).to.be.bignumber.equal(`2`);
        await expect(totalSupply).to.be.bignumber.equal(`2`);
      });

      it(`${testCounter++}: will mint 3 new token`, async function () {
        await this.RatRaceNFTInstance.setMintOpen();
        await this.RatRaceNFTInstance.mintNFT(`3`, {
          from: user1,
          value: 3 * reelAmount,
        });
        const balance = await this.RatRaceNFTInstance.balanceOfNftMinted(user1);
        const totalSupply = await this.RatRaceNFTInstance.totalSupply();
        await expect(balance).to.be.bignumber.equal(`3`);
        await expect(totalSupply).to.be.bignumber.equal(`3`);
      });

      it(`${testCounter++}: will fail to mint 4 new token`, async function () {
        await this.RatRaceNFTInstance.setMintOpen();
        await expectRevert(
          this.RatRaceNFTInstance.mintNFT(`4`, {
            from: user1,
            value: 4 * reelAmount,
          }),
          `You cant mint more NFT`
        );
      });

      it(`${testCounter++}: will fail to mint 3 + 1`, async function () {
        await this.RatRaceNFTInstance.setMintOpen();
        await this.RatRaceNFTInstance.mintNFT(`3`, {
          from: user1,
          value: 3 * reelAmount,
        });
        await expectRevert(
          this.RatRaceNFTInstance.mintNFT(`1`, {
            from: user1,
            value: 1 * reelAmount,
          }),
          `Too much mint`
        );
      });

      it(`${testCounter++}: will fail mint is not open`, async function () {
        await expectRevert(
          this.RatRaceNFTInstance.mintNFT(`3`, {
            from: user1,
            value: 3 * reelAmount,
          }),
          "Mint is not open"
        );
      });
    });

    context(`###### test gift ######`, () => {
      it(`${testCounter++}: Should gift a nft`, async function () {
        await this.RatRaceNFTInstance.setToPremint({ from: owner });
        await this.RatRaceNFTInstance.gift(user1, { from: owner });
        const balance = await this.RatRaceNFTInstance.tokenOfOwnerByIndex(
          user1,
          0
        );
        await expect(balance).to.be.bignumber.equal("1");
      });

      it(`${testCounter++}: Gift Should Have a revert: the state is not in premint`, async function () {
        await expectRevert(
          this.RatRaceNFTInstance.gift(user1, { from: owner }),
          "We are not in the Premint phase"
        );
      });

      it(`${testCounter++}: Gift Should Have a revert: gift limit`, async function () {
        await this.RatRaceNFTInstance.setToPremint({ from: owner });
        for (let index = 0; index <= 33; index++) {
          await this.RatRaceNFTInstance.gift(user1, { from: owner });
        }
        await expectRevert(
          this.RatRaceNFTInstance.gift(user1, { from: owner }),
          "giftLimit reached"
        );
      });

      it(`${testCounter++}: Gift Should Have a revert:`, async function () {
        await this.RatRaceNFTInstance.setMintOpen({
          from: owner,
        });
      });
    });

    // on test le modifier owner sur les fonctions qui l'utilisent
    context(`###### only owner ######`, () => {
      it(`${testCounter++}: Should revert priceSale`, async function () {
        await expectRevert(
          this.RatRaceNFTInstance.changePriceSale(ether(`2`), {
            from: accounts[1],
          }),
          `Ownable: caller is not the owner`
        );
      });

      it(`${testCounter++}: Should revert changeMaxMint`, async function () {
        await expectRevert(
          this.RatRaceNFTInstance.changeMaxMintAllowed(`2`, {
            from: accounts[1],
          }),
          `Ownable: caller is not the owner`
        );
      });
      it(`${testCounter++}: Should revert setBaseURI`, async function () {
        await expectRevert(
          this.RatRaceNFTInstance.setBaseUri(`newURI`, { from: accounts[1] }),
          `Ownable: caller is not the owner`
        );
      });

      it(`${testCounter++}: Should revert setToPremint`, async function () {
        await expectRevert(
          this.RatRaceNFTInstance.setToPremint({ from: user1 }),
          `Ownable: caller is not the owner`
        );
      });

      it(`${testCounter++}: Should revert setMintOpen`, async function () {
        await this.RatRaceNFTInstance.setToPremint({ from: owner });
        await expectRevert(
          this.RatRaceNFTInstance.setMintOpen({ from: user1 }),
          `Ownable: caller is not the owner`
        );
      });

      it(`${testCounter++}: Should revert setMintPaused`, async function () {
        await this.RatRaceNFTInstance.setToPremint({ from: owner });
        await this.RatRaceNFTInstance.setMintOpen({ from: owner });
        await expectRevert(
          this.RatRaceNFTInstance.setMintPaused({ from: user1 }),
          `Ownable: caller is not the owner`
        );
      });

      it(`${testCounter++}: Should revert gift`, async function () {
        await expectRevert(
          this.RatRaceNFTInstance.gift(user1, { from: user1 }),
          `Ownable: caller is not the owner`
        );
      });
    });

     // test de la fonction release qui permet aux différentes adresses de isTeam d'être payé 
    context(`###### test release ######`, () => {
      it(`${testCounter++}: Should release to a member of the team`, async function () {
        //Send 1 eth au contrat
        await send.ether(owner, this.RatRaceNFTInstance.address, reelAmount);

        // on vérifie que les adresses font bien partie de isTeam
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
        await expect(profit1).to.be.bignumber.equal(ether(`0.45`));

        //Test second share
        const tracker2 = await balance.tracker(accounts[3]);
        await this.RatRaceNFTInstance.release(accounts[3], {
          from: accounts[2],
        });
        const profit2 = await tracker2.delta();
        await expect(profit2).to.be.bignumber.equal(ether(`0.45`));

        //Test third share
        const tracker3 = await balance.tracker(accounts[4]);
        await this.RatRaceNFTInstance.release(accounts[4], {
          from: accounts[3],
        });
        const profit3 = await tracker3.delta();
        await expect(profit3).to.be.bignumber.equal(ether(`0.10`));
      });

      // on vérifie qu'une autres adresse ne puisse déclencher un paiement
      it(`${testCounter++}: Shouldn't release`, async function () {
        await send.ether(owner, this.RatRaceNFTInstance.address, reelAmount);
        await expectRevert(
          this.RatRaceNFTInstance.release(accounts[2], { from: owner }),
          `not member of the team.`
        );
      });
    });

    // on test la fonction tokenURI
    context(`###### tokenURI ######`, () => {
      it(`${testCounter++}: Shouldn't return tokenId doesn't exist`, async function () {
        await expectRevert(
          this.RatRaceNFTInstance.tokenURI(`5`),
          `id doesn't exist`
        );
      });

      it(`${testCounter++}: should return tokenId`, async function () {
        await this.RatRaceNFTInstance.setMintOpen();
        await this.RatRaceNFTInstance.mintNFT(`1`, {
          from: user1,
          value: reelAmount,
        });
        let tokenURI = await this.RatRaceNFTInstance.tokenURI(`1`);
        await expect(tokenURI).to.be.equal(`URI1.json`);
      });
    });

    // on test l'émission des events
    context("###### events ######", () => {
      it(`${testCounter++}: Emit premit`, async function () {
        const receipt = await this.RatRaceNFTInstance.setToPremint({
          from: owner,
        });
        await expectEvent(receipt, "MintStatus", { 0: new BN("1") });
      });

      it(`${testCounter++}: Emit mintOpen`, async function () {
        const receipt = await this.RatRaceNFTInstance.setMintOpen({
          from: owner,
        });
        await expectEvent(receipt, "MintStatus", { 0: new BN("2") });
      });

      it(`${testCounter++}: Emit paused`, async function () {
        await this.RatRaceNFTInstance.setMintOpen({ from: owner });
        const receipt = await this.RatRaceNFTInstance.setMintPaused({
          from: owner,
        });
        await expectEvent(receipt, "MintStatus", { 0: new BN("0") });
      });

      it(`${testCounter++}: Emit priceChange`, async function () {
        const receipt = await this.RatRaceNFTInstance.changePriceSale(
          ether("2"),
          { from: owner }
        );
        await expectEvent(receipt, "PriceChange", {
          oldPrice: ether("1"),
          newPrice: ether("2"),
        });
      });

      it(`${testCounter++}: Emit changeMaxMintAllowed`, async function () {
        const receipt = await this.RatRaceNFTInstance.changeMaxMintAllowed(
          "5",
          {
            from: owner,
          }
        );
        await expectEvent(receipt, "MaxMintAllowedChange", {
          oldMax: "3",
          newMax: "5",
        });
      });
    });
  });
});
