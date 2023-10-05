import React, { useRef, useEffect, useState } from 'react';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import Gondola from "../assets/gondola.jpeg";

function ImageCropper({ imageUrl, x1, x2, y1, y2 }) {
  const canvasRef = useRef(null);
  const [croppedImage, setCroppedImage] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const image = new Image();

    image.onload = () => {
      // Calcula el ancho y alto de la subimagen
      const width = x2 - x1;
      const height = y2 - y1;

      // Dibuja la subimagen en el lienzo
      ctx.drawImage(image, x1, y1, width, height, 0, 0, width, height);

      // Convierte el lienzo en una imagen base64
      const dataURL = canvas.toDataURL('image/png');
      setCroppedImage(dataURL);
    };

    image.src = imageUrl;
  }, [imageUrl, x1, x2, y1, y2]);

  const handleDownload = () => {
    // Crea un enlace temporal para descargar la imagen recortada
    const downloadLink = document.createElement('a');
    downloadLink.href = croppedImage;
    downloadLink.download = 'cropped_image.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div>
      <canvas ref={canvasRef} />
      {croppedImage && (
        <div>
          <button onClick={handleDownload}>Descargar Imagen Recortada</button>
        </div>
      )}
    </div>
  );
}

export default ImageCropper;
