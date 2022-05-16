import React from "react";

const DisplayNFT = ({ nftInfos }) => {
  return (
    <div className="displayNFT_pages">
      <h1>Vos NFT déjà possédés</h1>
      <div className="displayOwned">
        {nftInfos &&
          nftInfos.map((n, i) => (
            <ul key={i}>
              <img style={{ width: "450px", height: "450px" }} src={n.image} />
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
