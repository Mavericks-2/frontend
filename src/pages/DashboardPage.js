/**
 * @fileOverview Componente que muestra la interfaz de visualización de gráficos.
 *
 * @component DashboardPage
 *
 * @requires react
 * @requires ../components/Navbar
 * @requires ../services/StatusService
 * @requires ../components/ColumnGraph
 * @requires ../components/PieGraph
 * @requires ../components/LineGraph
 * @requires ../components/GaugePlot
 * @requires ../components/GroupedGraph
 * @requires ../styles/DashboardsStyle.css
 * 
 * @example
 *  <DashboardPage />
 */

import Navbar from "../components/Navbar";
import { Fragment, useEffect, useState } from "react";
import {
  getIntentosPrevAcomodo,
  getMatrizDiferencias,
  getFechasStatus,
} from "../services/StatusService";
import ColumnGraph from "../components/ColumnGraph";
import DashboardsStyle from "../styles/DashboardsStyle.css";
import PieGraph from "../components/PieGraph";
import LineGraph from "../components/LineGraph";
import GaugePlot from "../components/GaugePlot";
import GroupedGraph from "../components/GroupedGraph";

function DashboardPage() {
  const [intentosPrevAcomodoData, setIntentosPrevAcomodoData] = useState([]);
  const [matrizDiferenciaData, setMatrizDiferenciaData] = useState([]);
  const [fechasStatusData, setFechasStatusData] = useState([]);
  const [decimal, setDecimal] = useState(0);
  const [promedioIntentosMalos, setPromedioIntentosMalos] = useState(0);
  const [promProdFallidosResultado, setPromProdFallidosResultado] =
    useState(null);
  const matrizProdIncorrectos = [];
  const [productoMasErrores, setProductoMasErrores] = useState(null);

  useEffect(() => {
    getIntentosPrevAcomodo()
      .then((data) => {
        setIntentosPrevAcomodoData(data);
        setPromedioIntentosMalos(promedioIntentosInc(data).toFixed(1));
      })
      .catch((error) => {
        console.error(
          "Error fetching number of attempts before correct placement: ",
          error
        );
      });
    getMatrizDiferencias()
      .then((data) => {
        setMatrizDiferenciaData(data);
      })
      .catch((error) => {
        console.error("Error fetching difference matrix: ", error);
      });
    getFechasStatus()
      .then((data) => {
        setFechasStatusData(data);
        setDecimal(calcularDecimal(data));
      })
      .catch((error) => {
        console.error("Error fetching status dates: ", error);
      });
  }, []);

  function formatFecha(fecha) {
    const parts = fecha.split("-");
    return `${parts[2]}/${parts[1]}`;
  }

  function contarUnosEnMatriz(matrices) {
    const matricesArray = JSON.parse(`[${matrices}]`);

    let contadorUnos = 0;

    matricesArray.forEach((matriz) => {
      matriz.forEach((fila) => {
        fila.forEach((elemento) => {
          if (elemento === 1) {
            contadorUnos++;
          }
        });
      });
    });
    matrizProdIncorrectos.push(contadorUnos);
    return contadorUnos;
  }

  function contarProductos(matricesProductosF) {
    const matricesProductosFArray = JSON.parse(`[${matricesProductosF}]`);
    const productoCount = {};
    matricesProductosFArray.forEach((matriz) => {
      if (Array.isArray(matriz)) {
        matriz.forEach((fila) => {
          if (Array.isArray(fila)) {
            fila.forEach((producto) => {
              if (productoCount[producto]) {
                productoCount[producto]++;
              } else {
                productoCount[producto] = 1;
              }
            });
          }
        });
      }
    });
    return productoCount;
  }

  const productosContados = contarProductos(
    matrizDiferenciaData.map((item) => item.matricesProductosF)
  );

  const productosContadosArray = Object.keys(productosContados).map(
    (producto) => ({
      producto: producto,
      count: productosContados[producto],
    })
  );

  function calcularDecimal(data) {
    const size = data.length;
    const correctos = data.reduce((contador, item) => {
      if (item.timestamp === 0) {
        contador++;
      }
      return contador;
    }, 0);
    return correctos / size;
  }

  function promedioIntentosInc(data) {
    const length = data.length;
    let intentosIncorrectos = 0;
    data.map((item) => {
      intentosIncorrectos += item.conteo;
    });
    return intentosIncorrectos / length;
  }

  const promProdFallidos = (async () => {
    while (matrizProdIncorrectos.length === 0) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    const total = matrizProdIncorrectos.reduce(
      (total, current) => total + current,
      0
    );
    setPromProdFallidosResultado((total / matrizDiferenciaData.length).toFixed(1));
    return total / matrizDiferenciaData.length;
  })();

  function promedioTiempoAcomodo() {
    const sumaTimestamp = fechasStatusData.reduce(
      (total, item) => total + item.timestamp,
      0
    );
    return sumaTimestamp / fechasStatusData.length;
  }

  const obtenerProductoConMayorCount = (async () => {
    while (productosContadosArray.length === 0) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    if (!productoMasErrores && productosContadosArray.length > 0) {
      const matrixMaxCount = productosContadosArray.reduce(
        (max, current) => (current.count > max.count ? current : max),
        productosContadosArray[0]
      );
      setProductoMasErrores(matrixMaxCount.producto);
      return matrixMaxCount.producto;
    }
  })();

  return (
    <Fragment>
      <Navbar />
      <div className="dashboards-main-container">
        <div className="header">
          <p className="title">Visualización de dashboards</p>
        </div>

        <div className="dashboards-container">
          <div className="dashboards-item">
            <div className="dashboard-item-title">
              Número de intentos incorrectos
            </div>
            <ColumnGraph
              data={intentosPrevAcomodoData.map((item) => ({
                ...item,
                fecha: formatFecha(item.fecha),
              }))}
              xField={"fecha"}
              yField={"conteo"}
              color={"orange"}
            />
            <p>Promedio de intentos incorrectos: {promedioIntentosMalos}</p>
          </div>
          <div className="dashboards-item">
            <div className="dashboard-item-title">
              Número de productos fallidos
            </div>
            <LineGraph
              data={matrizDiferenciaData.map((item) => ({
                ...item,
                unos: contarUnosEnMatriz(item.matricesDiferencias),
                fecha: formatFecha(item.fecha),
              }))}
              xField={"fecha"}
              yField={"unos"}
            />
            <p>Promedio de productos fallidos: {promProdFallidosResultado}</p>
          </div>
          <div className="dashboards-item">
            <div className="dashboard-item-title">Productos fallidos</div>
            <PieGraph
              data={productosContadosArray}
              xField="producto"
              yField="count"
            />
            <p>
              El producto en el que más se equivocan es {productoMasErrores}
            </p>
          </div>
          <div className="dashboards-item">
            <div className="dashboard-item-title">
              Minutos entre el primer intento y el acomodo correcto
            </div>
            <ColumnGraph
              data={fechasStatusData
                .map((item) => ({
                  ...item,
                  fecha: formatFecha(item.fecha),
                  timestamp: item.timestamp.toFixed(1),
                }))
                .sort((a, b) => a.timestamp - b.timestamp)}
              xField={"fecha"}
              yField={"timestamp"}
              color={"#8B0000"}
            />
            <p>
              Promedio del tiempo: {promedioTiempoAcomodo().toFixed(1)} minutos
            </p>
          </div>
          <div className="dashboards-item">
            <div className="dashboard-item-title">
              Porcentaje de acomodos a la primera
            </div>
            <GaugePlot data={decimal} />
          </div>
          <div className="dashboards-item">
            <div className="dashboard-item-title">
              Colaboradores y sus errores
            </div>
            <GroupedGraph
              data={intentosPrevAcomodoData.map((item) => ({
                ...item,
                fecha: formatFecha(item.fecha),
                nombre: item.statusAcomodador.nombre,
              }))}
              xField={"fecha"}
              yField={"conteo"}
              seriesField={"nombre"}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default DashboardPage;
