import Navbar from "../components/Navbar";
import { Fragment, useEffect, useState } from "react";
import { getIntentosPrevAcomodo } from "../services/StatusService";
import ColumnGraph from "../components/ColumnGraph";
import DashboardsStyle from "../styles/DashboardsStyle.css";
import PieGraph from "../components/PieGraph";

function DashboardPage() {
  const [intentosPrevAcomodoData, setIntentosPrevAcomodoData] = useState([]);
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
  }, []);

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
                </div>
            </div>
        </div> */}
      <Fragment>
        <div className="dashboards-main-container">
          <div className="header">
            <p className="title">Dashboards</p>
          </div>
          <div className="dashboards-container">
            <div className="dashboards-item">
              <div className="dashboard-item-title">
                Número de intentos incorrectos
              </div>
              <ColumnGraph
                data={intentosPrevAcomodoData}
                xField={"fecha"}
                yField={"conteo"}
              />
            </div>
            <div className="dashboards-item">
              <div className="dashboard-item-title">
                Productos mal acomodados
              </div>
              <PieGraph />
            </div>
          </div>
        </div>
      </Fragment>
    </>
  );
}

export default DashboardPage;
