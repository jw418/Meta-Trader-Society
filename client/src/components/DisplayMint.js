import React, { useState } from "react";

const DisplayMint = ({ trigger, nftInfos }) => {
  const [imagesLoaded, setImagesLoaded] = useState();

  return (
    <div className="display_mint">
      <div className="inner_display_mint">
        <div className="title">
          <h3>Your Minting</h3>
          <button onClick={() => trigger(false)}>X</button>
        </div>
        <div className="container">
          {nftInfos &&
            nftInfos.map((n, i) => (
              <ul key={i}>
                {!imagesLoaded && <img src="../img/load.gif" />}

                <img
                  style={{ width: "300px", height: "300px" }}
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
    </div>
  );
};

export default DisplayMint;
