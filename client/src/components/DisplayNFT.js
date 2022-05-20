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
              {!imagesLoaded && <img src="../img/load.gif" />}

              <img
                className="wallet_images"
                src={n.image}
                onLoad={() => setImagesLoaded(true)}
              />
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
