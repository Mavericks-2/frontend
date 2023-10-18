import React, { useState } from "react";
import { Context } from "../pages/RoutesPages";

export function ContextProvider({ children }) {
  const [uploadedFile, setUploadedFile] = useState(null);

  return (
    <Context.Provider value={{ uploadedFile, setUploadedFile }}>
      {children}
    </Context.Provider>
  );
}
