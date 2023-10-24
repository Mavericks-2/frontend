import React from 'react';
import PlanogramSquareStyles from "../styles/PlanogramSquareStyles.css";
import FinalizadoStyles from "../styles/FinalizadoStyles.css";
import { useNavigate } from 'react-router-dom';


function Finalizado() {
    const navigation = useNavigate();
  return (
    <div className='PlanogramSquare'>
        <div className='finalizado-container'>
            <div className='finalizado-container--header'>
                <p className='finalizado-container-header-title'>¡Listo!</p>
            </div>
            <div className='finalizado-container--body'>
                <p className='finalizado-container-body-text'>Gracias por utilizar el configurador</p>
            </div>
            <div className='finalizado-button' onClick={()=>{
                navigation('/')
            }}>
                <p>Volver</p>
            </div>
        </div>
    </div>
  )
}

export default Finalizado