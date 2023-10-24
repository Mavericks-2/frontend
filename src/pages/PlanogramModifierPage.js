import PlanogramSquare from '../components/PlanogramSquare';
import Finalizado from '../components/Finalizado';
import Navbar from "../components/Navbar";
import React, { useState } from 'react';

function PlanogramModifierPage() {
  const [finalizado, setFinalizado] = useState(false);
  return (
    <>
      <Navbar />
      {
        finalizado ? <Finalizado /> : <PlanogramSquare setFinalizado={setFinalizado} />
      }
    </>
  );
}

export default PlanogramModifierPage;
