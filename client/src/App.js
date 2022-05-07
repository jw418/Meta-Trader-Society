import React, { Component, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";

const App = () => {
  const [web3, setWeb3] = useState();
  const [accounts, setAccouts] = useState();
  const [networkId, setNetwordId] = useState();
  const [contact, setContract] = useState();
  const [userAddress, setUserAddress] = useState();
  const [balance, setBalance] = useState();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const web3 = await getWeb3();
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = SimpleStorageContract.networks[networkId];
    const contract = await new web3.eth.Contract(
      SimpleStorageContract.abi,
      SimpleStorageContract.address
    );
    let balance;

    // console.log(web3);
    web3.eth
      .getBalance(accounts[0])
      .then((res) => setBalance(web3.utils.fromWei(res)));

    setWeb3(web3);
    setAccouts(accounts);
    setUserAddress(accounts[0]);
    setNetwordId(networkId);
  };

  return (
    <div className="home">
      <Navbar />
      <div className="mint_interface">
        <div className="image_mint">
          <img src="../img/45.jpg" />
        </div>
        <div className="text_mint">
          <div className="mint_display">
            <div class="metamask_input">
              <img src="../img/metamask_icon.png" />
              {console.log(userAddress)}
              <p>
                {userAddress != undefined ? userAddress.slice(0, -33) : null}...
              </p>
            </div>
            <div className="input_display">
              <div className="input_title">
                <p>Enter the number of NFT you want to mint</p>
                <p id="balance">
                  Balance {balance && balance.slice(0, -15)} ETH
                </p>
              </div>

              <input type="text" name="price_input" className="input_token" />
              <p>Transaction cost : 0.01 ETH</p>
            </div>
            <button className="mint_button">MINT</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
