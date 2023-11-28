import React, { Fragment, useEffect, useState } from "react";
import { Select } from "evergreen-ui";
import "../styles/ValidatePlanogram.css";
import { postPlanogram } from "../services/PlanogramService";
import Gondola from "../assets/gondola.jpeg";
import { toast } from "react-toastify";

function ValidatePlanogram(props) {
  const [actualMatrizProductos, setActualMatrizProductos] = useState([]);
  const imageDiv = React.createRef();

  useEffect(() => {
    console.log("r", props.planogramData); 
    console.log("a", actualMatrizProductos)
  }
  , [actualMatrizProductos]);

  useEffect(() => {
    setActualMatrizProductos(JSON.parse(JSON.stringify(props.planogramData.matriz_productos.productos)));
    // setActualMatrizProductos([...props.planogramData.matriz_productos.productos]);
  }, [props.planogramData]);

  useEffect(() => {
    if (imageDiv.current) {
      imageDiv.current.style.backgroundImage = `url(${
        props.imagen ? URL.createObjectURL(props.imagen) : Gondola
      })`;
    }
  }, [props.imagen]);

    const handleValidatePlanogram = async () => {
      toast.promise( async () => {
        try {

          let accuracy = 0;
          let totalProducts = 0;
          for (let i = 0; i < actualMatrizProductos.length; i++) {
            for (let j = 0; j < actualMatrizProductos[i].length; j++) {
              if (props.planogramData.matriz_productos.productos[i][j] === actualMatrizProductos[i][j]) {
                accuracy++;
              }
              totalProducts++;
            }
          }
          accuracy = (accuracy / totalProducts) * 100;
          props.setAccuracy(accuracy);

          props.planogramData.matriz_productos.productos = actualMatrizProductos;
          props.planogramData.accuracy = accuracy;

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
          console.log("error", error);
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
        <div className="validate-imagenSubida" style={{ backgroundSize: "contain",
              backgroundRepeat: "no-repeat"}} ref={imageDiv}>
        </div>
        <div className="clasificacionContainer">      
      {actualMatrizProductos ? actualMatrizProductos.map((rowProducts, rowIndex) => {
        return (
          <div key={rowIndex} className="estanteContainer">
            <p key={`estante-p-${rowProducts}`} className="estanteHeader">Repisa {rowIndex + 1}</p>
            {rowProducts.map((productClassification, columnIndex) => {
              return (
                <div key={`product-container-${columnIndex}-${rowIndex}`} className="productContainer">
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
