import React from "react";

const Team = () => {
  return (
    <div className="team">
     <h1>Team</h1>
     <div className="team_members">
         <div className="team_member">
            <img className="team_member_img" src="../img/cdp_1.png"/>
            <h3>CDP_1</h3>
            <p>Chef de projet</p>
            <p>Product Owner</p>
        </div>
        <div className="team_member">
            <img className="team_member_img" src="../img/cdp_2.png"/>
            <h3>CDP_2</h3>
            <p>Chef de projet</p>
            <p>Scrum Master</p>
        </div>
        <div className="team_member">
            <img className="team_member_img" src="../img/dev_1.png"/>
            <h3>Dev_1</h3>
            <p>Développeur Blockchain et Front-end</p>
            <p>En charge du site de Mint et des Smart-Contract</p>
        </div>
        <div className="team_member">
            <img className="team_member_img" src="../img/dev_2.png"/>
            <h3>Dev_2</h3>
            <p>Développeur Blockchain et Front-end</p>
            <p>En charge de la collection NFT et des Smart-Contract</p>
        </div>
     </div>       
    </div>
  );
};

export default Team;
