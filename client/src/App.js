import React, { useEffect, useState } from "react";
import RatRaceNFT from "./contracts/RatRaceNFT.json";
import getWeb3 from "./getWeb3";
import Navbar from "./Components/Navbar";
import Description from "./Components/Description";

const App = () => {
  const [web3, setWeb3] = useState();
  const [accounts, setAccouts] = useState();
  const [networkId, setNetwordId] = useState();
  const [contract, setContract] = useState();
  const [userAddress, setUserAddress] = useState();
  const [balance, setBalance] = useState();
  const [inputValue, setInputValue] = useState();
  const [mintPrice, setMintPrice] = useState();
  const [nftBalance, setNftBalance] = useState();
  const [inputError, setInputError] = useState();
  const [isMinted, setIsMinted] = useState();

  useEffect(async () => {
    //Load blockchain Data
    await loadData();
  }, []);

  const loadData = async () => {
    const web3 = await getWeb3();
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = RatRaceNFT.networks[networkId];
    const contract = await new web3.eth.Contract(
      RatRaceNFT.abi,
      deployedNetwork && deployedNetwork.address
    );
    const Balance = await web3.eth.getBalance(accounts[0]);

    //Set to all the state
    setNftBalance(await contract.methods.nftBalance(accounts[0]).call());
    setBalance(Balance / 10 ** 18);
    setContract(contract);
    setMintPrice(await contract.methods.priceSale().call());
    setWeb3(web3);
    setAccouts(accounts);
    setUserAddress(accounts[0]);
    setNetwordId(networkId);
  };

  const mintFonction = async () => {
    //Check if the input si empty or not
    if (inputValue == undefined || inputValue == "") setInputError(true);
    //Get the mint function of our contract
    else
      await contract.methods
        .mintNFT(inputValue)
        .send({ from: accounts[0], value: mintPrice * inputValue })
        .then(() => {
          setInputError(false);
          setIsMinted(true);
          updateNFTBalance();
        });
  };

  const updateNFTBalance = async () => {
    setNftBalance(await contract.methods.nftBalance(accounts[0]).call());
  };

  //Only for test will be deleted
  // const changePrice = async () => {
  //   await contract.methods
  //     .changePriceSale(web3.utils.toWei("5", "ether"))
  //     .send({ from: accounts[0] });
  // };

  //Only for test will be deleted
  // const setURI = async () => {
  //   await contract.methods
  //     .setBaseUri(JSON.stringify(json))
  //     .send({ from: accounts[0] });
  // };

  return (
    <>
      <div className="home">
        <Navbar userAddress={userAddress} />
        <div className="mint_interface">
          {isMinted && (
            <>
              <div className="image_mint">
                <img src="../img/45.jpg" />
              </div>
            </>
          )}
          <div className="text_mint" style={isMinted && { width: "150%" }}>
            <div className="mint_display">
              <div className="input_display">
                <div className="input_title">
                  <p>Number of tokens</p>
                  <p id="balance">
                    Balance {balance && balance.toFixed(3)} ETH
                  </p>
                </div>
                <input
                  type="text"
                  name="price_input"
                  className="input_token"
                  onChange={(e) => setInputValue(e.target.value)}
                />
                {inputError && (
                  <p
                    style={{
                      maginTop: "10px",
                      marginBottom: "10px",
                      color: "red",
                    }}
                  >
                    You have to enter a value
                  </p>
                )}
                <div className="prince_balance">
                  <p id="mint_price">
                    Mint price : {mintPrice && mintPrice / 10 ** 18} ETH
                  </p>
                  <p id="nft_balance">
                    NFT balance : {nftBalance && nftBalance}
                  </p>
                </div>
              </div>
              <button className="mint_button" onClick={() => mintFonction()}>
                MINT
              </button>
            </div>
          </div>
        </div>
      </div>
      <Description />
    </>
  );
};

export default App;
