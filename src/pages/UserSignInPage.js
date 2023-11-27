/**
 * @fileOverview Componente que maneja el flujo de inicio de sesión y registro de usuarios.
 *
 * @component UserSignInPage
 * 
 * @requires react
 * @requires react-router-dom
 * @requires react-toastify
 * @requires js-cookie
 * @requires ../assets/icon-sign.png
 * @requires ../assets/oxxo_logo.png
 * @requires ../styles/UserSignStyles.css
 * @requires ../services/AuthenticationService
 * @requires evergreen-ui
 * 
 * @param {string} type Tipo de inicio de sesión.
 *
 * @example
 *  <UserSignInPage type={"Registrarse"} />
 * 
 */

import React, { Fragment, useState, useEffect } from "react";
import "../styles/UserSignStyles.css";
import icon from "../assets/icon-sign.png";
import OxxoLogo from "../assets/oxxo_logo.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  signUp,
  signIn,
  verifyCode,
  getUser,
} from "../services/AuthenticationService";
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";

import { TextInputField } from "evergreen-ui";

function UserSignInPage(props) {
  const [title, setTitle] = useState(
    props.type ? props.type : "Iniciar Sesión"
  );
  const [verifyFlag, setVerifyFlag] = useState(false);
  const [disabledFlag, setDisabledFlag] = useState(false);
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    name: "",
    lastName: "",
    verifyCode: "",
  });

  const editUserInfo = (key, value) => {
    setUserInfo({ ...userInfo, [key]: value });
  };

  useEffect(() => {
    if (title === "Registrarse") {
      setDisabledFlag(verifyFlag);
    } else {
      setDisabledFlag(false);
    }
  }, [verifyFlag]);

  const registroDatosUsuario = async () => {
    toast.promise(
      async () => {
        if (verifyFlag && title === "Registrarse") {
          // Validar código de verificación
          const response = await verifyCode(userInfo);
          if (response !== "ok") {
            throw new Error("Código de verificación incorrecto");
          }
          // Iniciar sesión con usuario registrado
          const signInResponse = await signIn(userInfo);
          if (signInResponse === undefined || null) {
            navigate("/login");
          }

          // TODO: Redireccionar a página de inicio
          navigate("/home");
          // Guardar token en cookies
          Cookies.set("userToken", signInResponse);
          Cookies.set("name", userInfo.name);
          Cookies.set("lastName", userInfo.lastName);
          Cookies.set("awsCognitoId", userInfo.awsCognitoId);
          Cookies.set("id_manager", userInfo.id_manager);

        } else if (title === "Registrarse") {
          // Registrar usuario
          const response = await signUp(userInfo);
          if (response !== "ok") {
            throw new Error("Error al registrar usuario");
          }
        } else {
          // Iniciar sesión
          const response = await signIn(userInfo);
          if (response === undefined || null) {
            throw new Error("Datos de usuario incorrectos");
          }
          const userData = await getUser(userInfo);
          if (
            userData === undefined ||
            null ||
            userData.name === undefined ||
            null
          ) {
            throw new Error("Datos de usuario incorrectos");
          }
          // Guardar token en cookies
          Cookies.set("name", userData.name);
          Cookies.set("lastName", userData.lastName);
          Cookies.set("userToken", response);
          Cookies.set("awsCognitoId", userData.awsCognitoId);
          Cookies.set("id_manager", userData.id_manager);
          // TODO: Redireccionar a página de inicio
          navigate("/home");
        }
      },
      {
        pending: "Accediendo a tu cuenta...",
        success: "Datos ingresados correctamente.",
        error: "Error al acceder a tu cuenta. Inténtalo de nuevo.",
      },
      {
        toastId: "DatosUsuarioIncorrectos",
        pauseOnFocusLoss: false,
      }
    );
  };

  return (
    <Fragment>
      <div className="background-red">
        <div
          className="logo"
          onClick={() => {
            navigate("/");
          }}
        >
          <img src={OxxoLogo} alt="Mavericks Logo" />
        </div>
      </div>
      <div>
        <div className="icon">
          <img src={icon} alt="Sign Icon" />
        </div>
        <div className="container">
          <div className="header">
            <div className="title">
              <p>
                Bienvenido a{" "}
                <span>
                  {" "}
                  <Link to="/"> Oxxo Admin </Link>
                </span>
              </p>
              <p className="main-title">{title}</p>
            </div>
            <div className="optional">
              <p>
                {title === "Iniciar Sesión"
                  ? "¿No tienes cuenta?"
                  : "¿Ya tienes cuenta?"}
                <br />
                <span
                  onClick={() => {
                    setTitle(
                      title === "Iniciar Sesión"
                        ? "Registrarse"
                        : "Iniciar Sesión"
                    );
                  }}
                >
                  <a href="#">
                    {title === "Iniciar Sesión"
                      ? "Registrarse"
                      : "Iniciar Sesión"}
                  </a>
                </span>
              </p>
            </div>
          </div>
          <div className="form">
            <TextInputField
              label="Ingresa tu correo electrónico"
              placeholder="Correo electrónico"
              type="email"
              required
              onChange={(e) => {
                editUserInfo("email", e.target.value);
              }}
              width="100%"
              inputWidth="100%"
              disabled={disabledFlag}
            />
            {title === "Registrarse" ? (
              <div className="user-data">
                <TextInputField
                  label="Nombre"
                  placeholder="Nombre"
                  type="text"
                  required
                  onChange={(e) => {
                    editUserInfo("name", e.target.value);
                  }}
                  width="100%"
                  inputWidth="100%"
                  disabled={disabledFlag}
                />
                <TextInputField
                  label="Apellido"
                  placeholder="Apellido"
                  type="text"
                  required
                  onChange={(e) => {
                    editUserInfo("lastName", e.target.value);
                  }}
                  width="100%"
                  inputWidth="100%"
                  disabled={disabledFlag}
                />
              </div>
            ) : null}
            <TextInputField
              label="Ingresa tu contraseña"
              placeholder="Contraseña"
              type="password"
              hint="Al menos 8 caracteres, 1 caracter especial, 1 número y 1 letra mayúscula"
              required
              onChange={(e) => {
                editUserInfo("password", e.target.value);
              }}
              width="100%"
              inputWidth="100%"
              disabled={disabledFlag}
            />
            {verifyFlag && title === "Registrarse" ? (
              <TextInputField
                label="Ingresa el código de verificación"
                placeholder="Código de verificación"
                type="number"
                required
                onChange={(e) => {
                  editUserInfo("verifyCode", e.target.value);
                }}
                width="100%"
                inputWidth="100%"
              />
            ) : null}
          </div>
          <div
            className="button"
            onClick={() => {
              if (title === "Registrarse" && !verifyFlag) {
                setVerifyFlag(true);
              }
              registroDatosUsuario();
            }}
          >
            {title === "Registrarse"
              ? verifyFlag
                ? "Validar código"
                : "Registrarse"
              : "Ingresar"}
          </div>
          <p className="datos-requeridos">* Datos requeridos</p>
        </div>
      </div>
    </Fragment>
  );
}

export default UserSignInPage;
