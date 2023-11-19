/**
 * @fileOverview Componente que muestra la interfaz para subir un archivo.
 *
 * @component FileUpload
 *
 * @requires react
 * @requires react-router-dom
 * @requires evergreen-ui
 * @requires src/pages/RoutesPages
 * @requires js-cookie
 * @requires react-toastify
 * @requires react-toastify/dist/ReactToastify.css
 * @requires src/styles/FileUploadStyles.css
 * 
 * 
 * @example
 *   <FileUpload />
 * 
 */


import React, { useState, useCallback, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Pane, FileUploader, FileCard, Button } from "evergreen-ui";
import { Context } from "../pages/RoutesPages";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import FileUploadStyles from "../styles/FileUploadStyles.css";

function FileUpload() {
  const { userData, setUserData } = useContext(Context);

  const { setUploadedFile, setImageSizes } = useContext(Context);
  const [files, setFiles] = useState([]);
  const [fileRejections, setFileRejections] = useState([]);

  const handleChange = useCallback((files) => setFiles([files[0]]), []);
  const handleRejected = useCallback(
    (fileRejections) => setFileRejections([fileRejections[0]]),
    []
  );
  const handleRemove = useCallback(() => {
    setFiles([]);
    setFileRejections([]);
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    if (!userData) {
      const userToken = Cookies.get("userToken");
      const name = Cookies.get("name");
      const lastName = Cookies.get("lastName");
      if (userToken && name && lastName) {
        setUserData({ userToken, name, lastName });
      }
    }
  }, []);

  const handleUpload = () => {
    if (!userData) {
      toast.error("Inicia sesión para continuar");
    } else {
      if (files.length > 0) {
        // get the width and height of the image
        const img = new Image();
        img.src = URL.createObjectURL(files[0]);
        img.onload = function () {
          setImageSizes({ width: this.width, height: this.height });
        };

        setUploadedFile(files[0]);
        // Route to the next page
        navigate("/planogram");
      }
    }
  };
  return (
    <div className="FileUpload">
      <h1 className="Title">Agrega la nueva configuración de planograma.</h1>
      <Pane>
        <FileUploader
          label="Cargar archivo "
          description="Solo se permite un archivo. El archivo debe ser menor a 50MB."
          maxSizeInBytes={50 * 1024 ** 2}
          maxFiles={2}
          onChange={handleChange}
          onRejected={handleRejected}
          renderFile={(file) => {
            const { name, size, type } = file;
            const fileRejection = fileRejections.find(
              (fileRejection) => fileRejection.file === file
            );
            const { message } = fileRejection || {};
            return (
              <FileCard
                key={name}
                isInvalid={fileRejection != null}
                name={name}
                onRemove={handleRemove}
                sizeInBytes={size}
                type={type}
                validationMessage={message}
              />
            );
          }}
          values={files}
        />
      </Pane>
      <Button
        onClick={handleUpload}
        appearance="primary"
        intent="success"
        className="success-button"
      >
        Guardar
      </Button>
    </div>
  );
}

export default FileUpload;
