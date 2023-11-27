/**
 * @fileOverview Componente que muestra la interfaz final del configurador.
 *
 * @component Finalizado
 *
 * @requires react
 * @requires react-router-dom
 * @requires src/styles/PlanogramSquareStyles.css
 * @requires src/styles/FinalizadoStyles.css
 * 
 * @example
 *   <Finalizado />
 * 
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import PlanogramSquareStyles from "../styles/PlanogramSquareStyles.css";
import FinalizadoStyles from "../styles/FinalizadoStyles.css";


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
            <div className='finalizado-button'>
                <p><a href='/home'>Volver</a></p>
            </div>
        </div>
    </div>
  )
}

export default Finalizado