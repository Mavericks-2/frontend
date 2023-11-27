/**
 * @fileOverview Componente que muestra la interfaz inicial del configurador de planogramas.
 *
 * @component PlanogramSquare
 *
 * @requires react
 * @requires ../assets/gondola.jpeg
 * @requires ../styles/PlanogramSquareStyles.css
 * @requires ./PlanogramForms
 * @requires ./PlanogramConfigurator
 * @requires ../pages/RoutesPages
 *
 * @param setFinalizado Función para actualizar el estado de finalización del formulario.
 *
 * @example
 *  <PlanogramSquare setFinalizado={setFinalizado} />
 *
 */

import { Fragment, useEffect, useState, useContext, useRef } from "react";
import PlanogramSquareStyles from "../styles/PlanogramSquareStyles.css";
import Gondola from "../assets/gondola.jpeg";
import PlanogramForms from "./PlanogramForms";
import PlanogramConfigurator from "./PlanogramConfigurator";
import ValidatePlanogram from "./ValidatePlanogram";
import { Context } from "../pages/RoutesPages";
import { Select } from "evergreen-ui";

function PlanogramSquare(props) {
  const { uploadedFile, imageSizes } = useContext(Context);
  const [showForm, setShowForm] = useState(false);
  const [rows, setRows] = useState(0);
  const [isRowsConfigured, setIsRowsConfigured] = useState(false);
  const [columnProducts, setColumnProducts] = useState([]);
  const [rectangles, setRectangles] = useState([]);
  const [finished, setFinished] = useState(false);
  const [validateClassification, setValidateClassification] = useState(false);
  const [planogramData, setPlanogramData] = useState(null);
  const imageDiv = useRef(null);

  useEffect(() => {
    if (imageDiv.current) {
      imageDiv.current.style.backgroundImage = `url(${
        uploadedFile ? URL.createObjectURL(uploadedFile) : Gondola
      })`;
    }
  }, [uploadedFile]);

  useEffect(() => {
    if (rows > 0) {
      setColumnProducts(
        Array.from({ length: parseInt(rows) }, (_, index) => 0)
      );
    }
  }, [rows]);
  
  const productLabels = [
    "Cheetos Torciditos",
    "Chips Jalapeño",
    "Churrumais",
    "Doritos Nachos",
    "Fritos Limon y Sal",
    "Hut Nuts",
    "Pop Karameladas",
    "Rancheritos",
    "Ruffles Queso",
    "Runners",
    "Takis Fuego",
    "Takis Original",
    "Tostitos",
  ];

  return (
    <div className="PlanogramSquare">
      {validateClassification ? (
        <ValidatePlanogram
          setFinalizado={props.setFinalizado}
          planogramData={planogramData}
          setPlanogramData={setPlanogramData}
          labels={productLabels}
          imagen={ uploadedFile }
        />
      ) : (
        <Fragment>
          <h1>¿Estás listo para subir la configuración?</h1>
          <div
            style={{
              width: imageSizes.width,
              height: imageSizes.height,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
            }}
            ref={imageDiv}
          >
            <PlanogramConfigurator
              rows={rows}
              isRowsConfigured={isRowsConfigured}
              columnProducts={columnProducts}
              setRectangles={setRectangles}
              finished={finished}
              uploadedFile={uploadedFile}
            />
          </div>
          {showForm ? (
            <Fragment>
              <PlanogramForms
                rows={rows}
                setRows={setRows}
                isRowsConfigured={isRowsConfigured}
                setIsRowsConfigured={setIsRowsConfigured}
                columnProducts={columnProducts}
                setColumnProducts={setColumnProducts}
                rectangles={rectangles}
                setFinished={setFinished}
                imagen={
                  uploadedFile ? URL.createObjectURL(uploadedFile) : Gondola
                }
                imageType={uploadedFile ? uploadedFile.type : "image/jpeg"}
                setFinalizado={setValidateClassification}
                setPlanogramData={setPlanogramData}
              />
            </Fragment>
          ) : (
            <Fragment>
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
        </Fragment>
      )}
    </div>
  );
}

export default PlanogramSquare;
