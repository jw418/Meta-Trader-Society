import React from "react";

const Team = () => {
  return (
    <div className="team">
     <h1>Team</h1>
     <div className="team_members">
         <div className="team_member">
            <img className="team_member_img" src="../img/cdp_1.png"/>
            <h3>CDP1</h3>
            <p>bala bla bla ùdloijzjd ùdo, qzji</p>
        </div>
        <div className="team_member">
            <img className="team_member_img" src="../img/cdp_2.png"/>
            <h3>CDP2</h3>
            <p>bala bla bla ùdloijzjd ùdo, qzji</p>
        </div>
        <div className="team_member">
            <img className="team_member_img" src="../img/dev_1.png"/>
            <h3>DEV1</h3>
            <p>bala bla bla ùdloijzjd ùdo, qzji</p>
        </div>
        <div className="team_member">
            <img className="team_member_img" src="../img/dev_2.png"/>
            <h3>Tristan Boettger-Magnier</h3>
            <p>Dévoloppeur depuis...</p>
        </div>
     </div>       
    </div>
  );
};

export default Team;
