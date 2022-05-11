const PayementSpliter = artifacts.require("PaymentSplitter.sol");
const {
  balance,
  constants,
  ether,
  expectEvent,
  send,
  expectRevert,
} = require("@openzeppelin/test-helpers");
const { expect } = require("chai");

contract("PayementSpliter", async (accounts) => {
  const [owner, payee1, payee2, payee3, nonpayee1, payer1] = accounts;

  const amount = ether("1");

  context("deployed ", () => {
    beforeEach(async () => {
      this.payees = [payee1, payee2, payee3];
      this.share = [45, 45, 10];
      this.contract = await PayementSpliter.new(this.payees, this.share);
    });

    it("Should not accept the release cause the address is not member of the team", async () => {
      expect(await this.contract.isTeam(nonpayee1)).equal(false);
      await expectRevert(
        this.contract.release(nonpayee1, { from: nonpayee1 }),
        "not member of the team -- Reason given: not member of the team."
      );
    });

    it("Should accept the release of a member of the team", async () => {
      //Check if the address is the member of the team
      expect(await this.contract.isTeam(payee1)).equal(true);

      //Send ether to the contract
      await send.ether(owner, this.contract.address, amount);
      expect(
        await balance.current(this.contract.address)
      ).to.be.bignumber.equal(amount);

      //Check the balance after the release
      const tracker1 = await balance.tracker(payee1);
      await this.contract.release(payee1, { from: payee2 });
      const profit1 = await tracker1.delta();
      expect(profit1).to.be.bignumber.equal(ether("0.45"));
    });
  });
});
