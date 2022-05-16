import React from "react";

const DisplayMint = ({ trigger, nftInfos }) => {
  console.log(nftInfos);
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
                <img
                  style={{ width: "300px", height: "300px" }}
                  src={n.image}
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
