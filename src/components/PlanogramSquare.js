import { Fragment, useState } from "react";
import PlanogramSquareStyles from "../styles/PlanogramSquareStyles.css";
import Gondola from "../assets/gondola.jpeg";
import PlanogramForms from "./PlanogramForms";
import PlanogramConfigurator from "./PlanogramConfigurator";

function PlanogramSquare() {
  const [showForm, setShowForm] = useState(false);
  const [rows, setRows] = useState(0);
  const [isRowsConfigured, setIsRowsConfigured] = useState(false);

  return (
    <div className="PlanogramSquare">
      <h1>¿Estás listo para subir la configuración?</h1>
      {showForm ? (
        <Fragment>
          <PlanogramConfigurator rows={rows} isRowsConfigured={isRowsConfigured} />
          <PlanogramForms rows={rows} setRows={setRows} isRowsConfigured={isRowsConfigured} setIsRowsConfigured={setIsRowsConfigured} />
        </Fragment>
      ) : (
        <Fragment>
          <div style={{width: 500, height: 250, backgroundImage: `url(${Gondola})`, backgroundSize: 'cover'}}/>
          <a
            onClick={() => {
              setShowForm(true);
            }}
          >
            <button>
              <h2>Comenzar</h2>
            </button>
          </a>
        </Fragment>
      )}
    </div>
  );
}

export default PlanogramSquare;
