import FileUploadStyles from "../styles/FileUploadStyles.css";
import { Pane, FileUploader, FileCard } from "evergreen-ui";
import React, { useState, useCallback } from "react";

function FileUpload() {
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
  return (
    <div className="FileUpload">
      <h1 className="Title">Agrega la nueva configuración de planograma.</h1>
      <Pane>
        <FileUploader
          label="Cargar archivo "
          description="Solo se permite un archivo. El archivo debe ser menor a 50MB."
          maxSizeInBytes={50 * 1024 ** 2}
          maxFiles={1}
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
    </div>
  );
}

export default FileUpload;
