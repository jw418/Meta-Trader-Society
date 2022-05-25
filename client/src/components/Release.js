import React, { useEffect, useState } from "react";
import RatRaceNFT from "../contracts/RatRaceNFT.json";
import getWeb3 from "../getWeb3";

const Release = () => {
  const [web3, setWeb3] = useState();
  const [accounts, setAccouts] = useState();
  const [networkId, setNetwordId] = useState();
  const [contract, setContract] = useState();
  const [userAddress, setUserAddress] = useState();
  const [deployedNetwork, setDeployedNetwork] = useState();
  const [isTeam, setIsTeam] = useState();
  const [share, setShare] = useState();
  const [amountToRealse, setAmountToRealse] = useState();
  const [amountRealesed, setAmountRealesed] = useState();
  const [contractBalance, setContractBalance] = useState();

  useEffect(async () => {
    await loadData();
  });

  const loadData = async () => {
    const web3 = await getWeb3();
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = RatRaceNFT.networks[networkId];
    const contract = await new web3.eth.Contract(
      RatRaceNFT.abi,
      deployedNetwork && deployedNetwork.address
    );

    await setWeb3(web3);
    await setUserAddress(accounts[0]);
    await setAccouts(accounts[0]);
    setContract(contract);
    setDeployedNetwork(deployedNetwork);

    if (await contract.methods.team(accounts[0]).call()) {
      setIsTeam(true);
      updateAmount(web3, contract, accounts[0]);
    }
  };

  const updateAmount = async (web3, contract, address) => {
    let share = await contract.methods.shares(address).call();
    let contractBalance = await web3.eth.getBalance(contract._address);
    let released = await contract.methods.released(address).call();
    let totalReleased =
      parseInt(await contract.methods.totalReleased().call()) +
      parseInt(contractBalance);
    let totalShare = await contract.methods.totalShares().call();
    let toRealse = (totalReleased * share) / totalShare - released;
    console.log(toRealse);
    setAmountRealesed(released / 10 ** 18);
    setAmountToRealse(toRealse / 10 ** 18);
    setContractBalance(contractBalance / 10 ** 18);
  };

  const handleRelease = async () => {
    contract.methods
      .release(userAddress)
      .send({ from: userAddress })
      .then(() => {
        updateAmount(web3, contract, userAddress);
      });
  };

  return (
    <div className="release">
      <h1>Récuperer les fonds</h1>
      {isTeam ? (
        <div className="release_container">
          <h3>Montant sur le contract : {contractBalance} ETH</h3>
          <h3>Vous avez déjà retiré : {amountRealesed} ETH</h3>
          <h3>Vous pouvez retirer : {amountToRealse} ETH</h3>
          {amountToRealse > 0 && (
            <button onClick={() => handleRelease()}>Récuperer</button>
          )}
        </div>
      ) : (
        <h3>Vous ne faites pas partie l'équipe</h3>
      )}
    </div>
  );
};

export default Release;
