import React, { useRef, useState, useEffect } from "react";
import Gondola from "../assets/gondola.jpeg";

function PlanogramConfigurator(props) {
  const canvasRef = useRef(null);
  const [context, setContext] = useState(null);
  const [canvas, setCanvas] = useState(null);
  const [rowLines, setRowLines] = useState([]);
  let isDrawing = false;
  let selectedLine = null;


  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    setCanvas(canvas);
    setContext(ctx);
  }, []);

  useEffect(() => {
    if (props.rows > 0 && canvas) {
      initializeRows(props.rows);
    } else if (props.rows === 0 && context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        canvas.removeEventListener("mouseup", onMouseUp);
        canvas.removeEventListener("mousedown", onMouseDown);
        canvas.removeEventListener("mousemove", onMouseMove);
    }
  }, [props.rows, canvas, context]);


  const initializeRows = (rows) => {
    rows = rows - 1;
    // Se define la altura inicial de cada fila
    let rowHeight = canvas.height / (rows + 1);

    // Se define la posición inicial de cada fila
    let rowLines = new Array(rows).fill().map((_, index) => ({
      x: 0,
      y: (index + 1) * rowHeight,
      width: canvas.width,
      height: 0,
    }));

    // Se guarda el estado de las filas
    setRowLines(rowLines);

    // Se dibujan las filas
    drawRows(rowLines);

    // Se agregan los eventos de mouse
    canvas.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("mousedown", (e) => onMouseDown(e, rowLines));
    canvas.addEventListener("mousemove", (e) => onMouseMove(e, rowLines));
  };

  const drawRows = (rowLines) => {
    // Limpiar el canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar las líneas de las filas y guardar sus posiciones
    context.strokeStyle = "red";
    context.lineWidth = 5;
    rowLines.forEach((line) => {
      context.beginPath();
      context.moveTo(line.x, line.y);
      context.lineTo(line.x + line.width, line.y);
      context.stroke();
    });
  };

  const onMouseDown = (e, rowLines) => {
    let mouseX = e.offsetX;
    let mouseY = e.offsetY;

    if (!props.isRowsConfigured){
        console.log(props.isRowsConfigured);
        // Check for row lines
        for (let i = 0; i < rowLines.length; i++) {
          if (Math.abs(mouseY - rowLines[i].y) < 10) {
            isDrawing = true;
            selectedLine = rowLines[i];
            break;
          }
        }
    }
  };

  const onMouseMove = (e, rowLines) => {
    if (isDrawing) {
      let mouseX = e.offsetX;
      let mouseY = e.offsetY;

      if (selectedLine) {
        if (selectedLine.width > 0) {
          // Adjusting row line position vertically
          selectedLine.y = mouseY;
        } else {
          // Adjusting column line position horizontally
          selectedLine.x = mouseX;
        }
        drawRows(rowLines);
      }
    }
  };

  function onMouseUp() {
    isDrawing = false;
    selectedLine = null;
  }

  return (
    <canvas
      id="planogram-configurator"
      width="500"
      height="250"
      ref={canvasRef}
      style={{ backgroundImage: `url(${Gondola})`, backgroundSize: "cover" }}
    />
  );
}

export default PlanogramConfigurator;
