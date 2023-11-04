import React, { useEffect, useState } from "react";
import { Context } from "../pages/RoutesPages";
import Cookies from 'js-cookie';

export function ContextProvider({ children }) {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [linePositionsContext, setLinePositionsContext] = useState([]);
  const [imageSizes, setImageSizes] = useState({ width: 0, height: 0 });
  const [scaled, setScaled] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
      const userToken = Cookies.get("userToken");
      const name = Cookies.get("name");
      const lastName = Cookies.get("lastName");
      if (userToken && name && lastName) {
          setUserData({ userToken, name, lastName });
      }
  }, []);

  useEffect(() => {
    if (imageSizes.width > 0 && imageSizes.height > 0 && !scaled) {
      let newImageSize = scaleImageSize(imageSizes);
      setImageSizes(newImageSize);
      setScaled(true);
    }
  }, [imageSizes]);

  const scaleImageSize = (imageSizes) => {
    let newImageSize = { width: 0, height: 0 };
    if (imageSizes.width > 500) {
      newImageSize.width = 500;
      newImageSize.height = (imageSizes.height * 500) / imageSizes.width;
    } else {
      newImageSize.width = imageSizes.width;
      newImageSize.height = imageSizes.height;
    }
    return newImageSize;
  }

  return (
    <Context.Provider value={{ uploadedFile, setUploadedFile, linePositionsContext, setLinePositionsContext, imageSizes, setImageSizes, userData: userData, setUserData: setUserData}}>
      {children}
    </Context.Provider>
  );
}
