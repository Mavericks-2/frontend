import OxxoLogo from "../assets/oxxo_logo.png";
import User from "../assets/user.png";
import NavbarStyles from "../styles/NavbarStyles.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import { Context } from "../pages/RoutesPages";
import Cookies from "js-cookie";
import { toast } from "react-toastify";


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
      setTitle("Iniciar Sesión");
      setUserData(null);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="Navbar">
      <a href="/" className="OxxoLogoLink">
        <img className="OxxoLogo" src={OxxoLogo} alt="Oxxo Logo" />
      </a>
      <h1 className="Title">Administrador</h1>
      <a className="UserLink" href="#" onClick={
        handleTitle
      }>
        <img className="User" src={User} alt="User" />
        <p className="UserName">{  title}</p>
      </a>
    </div>
  );
}

export default Navbar;
