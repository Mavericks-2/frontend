import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { getIntentosPrevAcomodo } from "../services/StatusService";

function DashboardPage() {
  const [intentosPrevAcomodoData, setIntentosPrevAcomodoData] = useState([]);

  useEffect(() => {
    getIntentosPrevAcomodo()
      .then((data) => {
        setIntentosPrevAcomodoData(data);
      })
      .catch((error) => {
        console.error("Error fetching number of attempts before correct placement: ", error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>Dashboard</h1>
            <ul>
              {intentosPrevAcomodoData.length > 0 ? (
                intentosPrevAcomodoData.map((intentos, index) => (
                  <li key={index}>
                    <p>Id Acomodador: {intentos.id_acomodador}</p>
                    <p>Fecha: {intentos.fecha}</p>
                    <p>Conteo: {intentos.conteo}</p>
                    <p>Nombre Acomodador: {intentos.statusAcomodador.nombre}</p>
                  </li>
                ))
              ) : (
                <p>Cargando datos...</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
