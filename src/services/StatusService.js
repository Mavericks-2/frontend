import { API_BASE_URL } from "../config";

export async function getIntentosPrevAcomodo() {
  const response = await fetch(`${API_BASE_URL}/status/getIntentosPrevAcomodo`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status === 200) {
    const data = await response.json();
    return data;
  } else {
    throw new Error("Error getting intentosPrevAcomodo");
  }
}