/**
 * @fileOverview Componente que renderiza una barra de navegación.
 *
 * @component Navbar
 *
 * @requires react
 * @requires react-router-dom
 * @requires react-toastify
 * @requires js-cookie
 * @requires src/assets/oxxo_logo.png
 * @requires src/assets/user.png
 * @requires src/assets/dashboard.png
 * @requires src/styles/NavbarStyles.css
 * 
 * 
 * @example
 *   <Navbar />
 * 
 */

import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import OxxoLogo from "../assets/oxxo_logo.png";
import User from "../assets/user.png";
import Dashboard from "../assets/dashboard.png";
import { Context } from "../pages/RoutesPages";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import NavbarStyles from "../styles/NavbarStyles.css";


function Navbar() {
  const [title, setTitle] = useState("Iniciar Sesión");
  const { userData, setUserData } = useContext(Context);

  const navigate = useNavigate();
  useEffect(() => {
    if (!userData){
      const userToken = Cookies.get("userToken");
      const name = Cookies.get("name");
      const lastName = Cookies.get("lastName");
      if (userToken && name && lastName) {
        setUserData({ userToken, name, lastName });
      }
    }
  }, []);

  useEffect(() => {
    if (userData) {
      setTitle("Cerrar Sesión");
    } else {
      setTitle("Iniciar Sesión");
    }
  }, [userData]);

  const handleTitle = () => {
    if (title === "Cerrar Sesión") {
      toast.promise(
        async () => {
            Cookies.remove("userToken");
            setTitle("Iniciar Sesión");
        },
        {
          pending: "Cerrando sesión...",
          success: "Sesión cerrada",
          error: "Error al cerrar sesión",
        }, {
          pauseOnFocusLoss: false,
          pauseOnHover: false,
          autoClose: 3000,
        }
      )
      Cookies.remove("userToken");
      Cookies.remove("name");
      Cookies.remove("lastName");
      Cookies.remove("id_manager");
      Cookies.remove("awsCognitoId");
      setTitle("Iniciar Sesión");
      setUserData(null);
    } else {
      navigate("/login");
    }
  };

  const handleDashboard = () => {
    if (!userData) {
      toast.error("Inicia sesión para continuar");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="Navbar">
      <a href="/" className="OxxoLogoLink">
        <img className="OxxoLogo" src={OxxoLogo} alt="Oxxo Logo" />
      </a>
      <h1 className="Title">Administrador</h1>
      <div className="right">
        <a className="DashboardLink" onClick={handleDashboard} >
          <img className="DashboardImg" src={Dashboard} alt="Dashboard" />
        </a>
        <a className="UserLink" href="#" onClick={
          handleTitle
        }>
          <img className="User" src={User} alt="User" />
          <p className="UserName">{  title}</p>
        </a>
      </div>
    </div>
  );
}

export default Navbar;
