import PlanogramFormsStyles from "../styles/PlanogramFormsStyles.css";
import { useEffect, useContext } from "react";
import { postPlanogram } from "../services/PlanogramService";
import {
  postPlanogramModel,
  postPlanogramProducts,
  postPlanogramImage,
} from "../services/PlanogramService";
import { Context } from "../pages/RoutesPages";

function PlanogramForms(props) {
  const { linePositionsContext, imageSizes } = useContext(Context);

  useEffect(() => {
    if (props.rectangles.length > 0) {
      post();
    }
  }, [props.rectangles]);

  const post = async () => {
    await postPlanogramModel({ imagen: props.imagen, scaleWidth: imageSizes.width,
      scaleHeight: imageSizes.height});

    const url_imagen = await postPlanogramImage({
      imagen: props.imagen,
      type: props.imageType,
    });

    const matriz_productos = await postPlanogramProducts({
      coordenadas: { coordenadas: props.rectangles },
    });

    const planogramData = {
      url_imagen: url_imagen,
      coordenadas: {"coordenadas": props.rectangles},
      id_manager: "440e8400-e29b-41d4-a716-446655440000",
      matriz_productos: {"productos": matriz_productos},
      lineas: linePositionsContext,
    };

    const planogramResponse = await postPlanogram(planogramData);

    if (planogramResponse === "ok") {
      console.log("Planograma creado exitosamente");
    } else {
      console.log("Error al crear planograma");
    }
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
