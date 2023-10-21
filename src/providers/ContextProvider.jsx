import React, { useState } from "react";
import { Context } from "../pages/RoutesPages";

export function ContextProvider({ children }) {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [linePositionsContext, setLinePositionsContext] = useState([]);

  const asyncSetLinePositionsContext = async (linePositions) => {
    setLinePositionsContext(linePositions);
  }

  return (
    <Context.Provider value={{ uploadedFile, setUploadedFile, linePositionsContext, setLinePositionsContext, asyncSetLinePositionsContext}}>
      {children}
    </Context.Provider>
  );
}
