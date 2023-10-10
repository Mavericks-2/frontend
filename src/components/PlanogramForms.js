import PlanogramFormsStyles from "../styles/PlanogramFormsStyles.css";
import { useState } from "react";

function PlanogramForms(props) {

  return (
    <div className="PlanogramForms">
      <div className="InputBlock">
        <p>Número de Estantes</p>
        <input
          type="number"
          style={{textAlign: 'center'}}
          onChange={(event) => {
            props.setRows(event.target.value);
          }}
          value={props.rows}
        />
      </div>
      <a
        onClick={() => {
          props.setIsRowsConfigured(true);
        }}
      >
        <button>
          <h2>Acomodar estantes para continuar</h2>
        </button>
      </a>
      {props.isRowsConfigured ? (
        <>
          {Array.from({ length: parseInt(props.rows) }, (_, index) => (
            <div className="InputBlock" key={index}>
              <p>Número de productos en repisa #{index + 1}</p>
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
              <button onClick={()=>{
                props.setRows(0)
                props.setIsRowsConfigured(false)
                }}>
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
