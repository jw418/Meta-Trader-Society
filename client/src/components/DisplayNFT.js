import React, { useState } from "react";

const DisplayNFT = ({ nftInfos }) => {
  const [imagesLoaded, setImagesLoaded] = useState();
  return (
    <div className="displayNFT_pages">
      <h1>Wallet NFT</h1>
      <div className="displayOwned">
        {nftInfos &&
          nftInfos.map((n, i) => (
            <ul key={i}>
              <img
                className="wallet_images"
                src={imagesLoaded ? n.image : "../img/load.gif"}
                onLoad={() => setImagesLoaded(true)}
              />
              <h3>Name : {n.name}</h3>
              <ul className="showAttributes">
                {n.attributes.map((n, i) => (
                  <li key={i}>
                    <p>
                      {n.trait_type} : {n.value}
                    </p>
                  </li>
                ))}
              </ul>
            </ul>
          ))}
      </div>
    </div>
  );
};

export default DisplayNFT;
