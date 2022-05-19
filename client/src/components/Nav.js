import React from "react";

const Navbar = ({ userAddress }) => {
  return (
    <div className="navbar_components">
      <img id="logo_rat" src="../img/logo_rat_navbar.png" />
      <ul className="navbar">
        <span className="un">Roadmap</span>
        <span className="un">Team</span>
        <span className="un">NFT Wallet</span>
      </ul>

      <div className="logos">
        <div className="metamask_input">
          <img id="metamask" src="../img/metamask_icon.png" />
          <p>
            {userAddress != undefined
              ? `${userAddress.slice(0, -37)}...${userAddress.slice(
                  userAddress.length - 4,
                  userAddress.length
                )}`
              : "Connect"}
          </p>
        </div>
        <div className="logo_contain">
          <a href="https://discord.com/" target="_blank">
            <img id="logo" src="../img/discord_logo.png" />
          </a>
          <a href="https://opensea.io/" target="_blank">
            <img id="logo" src="../img/open_sea3.png" />
          </a>
          <a href="https://twitter.com/" target="_blank">
            <img id="logo" src="../img/twitter_logo.png" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
