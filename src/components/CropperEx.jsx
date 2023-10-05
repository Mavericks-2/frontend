import React from "react";
import PlanogramCropper from "./PlanogramCropper";
import Gondola from "../assets/gondola.jpeg";

function CropperEx() {
  const x1 = 100;
  const x2 = 300;
  const y1 = 50;
  const y2 = 250;

  return (
    <div className="App">
      <h1>Recorte de Imagen</h1>
      <PlanogramCropper
        imageUrl={Gondola}
        x1={x1}
        x2={x2}
        y1={y1}
        y2={y2}
      />
    </div>
  );
}

export default CropperEx;
