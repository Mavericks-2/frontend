/**
 * @fileOverview Componente que renderiza un gráfico de tipo Gauge.
 *
 * @component GaugePlot
 *
 * @requires react
 * @requires react-router-dom
 * @requires @ant-design/plots
 * 
 * @param {array} data Datos a mostrar en el gráfico.
 * 
 * @example
 *   <GaugePlot />
 * 
 */

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Gauge } from '@ant-design/plots';

const DemoGauge = (props) => {
    // console.log(props.data);
    const percent = props.data;
    // console.log(percent);
    const config = {
    percent: percent || 0.7,
    range: {
      ticks: [0, 1 / 3, 2 / 3, 1],
      color: ['#F4664A', '#FAAD14', '#30BF78'],
    },
    indicator: {
      pointer: {
        style: {
          stroke: '#D0D0D0',
        },
      },
      pin: {
        style: {
          stroke: '#D0D0D0',
        },
      },
    },
    statistic: {
      content: {
        style: {
          fontSize: '36px',
          lineHeight: '36px',
        },
      },
    },
  };
  return <Gauge {...config} />;
};

export default DemoGauge;