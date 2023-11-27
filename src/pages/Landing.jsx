import React, { Fragment } from "react";
import TeamSection from "../components/TeamSection";
import LandingStyles from "../styles/LandingStyles.css";

function Landing() {
  return (
    <Fragment>
      <div className="landing-main-container">
        <div className="main-text">
          <h1 className="title">Shelfmate</h1>
          <p className="description">
            Descubre la nueva forma de configurar planogramas.{" "}
          </p>
        </div>
        <div className="second-text">
          <h2 className="title">
            <span className="first-title">Configura una vez.</span>
            <br />
            <span className="second-title">Verifica en segundos.</span>
          </h2>
          <div className="landing-buttons">
            <a href="#objetivo" className="call-to-action">
              Conoce más
            </a>
            <a href="/home" className="call-to-action">
              Descubre cómo
            </a>
          </div>
        </div>
      </div>

      <div className="landing-about-us" id="objetivo">
        <div className="about-us-text partial-viewport">
          <h2 className="title">Nuestro objetivo</h2>
          <p className="description">
            Estamos en busca de una innovación significativa en la configuración
            de planogramas para tiendas <b>OXXO</b>, con el objetivo clave de{" "}
            <b> simplificar y acelerar</b> este proceso fundamental.
            <br />
            <br />
            Reconocemos los desafíos actuales asociados con la complejidad y la
            demanda de adaptabilidad en un mercado en constante cambio. La
            solución propuesta implica el desarrollo de una plataforma avanzada
            que integra inteligencia artificial y aprendizaje automático para
            poder identificar automáticamente los productos capturados. Con este
            enfoque, anticipamos beneficios significativos, incluida una mejora
            sustancial en la eficiencia operativa al{" "}
            <b>reducir el tiempo dedicado</b> a la configuración de planogramas,
            una mayor capacidad de <b>adaptación a los cambios</b> del mercado y
            una <b>optimización </b>
            general de las ventas al mejorar la disposición de productos para
            maximizar la visibilidad y la atracción del cliente. Con esta
            iniciativa, aspiramos a proporcionar a <b>OXXO</b> una herramienta
            integral que les permita centrarse en lo que realmente importa:{" "}
            <b>Vender.</b>
          </p>
          <a href="#equipo" className="equipo-button">
            Conoce al equipo
          </a>
        </div>
      </div>

      <div className="landing-about-us" id="equipo">
        <div className="about-us-text total-viewport">
          <h2 className="title">Equipo</h2>
          <TeamSection />
        </div>
      </div>
    </Fragment>
  );
}

export default Landing;
