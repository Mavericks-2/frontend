import React from "react";
import "../styles/TeamSectionStyle.css";
import PabloPP from "../assets/pablo-pp.jpeg";
import AngelPP from "../assets/angel-pp.jpeg";
import EliPP from "../assets/eli-pp.jpeg";
import GabyPP from "../assets/gaby-pp.jpeg";
import ZayPP from "../assets/zay-pp.jpeg";

function TeamSection() {
  return (
    <div class="team-main-container">
      <div class="col-md-4 col-sm-6">
        <div class="box">
          <img src={PabloPP} className="imageEquipo" />
          <div class="box-content">
            <h3 class="title">Pablo Gonzalez de la Parra</h3>
            <span class="post">Web Designer</span>
          </div>
        </div>
      </div>
      <div class="col-md-4 col-sm-6">
        <div class="box">
          <img src={AngelPP} className="imageEquipo" />
          <div class="box-content">
            <h3 class="title">Jose Angel Garcia Gomez</h3>
            <span class="post">Web Developer</span>
          </div>
        </div>
      </div>
      <div class="col-md-4 col-sm-6">
        <div class="box">
          <img src={EliPP} className="imageEquipo" />
          <div class="box-content">
            <h3 class="title">Elisa Sanchez Bahnsen</h3>
            <span class="post">Web Developer</span>
          </div>
        </div>
      </div>
      <div class="col-md-4 col-sm-6">
        <div class="box">
          <img src={GabyPP} className="imageEquipo" />
          <div class="box-content">
            <h3 class="title">Gabriel Cortes Olvera</h3>
            <span class="post">Web Developer</span>
          </div>
        </div>
      </div>
      <div class="col-md-4 col-sm-6">
        <div class="box">
          <img src={ZayPP} className="imageEquipo" />
          <div class="box-content">
            <h3 class="title">Zaide Islas Montiel</h3>
            <span class="post">Web Developer</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamSection;
