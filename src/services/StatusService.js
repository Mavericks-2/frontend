/**
 * @fileOverview Declaración de funciones para la obtención de metrícas de planogramas para los gráficos.
 *
 * @requires ../config
 * 
 * @exports getPlanogramMetrics
 * @exports getPlanogramMetricsByDate
 * @exports getPlanogramMetricsByDateRange
 * @exports getPlanogramMetricsByDateRangeAndId
 * 
 */

import { API_BASE_URL } from "../config";

/**
 * 
 * Llamada a la API para obtener las métricas de los intentos de acomodo de planogramas.
 * 
 * @returns {object} Métricas de planogramas.
 */

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

/**
 * 
 * Llamada a la API para obtener las métricas de las diferencias de planogramas respecto a la matriz de productos.
 * 
 * @returns {object} Métricas de planogramas.
 */

export async function getMatrizDiferencias(){
    const response = await fetch(`${API_BASE_URL}/status/getMatrizDiferencias`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
    
      if (response.status === 200) {
        const data = await response.json();
        return data;
      } else {
        throw new Error("Error getting matrizDiferencia");
      }
}

/**
 * 
 * Llamada a la API para obtener las métricas de los planogramas por fecha.
 * 
 * @returns {object} Métricas de planogramas.
 */

export async function getFechasStatus(){
    const response = await fetch(`${API_BASE_URL}/status/getFechasStatus`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
    });
    if (response.status === 200) {
        const data = await response.json();
        return data;
    } else {
        throw new Error("Error getting fechasStatus");
    }
}