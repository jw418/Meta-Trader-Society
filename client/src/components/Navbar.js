import React from "react";

const Navbar = () => {
  return (
    <div className="navbar_components">
      <ul className="navbar">
        <li>Roadmap</li>
        <li>Team</li>
        <li>Open Sea</li>
      </ul>

      <div className="logos">
        <img src="../img/discord_logo.png" />
        <img src="../img/open_sea3.png" />
        <img src="../img/twitter_logo.png" />
      </div>
    </div>
  );
};

export default Navbar;
