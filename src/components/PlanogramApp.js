import React, { useRef, useState, useEffect } from "react";
import PlanogramStyles from "../styles/PlanogramStyles.css";
import Gondola from "../assets/gondola.jpeg";

function PlanogramApp() {
  // Se definen las variables del canvas
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState();
  const [canvas, setCanvas] = useState();

  // Se definen las variables del plano
  let initializeRows = () => {};
  let initializeRowsColumns = () => {};
  let convertLinesToRectangles = () => {};
  let linePositions = [];
  let rowDrawings, columnDrawings;
  let columnLines;
  let rows, prev, rowHeight;
  let isDrawing = false;
  let alreadyMovedRow = false;
  let selectedLine = null;

  // Se define cuantas filas tendrá el plano
  let rowsInput = document.getElementById("rowsInput");

  useEffect(() => {
    // Se obtiene el contexto y el canvas
    const canvasElement = canvasRef.current;
    const context = canvasElement.getContext("2d");
    setCtx(context);
    setCanvas(canvasElement);
  }, []);

  if (ctx && canvas) {
    // Se define la imagen de fondo
    let image = new Image();
    image.src = Gondola; // TODO: Modificar para que sea dinámico
    image.onload = () => {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    };

    initializeRows = () => {
      // Se define el número de filas
      rows = parseInt(rowsInput.value);

      if (rows > 0) {
        // Se define la altura inicial de cada fila
        rowHeight = canvas.height / (rows + 1);

        // Se define la posición inicial de cada fila
        rowDrawings = new Array(rows).fill().map((_, index) => ({
          x: 0,
          y: (index + 1) * rowHeight,
          width: canvas.width,
          height: 0,
        }));

        // Se mandan a dibujar las filas
        drawRows();

        // Se agregan los eventos de mouse
        canvas.addEventListener("mousedown", onMouseDown);
        canvas.addEventListener("mousemove", onMouseMove);
        canvas.addEventListener("mouseup", onMouseUp);
      } else {
        alert(
          "Input inválido. Por favor ingrese valores positivos para filas."
        ); // TODO: Agregar un Toast
      }
    };

    initializeRowsColumns = () => {
      // Se obtienen las coordenadas 'y' de las filas
      let rowYPositions = rowDrawings.map((line) => line.y);
      rowYPositions.unshift(0);
      rowYPositions.push(canvas.height);
      rowYPositions.sort((a, b) => a - b);

      if (rows > 0) {
        let numColumnsByRow = [16, 15, 22, 15, 9, 10, 11, 12, 13]; // TODO: Modificar para que sea dinámico

        // Se define la posición inicial de cada columna
        columnDrawings = [];

        for (let i = 0; i <= rows; i++) {
          // Se define el ancho de cada columna
          let columnWidth = canvas.width / numColumnsByRow[i];

          // Se define la posición previa de la columna
          prev = 0;

          for (let j = 0; j < numColumnsByRow[i]; j++) {
            let startX = (0.5 + j) * columnWidth; // TODO: Revisar lógica
            let startY = rowYPositions[i];
            let endY = rowYPositions[i + 1];

            // Se agregan las columnas a la lista
            columnDrawings.push({
              x: startX,
              y: startY,
              width: 0,
              height: endY - startY,
              prev: prev,
              row: i,
            });
            prev = startX;
          }
        }

        // Se mandan a dibujar las filas y columnas
        alreadyMovedRow = true;
        drawRowsColumns();

        // Se agregan los eventos de mouse
        canvas.addEventListener("mousedown", onMouseDown);
        canvas.addEventListener("mousemove", onMouseMove);
        canvas.addEventListener("mouseup", onMouseUp);
      } else {
        alert(
          "Input inválido. Por favor ingrese valores positivos para las columnas."
        ); // TODO: Agregar un Toast
      }
    };

    function drawRows() {
      // Limpiar el canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Dibujar la imágen
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      // Dibujar las líneas de las filas y guardar sus posiciones
      ctx.strokeStyle = "red";
      ctx.lineWidth = 6;
      rowDrawings.forEach((line) => {
        ctx.beginPath();
        ctx.moveTo(line.x, line.y);
        ctx.lineTo(line.x + line.width, line.y);
        ctx.stroke();
      });
    }

    function drawRowsColumns() {
      linePositions.length = 0; // Clear the linePositions array
      columnLines = [];

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the image
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      // Draw row lines and save positions
      ctx.strokeStyle = "green";
      ctx.lineWidth = 2;
      rowDrawings.forEach((line) => {
        ctx.beginPath();
        ctx.moveTo(line.x, line.y);
        ctx.lineTo(line.x + line.width, line.y);
        ctx.stroke();

        // Remove old line position from linePositions (if exists)
        linePositions = linePositions.filter((pos) => pos !== line);

        linePositions.push({
          x1: line.x,
          y1: line.y,
          x2: line.x + line.width,
          y2: line.y,
        });
      });

      // Draw column lines and save positions
      ctx.strokeStyle = "blue";
      ctx.lineWidth = 2;
      columnDrawings.forEach((line) => {
        ctx.beginPath();
        ctx.moveTo(line.x, line.y);
        ctx.lineTo(line.x, line.y + line.height);
        ctx.stroke();

        // Remove old line position from linePositions (if exists)
        linePositions = linePositions.filter((pos) => pos !== line);
        columnLines = columnLines.filter((pos) => pos !== line);

        linePositions.push({
          x1: line.x,
          y1: line.y,
          x2: line.x,
          y2: line.y + line.height,
        });
        prev = line.x;

        columnLines.push({
          x1: line.x,
          y1: line.y,
          x2: line.x,
          y2: line.y + line.height,
          row: line.row,
        });
      });
    }

    function onMouseDown(e) {
      let mouseX = e.offsetX;
      let mouseY = e.offsetY;

      if (!alreadyMovedRow) {
        // Check for row lines
        for (let i = 0; i < rowDrawings.length; i++) {
          if (Math.abs(mouseY - rowDrawings[i].y) < 10) {
            isDrawing = true;
            selectedLine = rowDrawings[i];
            break;
          }
        }
      } else {
        // Check for column lines
        if (!isDrawing) {
          for (let i = 0; i < columnDrawings.length; i++) {
            if (
              Math.abs(mouseX - columnDrawings[i].x) < 10 &&
              Math.abs(mouseY) <
                columnDrawings[i].y + columnDrawings[i].height &&
              Math.abs(mouseY) > columnDrawings[i].y
            ) {
              isDrawing = true;
              selectedLine = columnDrawings[i];
              break;
            }
          }
        }
      }
    }

    function onMouseMove(e) {
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
          if (!alreadyMovedRow) drawRows();
          else drawRowsColumns();
        }
      }
    }

    function onMouseUp() {
      isDrawing = false;
      selectedLine = null;

      if (alreadyMovedRow) {
      convertLinesToRectangles();
      }
    }

    function convertLinesToRectangles() {
      let rectangles = [];
      let prev = { x1: 0, y1: 0};
      let row = 0;
      let column = 0;

      for (let i = 0; i < columnLines.length; i++) {
        if (columnLines[i].row !== row) {
          // create a rectangle
          rectangles.push({
            x: prev.x1,
            y: prev.y1,
            width: canvas.width - prev.x1,
            height: prev.y2 - prev.y1,
          });
          prev = { x1: 0, y1: columnLines[i].y1};
        }
        // create a rectangle
        rectangles.push({
          x: prev.x1,
          y: prev.y1,
          width: columnLines[i].x1 - prev.x1,
          height: columnLines[i].y2 - prev.y1,
        });
        prev = columnLines[i];
        row = columnLines[i].row;
      }
      rectangles.push({
        x: prev.x1,
        y: prev.y1,
        width: canvas.width - prev.x1,
        height: canvas.height - prev.y1,
      });

      console.log(rectangles);
    }
  }

  return (
    <div>
      <label htmlFor="rows">Number of rows:</label>
      <input type="number" id="rowsInput" />
      <br />
      <button onClick={initializeRows}>Initialize Rows</button>
      <button onClick={initializeRowsColumns}>Initialize Columns</button>
      <br />
      <canvas
        className="canvas-container"
        id="imageCanvas"
        width="700"
        height="300"
        ref={canvasRef}
      ></canvas>
    </div>
  );
}

export default PlanogramApp;
