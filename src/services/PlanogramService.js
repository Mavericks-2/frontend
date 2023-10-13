import { API_BASE_URL } from "../config";

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
