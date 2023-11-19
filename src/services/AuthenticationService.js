/**
 * @fileOverview Declaración de funciones para el manejo de autenticación de usuarios.
 *
 * @requires ../config
 * 
 * @exports signUp
 * @exports signIn
 * @exports verifyCode
 * @exports getUser
 * 
 */

import { API_BASE_URL } from "../config";


/**
 * 
 * Llamada a la API para registrar un usuario.
 * 
 * @param {object} userInfo Información del usuario a registrar.
 * @returns {string} Mensaje de éxito o error.
 */

export async function signUp(userInfo) {
  const bodyUserData = {
    email: userInfo.email,
    name: userInfo.name,
    lastName: userInfo.lastName,
    password: userInfo.password,
  };
  const validateSignup = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyUserData),
  }).then(async (response) => {
    const data = await response.json();
    return data.message;
  });
  return validateSignup;
}

/**
 * 
 * Llamada a la API para iniciar sesión.
 * 
 * @param {object} userInfo Información del usuario a registrar.
 * @returns {string} Token de sesión.
 */

export async function signIn(userInfo) {
  const bodyUserData = {
    email: userInfo.email,
    password: userInfo.password,
  };
  const validateToken = await fetch(`${API_BASE_URL}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyUserData),
  }).then(async (response) => {
    const data = await response.json();
    return data.AccessToken;
  });
  return validateToken;
}

/**
 * 
 * Llamada a la API para verificar el código de verificación.
 * 
 * @param {object} verifyUserData Información del usuario a registrar.
 * @returns {string} Mensaje de éxito o error.
 */

export async function verifyCode(verifyUserData) {
  const bodyVerifyData = {
    email: verifyUserData.email,
    verifyCode: verifyUserData.verifyCode,
  };
  const validateVerification = await fetch(`${API_BASE_URL}/auth/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyVerifyData),
  }).then(async (response) => {
    const data = await response.json();
    return data.message;
  });
  return validateVerification;
}

/**
 * 
 * Llamada a la API para obtener información del usuario.
 * 
 * @param {object} userInfo Información del usuario a buscar.
 * @returns {object} Información del usuario.
 */

export async function getUser(userInfo) {
  const bodyUserData = {
    email: userInfo.email,
  };
  const validateUser = await fetch(`${API_BASE_URL}/auth/getUser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyUserData),
  }).then(async (response) => {
    const data = await response.json();
    const userInfoData = {
      name: data.user.nombre,
      lastName: data.user.apellido,
      awsCognitoId: data.user.awsCognitoId,
      id_manager: data.user.id_manager,
    };
    return userInfoData;
  });
  return validateUser;
}