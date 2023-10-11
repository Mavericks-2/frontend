import React, { useRef, useState, useEffect } from "react";
import Gondola from "../assets/gondola.jpeg";

function PlanogramConfigurator(props) {
  const canvasRef = useRef(null);
  const [context, setContext] = useState(null);
  const [canvas, setCanvas] = useState(null);
  const [rowsLines, setRowsLines] = useState([]);
  const [columnDrawings, setColumnDrawings] = useState([]);
  let isDrawing = false;
  let selectedLine = null;
  let prev, columnLines;
  let linePositions = [];

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
    }
  }, [props.rows, canvas, context]);

  useEffect(() => {
    if (rowsLines && context) {
      drawRows();
    }
  }, [rowsLines]);

  useEffect(() => {
    if (props.isRowsConfigured) {
      initializeColumns();
    }
  }, [props.isRowsConfigured, canvas, props.columnProducts]);

  useEffect(() => {
    if (columnDrawings && context) {
      drawColumns();
    }
  }, [columnDrawings]);

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

    setRowsLines(rowLines);
  };

  const initializeColumns = () => {
    // Se obtienen las coordenadas 'y' de las filas
    let rowYPositions = rowsLines.map((line) => line.y);
    rowYPositions.unshift(0);
    rowYPositions.push(canvas.height);
    rowYPositions.sort((a, b) => a - b);

    if (props.rows > 0) {
      let numColumnsByRow = props.columnProducts;
      let columnDrawings = [];

      for (let i = 0; i <= props.rows; i++) {
        // Se define el ancho de cada columna
        let columnWidth = canvas.width / numColumnsByRow[i] - 1;

        // Se define la posición previa de la columna
        prev = 0;

        for (let j = 0; j < numColumnsByRow[i] - 1; j++) {
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
      setColumnDrawings(columnDrawings);
    }
  };

  const drawRows = () => {
    // Limpiar el canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar las líneas de las filas y guardar sus posiciones
    context.strokeStyle = "red";
    context.lineWidth = 5;
    rowsLines.forEach((line) => {
      context.beginPath();
      context.moveTo(line.x, line.y);
      context.lineTo(line.x + line.width, line.y);
      context.stroke();
    });
  };

  const drawColumns = () => {
    linePositions.length = 0; // Clear the linePositions array
    columnLines = [];

    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw row lines and save positions
    context.strokeStyle = "red";
    context.lineWidth = 5;
    rowsLines.forEach((line) => {
      context.beginPath();
      context.moveTo(line.x, line.y);
      context.lineTo(line.x + line.width, line.y);
      context.stroke();

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
    context.strokeStyle = "blue";
    context.lineWidth = 5;
    columnDrawings.forEach((line) => {
      context.beginPath();
      context.moveTo(line.x, line.y);
      context.lineTo(line.x, line.y + line.height);
      context.stroke();

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
  };

  const onMouseDownGeneral = (e) => {
    let mouseX = e.nativeEvent.offsetX;
    let mouseY = e.nativeEvent.offsetY;

    if (!props.isRowsConfigured) {
      // Check for row lines
      for (let i = 0; i < rowsLines.length; i++) {
        if (Math.abs(mouseY - rowsLines[i].y) < 10) {
          isDrawing = true;
          selectedLine = rowsLines[i];
          break;
        }
      }
    } else {
      // Check for column lines
      if (!isDrawing) {
        for (let i = 0; i < columnDrawings.length; i++) {
          if (
            Math.abs(mouseX - columnDrawings[i].x) < 10 &&
            Math.abs(mouseY) < columnDrawings[i].y + columnDrawings[i].height &&
            Math.abs(mouseY) > columnDrawings[i].y
          ) {
            isDrawing = true;
            selectedLine = columnDrawings[i];
            break;
          }
        }
      }
    }
  };

  const onMouseMoveGeneral = (e) => {
    if (isDrawing) {
      let mouseX = e.nativeEvent.offsetX;
      let mouseY = e.nativeEvent.offsetY;

      if (selectedLine) {
        if (selectedLine.width > 0) {
          // Adjusting row line position vertically
          selectedLine.y = mouseY;
        } else {
          // Adjusting column line position horizontally
          selectedLine.x = mouseX;
        }
        if (!props.isRowsConfigured) drawRows();
        else drawColumns();
      }
    }
  };

  const onMouseUpGeneral = (e) => {
    isDrawing = false;
    selectedLine = null;
  };

  return (
    <canvas
      id="planogram-configurator"
      width="500"
      height="250"
      ref={canvasRef}
      style={{ backgroundImage: `url(${Gondola})`, backgroundSize: "cover" }}
      onMouseDown={onMouseDownGeneral}
      onMouseMove={onMouseMoveGeneral}
      onMouseUp={onMouseUpGeneral}
    />
  );
}

export default PlanogramConfigurator;
