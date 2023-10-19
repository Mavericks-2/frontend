import { API_BASE_URL, FLASK_BASE_URL } from "../config";

export async function postPlanogram(planogramData) {
  const bodyPlanogramData = {
    url_imagen: planogramData.url_imagen,
    coordenadas: planogramData.coordenadas,
    id_manager: planogramData.id_manager,
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
    coordenadas: planogramData.coordenadas,
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
    return data.products;
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
    };
    console.log("bodyPlanogramData: ", bodyPlanogramData);

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


export async function postPlanogramImage(planogramData) {
  const blob = await fetch(planogramData.imagen).then((r) => r.blob());
  let reader = new FileReader();

  reader.readAsDataURL(blob);
  reader.onload = () => {
    let imagenbase4 = reader.result;

    let imagenFinalBase64 = imagenbase4.split(",")[1];

    const bodyPlanogramData = {
      imagen: imagenFinalBase64,
    };
    console.log("bodyPlanogramData: ", bodyPlanogramData);

    fetch(`${API_BASE_URL}/planogram/postPlanogramToCloud`, {
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