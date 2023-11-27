/**
 * @fileOverview Componente que maneja el formulario de configuración del planograma.
 *
 * @component PlanogramForms
 *
 * @requires react
 * @requires react-toastify
 * @requires js-cookie
 * @requires src/pages/RoutesPages
 * @requires src/services/PlanogramService
 * @requires src/styles/PlanogramFormsStyles.css
 * 
 * @param {Array} rows Número de estantes.
 * @param {boolean} isRowsConfigured Indica si el número de estantes ya fue configurado.
 * @param {Array} columnProducts Número de productos por estante.
 * @param {boolean} finished Indica si el formulario ya fue completado.
 * @param {Array} rectangles Arreglo de rectángulos que representan los productos.
 * @param {function} setRows Función para actualizar el número de estantes.
 * @param {function} setIsRowsConfigured Función para actualizar el estado de configuración de estantes.
 * @param {function} setColumnProducts Función para actualizar el número de productos por estante.
 * @param {function} setFinished Función para actualizar el estado de finalización del formulario.
 * @param {function} setRectangles Función para actualizar el arreglo de rectángulos.
 * 
 *  
 * @example
 *  <PlanogramForms 
 *   rows={rows}
 *   isRowsConfigured={isRowsConfigured}
 *   columnProducts={columnProducts}
 *   finished={finished}
 *   rectangles={rectangles}
 *   setRows={setRows}
 *   setIsRowsConfigured={setIsRowsConfigured}
 *   setColumnProducts={setColumnProducts}
 *   setFinished={setFinished}
 *   setRectangles={setRectangles}
 *   />
 * 
 */

import { useEffect, useContext } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { Context } from "../pages/RoutesPages";
import {
  postPlanogramModel,
  postPlanogramProducts,
  postPlanogramImage,
} from "../services/PlanogramService";
import PlanogramFormsStyles from "../styles/PlanogramFormsStyles.css";

function PlanogramForms(props) {
  const { linePositionsContext, imageSizes } = useContext(Context);

  useEffect(() => {
    if (props.rectangles.length > 0) {
      post();
    }
  }, [props.rectangles]);

  const post = async () => {
    toast.promise(
      async () => {
        await postPlanogramModel({
          imagen: props.imagen,
        });

        const url_imagen = await postPlanogramImage({
          imagen: props.imagen,
          type: props.imageType,
        });

        const matriz_productos = await postPlanogramProducts({
          coordenadas: { coordenadas: props.rectangles },
          actualSize: {
            width: imageSizes.width,
            height: imageSizes.height,
          }
        });

        const idManager = Cookies.get("id_manager");

        const planogramData = {
          url_imagen: url_imagen,
          coordenadas: { coordenadas: props.rectangles },
          id_manager: idManager,
          matriz_productos: { productos: [...matriz_productos] },
          lineas: linePositionsContext,
          accuracy: 100,
        };
        props.setPlanogramData(planogramData);
        props.setFinalizado(true);
      },
      {
        pending: "Creando planograma",
        success: "Planograma creado exitosamente",
        error: "Error al crear planograma",
      },
      {
        autoClose: 500,
        pauseOnFocusLoss: false,
        pauseOnHover: false,
        draggable: true,
      }
    );
  };

  const handleContinueClick = async () => {
    props.setFinished(true);
  };

  return (
    <div className="PlanogramForms">
      <div className="InputBlock">
        <p>Número de Estantes</p>
        <input
          type="number"
          style={{ textAlign: "center" }}
          onChange={(event) => {
            props.setRows(event.target.value);
          }}
          value={props.rows}
          disabled={props.isRowsConfigured}
          min={1}
        />
      </div>
      {!props.isRowsConfigured ? (
        <a
          onClick={() => {
            props.setIsRowsConfigured(true);
          }}
        >
          <button>
            <h2>Acomodar estantes para continuar</h2>
          </button>
        </a>
      ) : null}
      {props.isRowsConfigured ? (
        <>
          {Array.from({ length: parseInt(props.rows) }, (_, index) => (
            <div className="InputBlock" key={index}>
              <p>Número de productos en repisa #{index + 1}</p>
              <input
                type="number"
                style={{ textAlign: "center" }}
                onChange={(e) => {
                  let newColumnProducts = [...props.columnProducts];
                  newColumnProducts[index] = parseInt(e.target.value);
                  props.setColumnProducts(newColumnProducts);
                }}
                value={props.columnProducts[index]}
                min={1}
              />
            </div>
          ))}
          <div className="finalButtons">
            <a className="shortButton">
              <button
                onClick={() => {
                  props.setRows(0);
                  props.setIsRowsConfigured(false);
                  props.setColumnProducts([]);
                }}
              >
                <h2>Reiniciar</h2>
              </button>
            </a>
            <a
              className="shortButton"
              onClick={() => {
                handleContinueClick();
              }}
            >
              <button>
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
