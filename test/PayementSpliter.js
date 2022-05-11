const PayementSpliter = artifacts.require("PaymentSplitter.sol");
const { BN, ether, expectRevert, send } = require("@openzeppelin/test-helpers");
const { expect } = require("chai");

contract("PayementSpliter", async (accounts) => {
  const [owner, payee1, payee2, payee3, nonpayee1, payer1] = accounts;

  const amount = ether("1");

  context("deployed ", () => {
    beforeEach(async () => {
      this.payees = [payee1, payee2, payee3];
      this.share = [45, 45, 10];
      this.contract = await PayementSpliter.new(this.payees, this.share);
      await send.ether(payer1, this.contract.address, amount);
    });

    // it("Accepte l'appel à la fonction release d'un des membres de la team", async () => {});

    it("Refuse la fonction release car il ne fait pas partie de la team", async () => {
      await expectRevert(this.contract.release(payee1));
    });
  });
});
