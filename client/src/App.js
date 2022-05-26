import React, { useEffect, useState, useCallback } from "react";
import RatRaceNFT from "./contracts/RatRaceNFT.json";
import getWeb3 from "./getWeb3";
import DisplayNFT from "./components/DisplayNFT";
import DisplayMint from "./components/DisplayMint";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Description from "./components/Description";
import Team from "./components/Team";
import Roadmap from "./components/Roadmap";
import Navbar from "./components/Nav";

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
  const [infoMinted, setInfoMinted] = useState([]);
  const [nftBalanceIndex, setNftBalanceIndex] = useState([]);
  const [nftInfos, setNftInfos] = useState([]);
  const [nftWallet, setNftWallet] = useState([]);
  const [mintStatus, setMintStatus] = useState(true);
  const [multiMint, setMultiMint] = useState(false);
  const [showMultiMint, setShowMultiMint] = useState();
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

    //Set to all the state
    setNftBalance(
      await contract.methods.balanceOfNftMinted(accounts[0]).call()
    );
    setBalance(Balance / 10 ** 18);
    setContract(contract);
    setMintPrice(await contract.methods.priceSale().call());
    setWeb3(web3);
    setAccouts(accounts);
    mintState(contract);
    await setUserAddress(accounts[0]);
    await getNFTIndex(contract, accounts[0]);
    setNetwordId(networkId);
    loadWalletNFT(contract);
  };

  const mintState = async (contract) => {
    let status = await contract.methods.StateMint().call();
    if (status == 0) setMintStatus("paused");
    if (status == 1) setMintStatus("pre mint");
    if (status == 2) setMintStatus("mint open");
  };

  //Load the wallet of the user
  const loadWalletNFT = async (contract) => {
    await getNFTIndex(contract, userAddress);
    nftBalanceIndex.forEach(async (n, i) => {
      let url = await contract.methods.tokenURI(n).call();
      nftWallet.push(await fetchData(url));
      miseAJour();
    });
    console.log(nftWallet);
    if (nftBalanceIndex.length + nftWallet.length == 4) nftWallet.shift();
  };

  const loadMint = async (number, index) => {
    console.log(number, index);
    let data = [];
    if (number > 1) {
      setMultiMint(true);
      for (let i = 0; i < number; i++) {
        let url = await contract.methods.tokenURI(index[i]).call();
        data.push(await fetchData(url));
      }
      setNftInfos(data);
    } else {
      setMultiMint(false);
      let url = await contract.methods.tokenURI(index[0]).call();
      setNftInfos(await fetchData(url));
    }
  };

  const fetchData = async (url) => {
    let temp;
    url = url.slice(7, url.length);
    await fetch("https://ipfs.io/ipfs/" + url)
      .then((res) => res.json())
      .then((data) => {
        temp = data;
        temp.image = data.image.replace("ipfs://", "https://ipfs.io/ipfs/");
      });
    return temp;
  };

  const getNFTIndex = async (contract, accounts) => {
    const totalSupply = await contract.methods.totalSupply().call();
    for (let i = 1; i <= totalSupply; i++) {
      if ((await contract.methods.ownerOf(i).call()) == accounts) {
        if (!nftBalanceIndex.includes(i)) {
          nftBalanceIndex.push(i);
        }
      }
    }
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
        .then(async (res) => {
          if (res.events.Transfer.length > 1)
            res.events.Transfer.forEach((n) => {
              index.push(n.returnValues.tokenId);
            });
          else index = res.events.Transfer.returnValues.tokenId;
          // if (index.length == 1) {
          //   setMultiMint(false);
          //   getImage(index[0]);
          // } else {
          //   setMultiMint(true);
          //   setNftInfos(await loadImagesByIndex(index, index.length));
          // }
          await loadMint(inputValue, index);

          setInputError(false);
          setIsMinted(true);
          await getNFTIndex(contract, accounts[0]);
          updateNFTBalance();
          updateBalance();
          loadWalletNFT(contract);
        });
  };

  const updateNFTBalance = async () => {
    setNftBalance(
      await contract.methods.balanceOfNftMinted(accounts[0]).call()
    );
  };

  const updateBalance = async () => {
    const Balance = await web3.eth.getBalance(accounts[0]);
    setBalance(Balance / 10 ** 18);
  };

  const handleScroll = (e) => {
    const navbar = document.querySelector(".navbar_components");
    if (window.scrollY > 400) {
      navbar.style.top = "-150px";
    } else {
      navbar.style.top = "0";
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  const mintOpen = async () => {
    await contract.methods.setMintOpen().send({ from: accounts[0] });
  };

  return (
    <>
      <div className="home">
        <Navbar userAddress={userAddress} />
        <Home />
        <div className="trait"></div>
        <div className="mint_component" id="mint">
          <div className="mint_interface">
            {showMultiMint && (
              <DisplayMint trigger={setShowMultiMint} nftInfos={nftInfos} />
            )}

            {isMinted && (
              <div className="image_mint">
                {!multiMint ? (
                  <>
                    <img src={nftInfos && nftInfos.image} />
                    Attributes :
                    <ul className="showAttributes">
                      {nftInfos &&
                        nftInfos.attributes.map((n, i) => (
                          <li key={i}>
                            <p>
                              {n.trait_type} : {n.value}
                            </p>
                          </li>
                        ))}
                    </ul>
                  </>
                ) : (
                  <button
                    onClick={() => setShowMultiMint(true)}
                    style={{ margin: "auto", padding: "2px" }}
                  >
                    Display Mint
                  </button>
                )}
              </div>
            )}
            <div className="text_mint" style={isMinted && { width: "150%" }}>
              {mintStatus == "mint open" ? (
                <div className="mint_display">
                  <p style={{ margin: "auto" }}>Status : {mintStatus}</p>
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
                  <button
                    className="mint_button"
                    onClick={() => mintFonction()}
                  >
                    MINT
                  </button>
                </div>
              ) : (
                <h3 style={{ margin: "auto" }}>Mint Closed</h3>
              )}
            </div>
          </div>
        </div>
      </div>
      {nftBalance >= 1 && <DisplayNFT nftInfos={nftWallet} />}
      <section id="roadmap">
        <Roadmap />
      </section>
      <section id="team">
        <Team />
      </section>      
      <Footer />      
      <button onClick={mintOpen}>mint Open</button>
    </>
  );
};

export default App;
