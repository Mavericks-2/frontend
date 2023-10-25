import {
  Fragment,
  useEffect,
  useState,
  useContext,
  useRef,
} from "react";
import PlanogramSquareStyles from "../styles/PlanogramSquareStyles.css";
import Gondola from "../assets/gondola.jpeg";
import PlanogramForms from "./PlanogramForms";
import PlanogramConfigurator from "./PlanogramConfigurator";
import { Context } from "../pages/RoutesPages";

function PlanogramSquare(props) {
  const { uploadedFile, imageSizes } = useContext(Context);
  const [showForm, setShowForm] = useState(false);
  const [rows, setRows] = useState(0);
  const [isRowsConfigured, setIsRowsConfigured] = useState(false);
  const [columnProducts, setColumnProducts] = useState([]);
  const [rectangles, setRectangles] = useState([]);
  const [finished, setFinished] = useState(false);
  const imageDiv = useRef(null);

  useEffect(() => {
    if (imageDiv.current){
      imageDiv.current.style.backgroundImage = `url(${uploadedFile ? URL.createObjectURL(uploadedFile) : Gondola})`;
    }
  }, [uploadedFile]);

  useEffect(() => {
    if (rows > 0) {
      setColumnProducts(
        Array.from({ length: parseInt(rows) }, (_, index) => 0)
      );
    }
  }, [rows]);
  
  return (
    <div className="PlanogramSquare">
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
            imagen={uploadedFile ? URL.createObjectURL(uploadedFile) : Gondola}
            imageType={uploadedFile ? uploadedFile.type : "image/jpeg"}
            setFinalizado={props.setFinalizado}
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
    </div>
  );
}

export default PlanogramSquare;
