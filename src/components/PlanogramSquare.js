import PlanogramSquareStyles from "../styles/PlanogramSquareStyles.css";
import Gondola from "../assets/gondola.jpeg";
import PlanogramForms from "./PlanogramForms";
import { useState } from "react";

function PlanogramSquare() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="PlanogramSquare">
      <h1>¿Estás listo para subir la configuración?</h1>
      <img src={Gondola} alt="Planograma" />
      {showForm ? (
        <PlanogramForms />
      ) : (
        <a
          href="#"
          onClick={() => {
            setShowForm(true);
          }}
        >
          <button>
            <h2>Comenzar</h2>
          </button>
        </a>
      )}
    </div>
  );
}

export default PlanogramSquare;
