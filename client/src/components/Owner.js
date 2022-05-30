import React, { useEffect, useState } from "react";
import Release from "./Release"
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
  const [address, setAddress] = useState("");
  const [mintInfo, setMintInfo] = useState();
  const [imagesLoaded, setImagesLoaded] = useState();
  const [price,setPrice] = useState();

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
    await setUserAddress(accounts);
    await setAccouts(accounts);
    setContract(contract);
    setDeployedNetwork(deployedNetwork);
    getState(contract);
  };

  const getState = async (contract) => {
    let status = await contract.methods.StateMint().call();
    if (status == 0) setMintStatus("Paused");
    if (status == 1) setMintStatus("Pre mint");
    if (status == 2) setMintStatus("Mint open");
    if (status == 3) setMintStatus("Mint close");
  };

  const mintOpen = async () => {
    await contract.methods.setMintOpen().send({ from: accounts[0] });
    getState(contract);
  };

  const preMint = async () => {
    await contract.methods.setToPremint().send({ from: accounts[0] });
    getState(contract);
  };

  const paused = async () => {
    await contract.methods.setMintPaused().send({ from: accounts[0] });
    getState(contract);
  };

  const handleGift = async (address) => {
    let tokenId;
    await contract.methods.gift(address).send({ from: accounts[0] }).then(async (data) => {
      tokenId = data.events.Transfer.returnValues.tokenId
    });
    setMintInfo(await loadNft(tokenId));
  };


  const handlePriceChange = async (price) => {
    // price = price / 10**18
    price = web3.utils.toWei(price.toString(), "ether");
    await contract.methods.changePriceSale(price).send({from:accounts[0]}).then(() => {
      alert(`prix changé`)
    })
  }

  const loadNft = async (tokenId) => {
    let url = await contract.methods.tokenURI(tokenId).call();
    let temp;
    url = url.slice(7, url.length);
    await fetch("https://ipfs.io/ipfs/" + url)
      .then((res) => res.json())
      .then((data) => {
        temp = data;
        temp.image = data.image.replace("ipfs://", "https://ipfs.io/ipfs/");
      })
      return temp
    }

  return (
    <div style={{ textAlign: "center" }}>
      {isOwner ? (
        <div>
          <h3>Etat actuel : {mintStatus}</h3>
          {mintStatus == "Paused" && (
            <>
              <h3>Passer à premint :</h3>
              <button onClick={preMint}>Premint</button>
              <h3>Ou</h3>
              <h3>Passer à mint open :</h3>
              <button onClick={mintOpen}>Mint Open</button>
            </>
          )}
          {mintStatus == "Mint open" && (
            <>
              <h3>Mettre en pause le contract</h3>
              <button onClick={paused}>Pause</button>
              <h4>Changer le prix du mint</h4>
              <input type={"number"} name="price" onChange={(e) => setPrice(e.target.value)}/>
              <button onClick={() => handlePriceChange(price)}>Changer</button>
            </>
          )}
          {mintStatus == "Pre mint" &&
          <div>
            <h3>Passer à mint open :</h3>
              <button onClick={mintOpen}>Mint Open</button>
            <p  style={{marginTop:"25px"}}>Faire un gift</p>
            <label htmlFor="address" >
              Address
              <input name="address" type={"text"} onChange={(e) => setAddress(e.target.value)}/>
            </label>
            <button onClick={() => handleGift(address)}>Gift</button>

            {mintInfo &&
              <ul>
                <img
                  style={{ width: "300px", height: "300px" }}
                  src={imagesLoaded ? mintInfo.image : "../img/load.gif"}
                  onLoad={() => setImagesLoaded(true)}
                />
                <ul className="showAttributes">
                  {mintInfo.attributes.map((n, i) => (
                    <li key={i}>
                      <p>
                        {n.trait_type} : {n.value}
                      </p>
                    </li>
                  ))}
                </ul>
              </ul>
              }
          </div>
          }
        </div>
      ) : (
        <h1>Vous n'êtes pas un dev</h1>
      )}
      <Release/>
    </div>
  );
};

export default Owner;
