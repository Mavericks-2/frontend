import React, { Fragment, useEffect, useState } from "react";
import { Select } from "evergreen-ui";
import "../styles/ValidatePlanogram.css";
import { postPlanogram } from "../services/PlanogramService";
import { toast } from "react-toastify";

function ValidatePlanogram(props) {
  const [actualMatrizProductos, setActualMatrizProductos] = useState([]);

  useEffect(() => {
    setActualMatrizProductos([...props.planogramData.matriz_productos.productos]);
  }, [props.planogramData]);

    const handleValidatePlanogram = async () => {
      toast.promise( async () => {
        try {
          const response = postPlanogram(props.planogramData).then((response) => {
            if (response === 'ok') {
              props.setFinalizado(true);
              return response;
            } else {
              throw response;
            }
          }).catch((error) => {
            throw error;
          });
          return response;
        } catch (error) {
          throw error;
        }
      },
        {
          pending: "Guardando configuracion...",
          success: "Configuracion guardada exitosamente",
          error: "Error al guardar configuracion",
        },
        {
          autoClose: 3000,
          pauseOnHover: false,
          draggable: true,
          pauseOnFocusLoss: false,
        }
      );
    };

  return (
    <div className="validatePlanogramContainer">
        <h2>Validación de la clasificación</h2>
        <div className="clasificacionContainer">      
      {actualMatrizProductos ? actualMatrizProductos.map((rowProducts, rowIndex) => {
        return (
          <div key={rowIndex} className="estanteContainer">
            <p key={`estante-p-${rowProducts}`} className="estanteHeader">Estante {rowIndex + 1}</p>
            {rowProducts.map((productClassification, columnIndex) => {
              return (
                <div key={`product-container-${productClassification}`} className="productContainer">
                  <p key={`p-${columnIndex}`} className="productHeader">Producto {columnIndex + 1}</p>
                  <Select key={`select-${columnIndex}`} value={productClassification} onChange={(e)=>{
                    actualMatrizProductos[rowIndex][columnIndex] = parseInt(e.target.value);
                    setActualMatrizProductos([...actualMatrizProductos]);
                  }} >
                    {props.labels ? (
                      props.labels.map((label, labelIndex) => {
                        return (
                          <option value={labelIndex} key={`option-${labelIndex}`} selected={labelIndex === productClassification}>
                            {label}
                          </option>
                        );
                      })
                    ) : (
                      <Fragment></Fragment>
                    )}
                  </Select>
                </div>
              );
            })}
          </div>
        );
      }) : (<Fragment></Fragment>)}
        </div>
        <div className="validatePlanogramButton" onClick={()=>handleValidatePlanogram()}>
          Confirmar etiquetado
        </div>
    </div>
  );
}

export default ValidatePlanogram;
