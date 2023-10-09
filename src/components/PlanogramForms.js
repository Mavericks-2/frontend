import PlanogramFormsStyles from "../styles/PlanogramFormsStyles.css";
import { useState } from "react";

function PlanogramForms() {
  const [showColumnConfig, setShowColumnConfig] = useState(false);
  const [numRows, setNumRows] = useState(0);

  return (
    <div className="PlanogramForms">
      <div className="InputBlock">
        <p>Número de Estantes</p>
        <input
          type="text"
          onChange={(event) => {
            setNumRows(event.target.value);
          }}
        />
      </div>
      <a
        href="#"
        onClick={() => {
          setShowColumnConfig(true);
        }}
      >
        <button>
          <h2>Acomodar estantes para continuar</h2>
        </button>
      </a>
      {showColumnConfig ? (
        <>
          {Array.from({ length: parseInt(numRows) }, (_, index) => (
            <div className="InputBlock" key={index}>
              <p>Número de productos en columna #{index + 1}</p>
              <input type="text" />
            </div>
          ))}
          <a>
            <button>
              <h2>Acomodar productos para continuar</h2>
            </button>
          </a>
          <div className="finalButtons">
            <a className="shortButton">
              <button >
                <h2>Reiniciar</h2>
              </button>
            </a>
            <a className="shortButton">
              <button >
                <h2>Continuar</h2>
              </button>
            </a>
          </div>
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default PlanogramForms;
