import React, { useEffect, useState } from "react";
import Navbar from "./Nav";
import  {gsap, TimelineMax} from "gsap"
import { CSSTransition, TransitionGroup } from "react-transition-group";

let i = 1;
const Home = () => {
  const [images, setImages] = useState();
  const [name, setNames] = useState();
  const data = [
    {
      image: "../img/1.png",
      name: "RatRace_1",
    },
    {
      image: "../img/4.png",
      name: "RatRace_4",
    },
    {
      image: "../img/5.png",
      name: "RatRace_5",
    },
    {
      image: "../img/43.png",
      name: "RatRace_43",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setImages(data[i].image);
      setNames(data[i].name);
      i++;
      if (i == 4) i = 0;
      const thisImage = document.querySelector("#slider");
      const thisText = document.querySelector("#sliderText");
      var tl = new TimelineMax();
      setTimeout(() => {
        tl.from(thisText, 1, { scaleX: 0, transformOrigin: "left" });
        gsap.from(thisImage, { duration: 1, ease:"expo.out", y: -200 })
      },100)
    }, 5000);
    

    return () => clearInterval(interval);
  });

  return (
    <>
      {/* <Navbar /> */}
      <div className="home_comonent">
        <div className="right_part">
            <img id="slider" src={images ? images :"../img/1.png" } />
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
          <div id="sliderText" className="div_title_NFT">
            <p>{name ? name : "RatRace_1"}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
