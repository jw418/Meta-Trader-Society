import React, { useEffect } from "react";
import Navbar from "./Nav";

const Home = () => {

  return (
    <>
      {/* <Navbar /> */}
      <div className="home_comonent">
        <div className="right_part">
          {/* <div className="nav">
            <a>
              <img id="logo_rat" src="../img/logo_rat_navbar.png" />
            </a>
            <p>Meta Trader Society</p>
          </div> */}
          <img src="../img/logo.png" />
          <div className="bottom_navbar">
            <div className="navbar_list">
              <a className="un">Discord</a>
            </div>
            <div className="navbar_list">
              <a className="un">Twitter</a>
            </div>
            <div className="navbar_list">
              <a className="un">Open Sea</a>
            </div>
          </div>
          <div></div>
        </div>
        <div className="left_part">
          <div className="text_description">
            <h3>Rat Race NFT</h3>
            <p>
              Le ticket d'entrée au HedgeFund Étant réservé aux plus fortunés a
              ce jour, Meta Trader Society(MTS) a pour but d'en démocratiser
              l’accès via la création d'un hedge fund collaboratif (DAO), où les
              trade seront effectuer par bot de trading, crée grâce à
              l'intelligence artificielle. Dans le but de Créer cette DAO, nous
              avons besoins d'établir notre communauté et pour ce faire nous
              allons créer trois séries de NFT. Ceci est le page web de notre
              Première série Libérez vous de la Rat Race! Minter un Rat!!
            </p>

            <p>
              En plus de l'oeuvre designer par (Nom de l'auteur), cette première
              série vous donnera des avantages pour les étapes suivantes de
              notre roadmap mais également accés a un bot de trading (insérer
              les specs du bot ici(AI,MT4, etc..)).
            </p>
          </div>
          <div className="div_title_NFT">
            <p>RatReace_15</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
