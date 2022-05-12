import React from "react";

const Navbar = ({ userAddress }) => {
  return (
    <div className="navbar_components" style={{ marginTop: "10px" }}>
      <ul className="navbar">
        <span className="un">Roadmap</span>
        <span className="un">Team</span>
        <span className="un">Open Sea</span>
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
          <img id="logo" src="../img/discord_logo.png" />
          <img id="logo" src="../img/open_sea3.png" />
          <img id="logo" src="../img/twitter_logo.png" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
