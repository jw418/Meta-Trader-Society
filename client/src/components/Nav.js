import React, { useState, useEffect } from "react";
import getWeb3 from "../getWeb3";

const Navbar = () => {
  const [userAddress, setUserAddress] = useState();
  const [chainId, setChainId] = useState(null);
  const [network, setNetwork] = useState();

  const NETWORKS = {
    1: "Ethereum Main Network",
    3: "Ropsten Test Network",
    4: "Rinkeby Test Network",
    5: "Goerli Test Network",
    42: "Kovan Test Network",
    1337: "Ganache",
  };

  useEffect(async () => {
    await loadData();
  });

  const loadData = async () => {
    const web3 = await getWeb3();
    const chainId = await web3.eth.getChainId();
    try {
      setUserAddress(window.ethereum.selectedAddress);
    } catch (err) {}
    await setChainId(chainId);
    setNetwork(getCurrentNetwork(chainId));
  };

  const disconnect = async () => {
    await window.ethereum.request({
      method: "eth_requestAccounts",
      params: [{ eth_accounts: {} }],
    });
  };

  const getCurrentNetwork = (chainId) => {
    return NETWORKS[chainId];
  };

  return (
    <div className="navbar_components">
      <a>
        <img id="logo_rat" src="../img/logo_rat_navbar.png" />
      </a>
      <ul className="navbar">
        <span className="un">
          <a href="#home">Meta Trader Society </a>
        </span>
        <span className="un">
          <a href="#mint">Mint</a>
        </span>
        <span className="un">
          <a href="#roadmap">Roadmap </a>
        </span>
        <span className="un">
          <a href="#team">Team</a>
        </span>
        <span className="un">
          <a href="#wallet">NFT Wallet</a>
        </span>
      </ul>

      <div className="logos">
        <div className="metamask_input" onClick={disconnect}>
          <img id="metamask" src="../img/metamask_icon.png" />
          <p>
            {userAddress != undefined
              ? `${userAddress.slice(0, -37)}...${userAddress.slice(
                  userAddress.length - 4,
                  userAddress.length
                )}`
              : "Connect"}
          </p>
        </div>
        <p style={{ margin: "auto", color: "white" }}>Chain : {network}</p>
      </div>
    </div>
  );
};

export default Navbar;
