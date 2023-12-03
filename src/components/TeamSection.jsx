import React from "react";
import "../styles/TeamSectionStyle.css";
import PabloPP from "../assets/pablo-pp.jpeg";
import AngelPP from "../assets/angel-pp.jpeg";
import EliPP from "../assets/eli-pp.jpeg";
import GabyPP from "../assets/gaby-pp.jpeg";
import ZayPP from "../assets/zay-pp.jpeg";
import AnaPP from "../assets/ana-pp.jpeg";
import ChemaPP from "../assets/chema-pp.jpeg";
import ErikaPP from "../assets/erika-pp.jpeg";

function TeamSection() {
  return (
    <div class="team-main-container">
      <div class="col-md-4 col-sm-6">
        <div class="box">
          <img src={PabloPP} className="imageEquipo" />
          <div class="box-content">
            <h3 class="title">Pablo Gonzalez de la Parra</h3>
            <span class="post">ING. TECNOLOGÍAS COMPUTACIONALES</span>
          </div>
        </div>
      </div>
      <div class="col-md-4 col-sm-6">
        <div class="box">
          <img src={AngelPP} className="imageEquipo" />
          <div class="box-content">
            <h3 class="title">Jose Angel Garcia Gomez</h3>
            <span class="post">ING. TECNOLOGÍAS COMPUTACIONALES</span>
          </div>
        </div>
      </div>
      <div class="col-md-4 col-sm-6">
        <div class="box">
          <img src={ErikaPP} className="imageEquipo" />
          <div class="box-content">
            <h3 class="title">Erika Marlene García Sanchez</h3>
            <span class="post">ING. TECNOLOGÍAS COMPUTACIONALES</span>
          </div>
        </div>
      </div>
      <div class="col-md-4 col-sm-6">
        <div class="box">
          <img src={EliPP} className="imageEquipo" />
          <div class="box-content">
            <h3 class="title">Elisa Sanchez Bahnsen</h3>
            <span class="post">ING. CIENCIA DE DATOS Y MATEMÁTICAS</span>
          </div>
        </div>
      </div>
      <div class="col-md-4 col-sm-6">
        <div class="box">
          <img src={GabyPP} className="imageEquipo" />
          <div class="box-content">
            <h3 class="title">Gabriela Cortes Olvera</h3>
            <span class="post">ING. CIENCIA DE DATOS Y MATEMÁTICAS</span>
          </div>
        </div>
      </div>
      <div class="col-md-4 col-sm-6">
        <div class="box">
          <img src={ZayPP} className="imageEquipo" />
          <div class="box-content">
            <h3 class="title">Zaide Islas Montiel</h3>
            <span class="post">ING. CIENCIA DE DATOS Y MATEMÁTICAS</span>
          </div>
        </div>
      </div>
      <div class="col-md-4 col-sm-6">
        <div class="box">
          <img src={AnaPP} className="imageEquipo" />
          <div class="box-content">
            <h3 class="title">Ana Martínez Barbosa</h3>
            <span class="post">ING. CIENCIA DE DATOS Y MATEMÁTICAS</span>
          </div>
        </div>
      </div>
      <div class="col-md-4 col-sm-6">
        <div class="box">
          <img src={ChemaPP} className="imageEquipo" />
          <div class="box-content">
            <h3 class="title">José María Ibarra Pérez</h3>
            <span class="post">ING. CIENCIA DE DATOS Y MATEMÁTICAS</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamSection;
