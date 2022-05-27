import React, { useEffect, useState } from "react";
import RatRaceNFT from "../contracts/RatRaceNFT.json";
import getWeb3 from "../getWeb3";

const Owner = () => {
  const [web3, setWeb3] = useState();
  const [accounts, setAccouts] = useState();
  const [networkId, setNetwordId] = useState();
  const [contract, setContract] = useState();
  const [userAddress, setUserAddress] = useState();
  const [deployedNetwork, setDeployedNetwork] = useState();
  const [isTeam, setIsTeam] = useState();
  const [isOwner, setIsOwner] = useState();
  const [mintStatus, setMintStatus] = useState("");

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

    if (await contract.methods.owner().call()) setIsOwner(true);
    await setWeb3(web3);
    await setUserAddress(accounts[0]);
    await setAccouts(accounts[0]);
    setContract(contract);
    setDeployedNetwork(deployedNetwork);
    getState(contract);
  };

  const getState = async (contract) => {
    let status = await contract.methods.StateMint().call();
    if (status == 0) setMintStatus("paused");
    if (status == 1) setMintStatus("pre mint");
    if (status == 2) setMintStatus("mint open");
  };

  const mintOpen = async () => {
    await contract.methods.setMintOpen().send({ from: accounts[0] });
  };

  const preMint = async () => {
    await contract.methods.setMintOpen().send({ from: accounts[0] });
  };

  const paused = async () => {
    await contract.methods.setMintPaused().send({ from: accounts[0] });
  };

  return (
    <div>
      {isOwner ? (
        <div>
          <h3>Etat actuel : {mintStatus}</h3>
          {mintStatus == "paused" && (
            <>
              <h3>Passer à premint :</h3>
              <button onClick={preMint}>Premint</button>
              <h3>Ou</h3>
              <h3>Passer à mint open :</h3>
              <button onClick={mintOpen}>Mint Open</button>
            </>
          )}
          {mintStatus == "mint open" && (
            <>
              <h3>Mettre en pause le contract</h3>
              <button onClick={paused}>Pause</button>
            </>
          )}
        </div>
      ) : (
        <h1>Vous n'êtes pas un dev</h1>
      )}
    </div>
  );
};

export default Owner;
