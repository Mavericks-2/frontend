/**
 * @fileOverview Declaración de funciones para el manejo de registro de planogramas.
 *
 * @requires ../config
 * 
 * @exports postPlanogram
 * @exports postPlanogramProducts
 * @exports postPlanogramModel
 * 
 * 
 */

import { API_BASE_URL, FLASK_BASE_URL } from "../config";

/**
 * 
 * Llamada a la API para registrar un planograma.
 * 
 * @param {object} planogramData Información del planograma a registrar.
 * @returns {string} Mensaje de éxito o error.
 */

export async function postPlanogram(planogramData) {
  const bodyPlanogramData = {
    id_planogram: planogramData.id_planogram,
    url_imagen: planogramData.url_imagen,
    coordenadas: planogramData.coordenadas,
    id_manager: planogramData.id_manager,
    matriz_productos: planogramData.matriz_productos,
    lineas: planogramData.lineas,
    accuracy: planogramData.accuracy,
  };
  const validatePlanogram = await fetch(
    `${API_BASE_URL}/planogram/postPlanogramConfig`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyPlanogramData),
    }
  ).then(async (response) => {
    const data = await response.json();
    return data.message;
  });
  return validatePlanogram;
}

/**
 * 
 * Llamada a la API para clasificar los productos de un planograma.
 * 
 * @param {object} planogramData Información del planograma a registrar.
 * @returns {array} Arreglo de productos clasificados.
 */

export async function postPlanogramProducts(planogramData) {
  const bodyPlanogramData = {
    data: {
      coordenadas: planogramData.coordenadas,
      actualSize: planogramData.actualSize,
    },
  };
  const validatePlanogramProducts = await fetch(
    `${FLASK_BASE_URL}/classifyImage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyPlanogramData),
    }
  ).then(async (response) => {
    const data = await response.json();
    return data;
  });
  return validatePlanogramProducts;
}

/**
 * 
 * Llamada a la API para registrar la imagen de un planograma en el modelo.
 * 
 * @param {object} planogramData Información del planograma a registrar.
 * @returns {string} Mensaje de éxito o error.
 */

export async function postPlanogramModel(planogramData) {
  const blob = await fetch(planogramData.imagen).then((r) => r.blob());
  let reader = new FileReader();

  reader.readAsDataURL(blob);
  reader.onload = () => {
    let imagenbase4 = reader.result;

    let imagenFinalBase64 = imagenbase4.split(",")[1];

    const bodyPlanogramData = {
      imagen: imagenFinalBase64,
      transpose: true
    };


    fetch(`${FLASK_BASE_URL}/uploadImage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyPlanogramData),
    })
      .then(async (response) => {
        const data = await response.json();
        return data.message;
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };

  reader.onerror = (error) => {
    console.log("Error: ", error);
  };
}

const getBase64 = (imageFile) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      let imagenFinalBase64 = reader.result.split(",")[1];
      resolve(imagenFinalBase64);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(imageFile);
  });
};

/**
 * 
 * Llamada a la API para registrar la imagen de un planograma.
 * 
 * @param {object} planogramData Información del planograma a registrar.
 * @returns {string} URL de la imagen registrada. 
 */

export async function postPlanogramImage(planogramData) {
  const blob = await fetch(planogramData.imagen).then((r) => r.blob());
  const base64Image = await getBase64(blob);
  const bodyPlanogramData = {
    base_64_image: base64Image,
    type: planogramData.type,
  };

  const url = await fetch(`${API_BASE_URL}/planogram/postPlanogramToCloud`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyPlanogramData),
  })
    .then(async (response) => {
      const data = await response.json();
      return data.url;
    })
    .catch((error) => {
      console.error("Error uploading image:", error);
    });

  return url;
}
export async function getAccuracy(){
    const response = await fetch(`${API_BASE_URL}/planogram/getAccuracy`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
    });
    if (response.status === 201) {
        const data = await response.json();
        return data;
    }else {
    throw new Error("Error getting accuracy");
    }
  }

