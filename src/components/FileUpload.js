import FileUploadStyles from "../styles/FileUploadStyles.css";
import { Pane, FileUploader, FileCard, Button } from "evergreen-ui";
import React, { useState, useCallback, useContext } from "react";
import { Context } from "../pages/RoutesPages";
import { useNavigate, Link } from "react-router-dom"; 

function FileUpload() {
  const navigate = useNavigate();

  const { setUploadedFile } = useContext(Context);
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

  const handleUpload = () => {
    if (files.length > 0) {
      setUploadedFile(files[0]);
      // Route to the next page
      navigate("/planogram");
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
