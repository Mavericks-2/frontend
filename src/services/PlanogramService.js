import { API_BASE_URL, FLASK_BASE_URL } from "../config";

export async function postPlanogram(planogramData) {
  const bodyPlanogramData = {
    id_planogram: planogramData.id_planogram,
    url_imagen: planogramData.url_imagen,
    coordenadas: planogramData.coordenadas,
    id_manager: planogramData.id_manager,
    matriz_productos: planogramData.matriz_productos,
    lineas: planogramData.lineas,
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

export async function postPlanogramProducts(planogramData) {
  const bodyPlanogramData = {
    data: {
      coordenadas: planogramData.coordenadas,
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

export async function postPlanogramModel(planogramData) {
  const blob = await fetch(planogramData.imagen).then((r) => r.blob());
  let reader = new FileReader();

  reader.readAsDataURL(blob);
  reader.onload = () => {
    let imagenbase4 = reader.result;

    let imagenFinalBase64 = imagenbase4.split(",")[1];

    const bodyPlanogramData = {
      imagen: imagenFinalBase64,
      scaleWidth: planogramData.scaleWidth,
      scaleHeight: planogramData.scaleHeight,
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
