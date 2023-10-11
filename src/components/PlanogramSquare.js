import { Fragment, useEffect, useState } from "react";
import PlanogramSquareStyles from "../styles/PlanogramSquareStyles.css";
import Gondola from "../assets/gondola.jpeg";
import PlanogramForms from "./PlanogramForms";
import PlanogramConfigurator from "./PlanogramConfigurator";

function PlanogramSquare() {
  const [showForm, setShowForm] = useState(false);
  const [rows, setRows] = useState(0);
  const [isRowsConfigured, setIsRowsConfigured] = useState(false);
  const [columnProducts, setColumnProducts] = useState([]);

  useEffect(() => {
    if (rows > 0) {
      setColumnProducts(Array.from({ length: parseInt(rows) }, (_, index) => 0));
    }
  }, [rows]);

  return (
    <div className="PlanogramSquare">
      <h1>¿Estás listo para subir la configuración?</h1>
      {showForm ? (
        <Fragment>
          <PlanogramConfigurator rows={rows} isRowsConfigured={isRowsConfigured} columnProducts={columnProducts} />
          <PlanogramForms rows={rows} setRows={setRows} isRowsConfigured={isRowsConfigured} setIsRowsConfigured={setIsRowsConfigured} columnProducts={columnProducts} setColumnProducts={setColumnProducts} />
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
