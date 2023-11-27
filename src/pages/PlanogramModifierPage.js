/**
 * @fileOverview Componente que maneja el componente a mostrar para los procesos de configuración de planograma.
 *
 * @component PlanogramModifierPage
 *
 * @requires react
 * @requires ../components/PlanogramSquare
 * @requires ../components/Finalizado
 * @requires ../components/Navbar
 * 
 * @example
 *  <PlanogramModifierPage />
 * 
 */

import PlanogramSquare from '../components/PlanogramSquare';
import Finalizado from '../components/Finalizado';
import Navbar from "../components/Navbar";
import React, { useState } from 'react';

function PlanogramModifierPage() {
  const [finalizado, setFinalizado] = useState(false);
  const [accuracy, setAccuracy] = useState(0);

  return (
    <>
      <Navbar />
      {
        finalizado ? <Finalizado accuracy={accuracy} /> : <PlanogramSquare setFinalizado={setFinalizado} setAccuracy={setAccuracy} />
      }
    </>
  );
}

export default PlanogramModifierPage;
