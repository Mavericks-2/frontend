/**
 * @fileOverview Componente para mostrar un gráfico de barras.
 *
 * @component ColumnGraph
 *
 * @requires react
 * @requires @ant-design/charts
 * @requires src/styles/LineGraphStyle.css
 * 
 * @param {array} data Datos a mostrar en el gráfico.
 * @param {string} xField Nombre del campo que se va a mostrar en el eje X.
 * @param {string} yField Nombre del campo que se va a mostrar en el eje Y.
 * @param {string} color Color de la barra.
 * 
 * 
 * @example
 *   <ColumnGraph
        data={[{ timestamp: "2021-01-01", conteo: 1 }]}
        xField={"fecha"}
        yField={"conteo"}
        color={"orange"}
      />
 * 
 */

import React from "react";
import { Column } from "@ant-design/charts";
import LineGraphStyle from "../styles/LineGraphStyle.css";

function ColumnGraph(props) {
  const data = props.data ? props.data : [
    { year: "1991", value: 3 },
    { year: "1992", value: 4 },
    { year: "1993", value: 3.5 },
    { year: "1994", value: 5 },
    { year: "1995", value: 4.9 },
    { year: "1996", value: 6 },
    { year: "1997", value: 7 },
    { year: "1998", value: 9 },
    { year: "1999", value: 13 },
  ];

  const config = {
    data,
    height: 150,
    xField: props.xField ||"year",
    yField: props.yField ||"value",
    color:  props.color, 
    point: {
      size: 5,
      shape: "diamond | circule",
    },
    tooltip: {
      formatter: (data) => {
        return {
          name: "",
          value: data.conteo||data.timestamp,
        };
      },
      customContent: (name, data) =>
        `<div>${data?.map((item) => {
          return `<div class="tooltip-chart" >
                <span class="tooltip-item-name">${item?.name}</span>
                <span class="tooltip-item-value">${item?.value}</span>
              </div>`;
        })}</div>`,
      position: "right | left",
    },
  };
  return <Column {...config}/>

}

export default ColumnGraph;