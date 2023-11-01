import Navbar from "../components/Navbar";
import { Fragment, useEffect, useState } from "react";
import { getIntentosPrevAcomodo, getMatrizDiferencias } from "../services/StatusService";
import ColumnGraph from "../components/ColumnGraph";
import DashboardsStyle from "../styles/DashboardsStyle.css";
import PieGraph from "../components/PieGraph";
import LineGraph from "../components/LineGraph";

function DashboardPage() {
  const [intentosPrevAcomodoData, setIntentosPrevAcomodoData] = useState([]);
  const [matrizDiferenciaData, setMatrizDiferenciaData] = useState([]);
  useEffect(() => {
    getIntentosPrevAcomodo()
      .then((data) => {
        setIntentosPrevAcomodoData(data);
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
            // console.log(data);
        })
        .catch((error) => {
            console.error(
            "Error fetching difference matrix: ",
            error
            );
        });
  }, [])

  function formatFecha(fecha) {
    const parts = fecha.split('-');
    return `${parts[2]}/${parts[1]}`;
  }
  function contarUnosEnMatriz(matrices) {
    // Convierte la cadena en una matriz bidimensional
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
    
    return contadorUnos;
  }
  

  return (
    <>
      <Navbar />
      {/* <div className="container">
            <div className="row">
                <div className="col-12">
                <h1>Dashboard</h1>
                <ul>
                {intentosPrevAcomodoData.length > 0 ? (
                    intentosPrevAcomodoData.map((intentos, index) => (
                    <li key={index}>
                        <p>Id Acomodador: {intentos.id_acomodador}</p>
                        <p>Nombre Acomodador: {intentos.statusAcomodador.nombre}</p>
                        <p>Fecha: {intentos.fecha}</p>
                        <p>Conteo: {intentos.conteo}</p>
                    </li>
                    ))
                ) : (
                    <p>Cargando datos...</p>
                )}
                </ul>
                <ul>
                    {matrizDiferenciaData.length > 0 ? (
                        matrizDiferenciaData.map((matriz, index) => (
                            <li key={index}>
                                <p>Matriz: {matriz.matricesDiferencias}</p>
                                <p>Fecha: {matriz.fecha}</p>
                                </li>
                        ))
                    ) : (
                        <p>Cargando datos...</p>
                    )}
                </ul>
                </div>
            </div>
        </div> */}
      <Fragment>
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
                data={intentosPrevAcomodoData.map(item => ({
                    ...item,
                    fecha: formatFecha(item.fecha)
                  }))}
                xField={"fecha"}
                yField={"conteo"}
              />
            </div>
            <div className="dashboards-item">
              <div className="dashboard-item-title">
                Número de productos fallidos
              </div>
              <LineGraph
              data = {matrizDiferenciaData.map(item => ({
                ...item,
                unos: contarUnosEnMatriz(item.matricesDiferencias),
                fecha: formatFecha(item.fecha)
              }))}
              xField={"fecha"}          
              yField={"unos"}
              value={"unos"}
               />
            </div>
          </div>
        </div>
      </Fragment>
    </>
  );
}

export default DashboardPage;
