import React, { useEffect, useState, useCallback } from "react";
import RatRaceNFT from "./contracts/RatRaceNFT.json";
import getWeb3 from "./getWeb3";
import Navbar from "./Components/Navbar";
import Description from "./Components/Description";
import DisplayNFT from "./Components/DisplayNFT";

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
  const [infoMinted, setInfoMinted] = useState();
  const [nftBalanceIndex, setNftBalanceIndex] = useState([]);
  const [nftInfos, setNftInfos] = useState([]);
  const [, fctMiseAJour] = useState({});
  const miseAJour = useCallback(() => fctMiseAJour({}), []);

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

    await getNFTBalance(contract);

    console.log(web3);
    //Set to all the state
    setNftBalance(await contract.methods.nftBalance(accounts[0]).call());
    setBalance(Balance / 10 ** 18);
    setContract(contract);
    setMintPrice(await contract.methods.priceSale().call());
    setWeb3(web3);
    setAccouts(accounts);
    setUserAddress(accounts[0]);
    setNetwordId(networkId);
    loadImages(contract);
  };

  const loadImages = (contract) => {
    nftBalanceIndex.forEach(async (n) => {
      try {
        let url = await contract.methods.tokenURI(n).call();
        url = url.slice(7, url.length);
        await fetch("https://ipfs.io/ipfs/" + url)
          .then((res) => res.json())
          .then((data) => {
            let temps2 = data;
            temps2.image = data.image.replace(
              "ipfs://",
              "https://ipfs.io/ipfs/"
            );
            nftInfos.push(temps2);
            miseAJour();
          });
      } catch (err) {
        console.log(err);
      }
    });
  };

  const loadImagesByIndex = async (index, length) => {
    let temp = [];
    if (length > 1) {
      temp = await loadMultiNFT(index);
      return temp;
    } else {
      let url = await contract.methods.tokenURI(index[0]).call();
      url = url.slice(7, url.length);
      await fetch("https://ipfs.io/ipfs/" + url)
        .then((res) => res.json())
        .then((data) => {
          temp = data 
          temp.image = data.image.replace("ipfs://", "https://ipfs.io/ipfs");
        });
      return temp;
    }
  };

  const loadMultiNFT = async (index) => {
    let temp = [];
    await index.forEach(async (n) => {
      let url = await contract.methods.tokenURI(n).call();
      url = url.slice(7, url.length);
      await fetch("https://ipfs.io/ipfs/" + url)
        .then((res) => res.json())
        .then((data) => {
          let temp2 = data;
          temp2.image = data.image.replace("ipfs://", "https://ipfs.io/ipfs")
          temp.push(temp2)
        });
    });
    return temp;
  };

  const mintFonction = async () => {
    let index = [];
    //Check if the input si empty or not
    if (inputValue == undefined || inputValue == "") setInputError(true);
    //Get the mint function of our contract
    else
      await contract.methods
        .mintNFT(inputValue)
        .send({ from: accounts[0], value: mintPrice * inputValue })
        .then((res) => {
          if (res.events.Transfer.length > 1)
            res.events.Transfer.forEach((n) => {
              index.push(n.returnValues.tokenId);
            });
          else index = res.events.Transfer.returnValues.tokenId;
          if (index.length == 1) getImage(index[0]);
          else loadImagesByIndex(index,index.length)

          setInputError(false);
          setIsMinted(true);
          updateNFTBalance();
          updateBalance();
          loadImages(contract)
        });
  };

  const getNFTBalance = async (contract) => {
    const totalSupply = await contract.methods.totalSupply().call();

    for (let i = 1; i <= totalSupply; i++) {
      if (await contract.methods.ownerOf(i).call()) {
        if (!nftBalanceIndex.includes(i)) nftBalanceIndex.push(i);
      }
    }
  };

  const getImage = async (token_id) => {
    let url = await contract.methods.tokenURI(token_id).call();

    url = url.slice(7, url.length);
    await fetch("https://ipfs.io/ipfs/" + url)
      .then((res) => res.json())
      .then((data) => {
        let temp = data;
        temp.image = data.image.replace("ipfs://", "https://ipfs.io/ipfs/");
        setInfoMinted(temp);
      });
  };

  const updateNFTBalance = async () => {
    setNftBalance(await contract.methods.nftBalance(accounts[0]).call());
  };

  const updateBalance = async () => {
    const Balance = await web3.eth.getBalance(accounts[0]);

    setBalance(Balance / 10 ** 18);
  };

  return (
    <>
      <div className="home">
        <Navbar userAddress={userAddress} />
        <div className="mint_interface">
          {isMinted && (
            <>
              <div className="image_mint">
                <img src={infoMinted && infoMinted.image} />
                Attributes :
                <ul className="showAttributes">
                  {infoMinted &&
                    infoMinted.attributes.map((n, i) => (
                      <li key={i}>
                        <p>
                          {n.trait_type} : {n.value}
                        </p>
                      </li>
                    ))}
                </ul>
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
      <div className="trait"></div>
      {nftBalance >= 1 && <DisplayNFT nftInfos={nftInfos} />}
      <div className="trait"></div>
      <Description />
    </>
  );
};

export default App;
