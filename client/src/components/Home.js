import React, { useEffect, useState } from "react";
import Navbar from "./Nav";
import { gsap, TimelineMax } from "gsap";

let i = 1;
const Home = () => {
  const [images, setImages] = useState();
  const [name, setNames] = useState();
  const data = [
    {
      image: "../img/429.png",
      name: "RatRace_429",
    },
    {
      image: "../img/103.png",
      name: "RatRace_103",
    },
    {
      image: "../img/5.png",
      name: "RatRace_450",
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
      let tl = new TimelineMax();
      let tl2 = gsap.timeline({ paused: true });
      //   setTimeout(() => {
      tl.from(thisImage, 0.3, { scaleY: 0, transformOrigin: "bottom" });
      tl.from(thisText, 1, { scaleX: 0, transformOrigin: "left" });

      //   gsap.from(thisImage, { duration: 2, ease: "expo.out", y: 200 });
      //   }, 100);
    }, 5000);

    return () => clearInterval(interval);
  });

  return (
    <>
      <div className="home_comonent" id="home">
        <div className="right_part">
          <img id="slider" src={images ? images : "../img/1.png"} />
          <div className="bottom_navbar">
            <a href="https://opensea.io/" target={"_blank"}>
              <div className="navbar_list">
                <a className="un">Discord</a>
              </div>
            </a>
            <a href="https://opensea.io/" target={"_blank"}>
              <div className="navbar_list">
                <a className="un">Twitter</a>
              </div>
            </a>
            <a
              href="https://testnets.opensea.io/collection/ratrace"
              target={"_blank"}
            >
              <div className="navbar_list">
                <a className="un">Open Sea</a>
              </div>
            </a>
          </div>
          <div></div>
        </div>
        <div className="left_part">
          <div className="text_description">
            <h3>Rat Race NFT</h3>
            <p>
              Le ticket d'entr??e au Hedge Fund ??tant r??serv?? aux plus fortun??s a
              ce jour, Meta Trader Society(MTS) a pour but d'en d??mocratiser
              l???acc??s via la cr??ation d'un hedge fund collaboratif (DAO), o?? les
              trade seront effectuer par bot de trading, cr??e gr??ce ??
              l'intelligence artificielle. Dans le but de Cr??er cette DAO, nous
              avons besoins d'??tablir notre communaut?? et pour ce faire nous
              allons cr??er trois s??ries de NFT. Ceci est le page web de notre
              Premi??re s??rie Lib??rez vous de la Rat Race! Minter un Rat!!
            </p>
            <p>
              En plus de l'oeuvre d??signer par (Nom de l'auteur), cette premi??re
              s??rie vous donnera des avantages pour les ??tapes suivantes de
              notre roadmap mais ??galement acc??s ?? un bot de trading (ins??rer
              les specs du bot ici(AI,MT4, etc..)).
            </p>
          </div>
          <div id="sliderText" className="div_title_NFT">
            <p>{name ? name : "RatRace_875"}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
