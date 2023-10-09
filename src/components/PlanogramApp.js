import React, { useRef, useState, useEffect } from "react";
import PlanogramStyles from "../styles/PlanogramStyles.css";
import Gondola from "../assets/gondola.jpeg";

function PlanogramApp() {
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState();
  const [canvas, setCanvas] = useState();
  let rowsInput = document.getElementById("rowsInput");
  let initializeRows = () => {};
  let initializeRowsColumns = () => {};
  let linePositions = [];
  let rowLines, columnLines;
  let rows = 0;
  let isDrawing = false;
  let selectedLine = null;
  let rowHeight;
  let alreadyMovedRow = false;
  let prev = 0;
  let angelPositions = [];

  useEffect(() => {
    const canvasElement = canvasRef.current;
    const context = canvasElement.getContext("2d");
    setCtx(context);
    setCanvas(canvasElement);
  }, []);

  if (ctx && canvas) {
    let image = new Image();
    image.src = Gondola; // Replace 'path_to_your_image.jpg' with the actual path to your image file.
    image.onload = () => {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    };

    initializeRows = () => {
      rows = parseInt(rowsInput.value);

      if (rows > 0) {
        rowHeight = canvas.height / (rows + 1);

        rowLines = new Array(rows).fill().map((_, index) => ({
          x: 0,
          y: (index + 1) * rowHeight,
          width: canvas.width,
          height: 0,
        }));

        drawRows();
        canvas.addEventListener("mousedown", onMouseDown);
        canvas.addEventListener("mousemove", onMouseMove);
        canvas.addEventListener("mouseup", onMouseUp);
      } else {
        alert("Invalid input. Please enter positive values for rows.");
      }
    };

    initializeRowsColumns = () => {
      //columns = parseInt(columnsInput.value);

      rowLines = linePositions.map((pos) => ({
        x: pos.x1,
        y: pos.y1,
        width: pos.x2 - pos.x1,
        height: 0,
      }));

      let rowYPositions = rowLines.map((line) => line.y);
      rowYPositions.unshift(0);
      rowYPositions.push(canvas.height);
      rowYPositions.sort((a, b) => a - b);

      if (rows > 0) {
        // TODO: Cambiar
        let numColumnsByRow = [16, 15, 22, 15, 9, 10, 11, 12, 13];
        columnLines = [];

        for (let i = 0; i <= rows; i++) {
          let columnWidth = canvas.width / numColumnsByRow[i];

          prev = 0;
          for (let j = 0; j <= numColumnsByRow[i]; j++) {
            let startX = (0.5 + j) * columnWidth; // Start from the second column
            let startY = rowYPositions[i];
            let endY = rowYPositions[i + 1];

            columnLines.push({
              x: startX,
              y: startY,
              width: 0,
              height: endY - startY,
              prev: prev,
            });
            prev = startX;
          }
        }

        alreadyMovedRow = true;
        drawRowsColumns();
        canvas.addEventListener("mousedown", onMouseDown);
        canvas.addEventListener("mousemove", onMouseMove);
        canvas.addEventListener("mouseup", onMouseUp);
      } else {
        alert("Invalid input. Please enter positive values for columns.");
      }
    };

    function drawRows() {
      linePositions.length = 0; // Clear the linePositions array

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the image
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      // Draw row lines and save positions
      ctx.strokeStyle = "green";
      ctx.lineWidth = 2;
      rowLines.forEach((line) => {
        ctx.beginPath();
        ctx.moveTo(line.x, line.y);
        ctx.lineTo(line.x + line.width, line.y);
        ctx.stroke();

        // Remove old line position from linePositions (if exists)
        linePositions = linePositions.filter((pos) => pos !== line);

        // Save line position
        linePositions.push({
          x1: line.x,
          y1: line.y,
          x2: line.x + line.width,
          y2: line.y,
        });
      });
    }

    function drawRowsColumns() {
      angelPositions.length = 0; // Clear the linePositions array
      linePositions.length = 0; // Clear the linePositions array

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the image
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      // Draw row lines and save positions
      ctx.strokeStyle = "green";
      ctx.lineWidth = 2;
      rowLines.forEach((line) => {
        ctx.beginPath();
        ctx.moveTo(line.x, line.y);
        ctx.lineTo(line.x + line.width, line.y);
        ctx.stroke();

        // Remove old line position from linePositions (if exists)
        linePositions = linePositions.filter((pos) => pos !== line);

        angelPositions.push({
          x1: line.x,
          y1: line.y,
          x2: line.x + line.width,
          y2: line.y,
        });
      });

      // Draw column lines and save positions
      ctx.strokeStyle = "blue";
      ctx.lineWidth = 2;
      columnLines.forEach((line) => {
        ctx.beginPath();
        ctx.moveTo(line.x, line.y);
        ctx.lineTo(line.x, line.y + line.height);
        ctx.stroke();

        // Remove old line position from linePositions (if exists)
        linePositions = linePositions.filter((pos) => pos !== line);

        angelPositions.push({
          x1: line.x,
          y1: line.y,
          x2: line.x,
          y2: line.y + line.height,
        });

        // Save line position
        linePositions.push({
          x1: line.prev,
          y1: line.y,
          x2: line.x,
          y2: line.y + line.height,
        });
        prev = line.x;
      });
    }

    function onMouseDown(e) {
      let mouseX = e.offsetX;
      let mouseY = e.offsetY;

      if (!alreadyMovedRow) {
        // Check for row lines
        for (let i = 0; i < rowLines.length; i++) {
          if (Math.abs(mouseY - rowLines[i].y) < 10) {
            isDrawing = true;
            selectedLine = rowLines[i];
            break;
          }
        }
      }

      // Check for column lines
      if (!isDrawing) {
        for (let i = 0; i < columnLines.length; i++) {
          if (Math.abs(mouseX - columnLines[i].x) < 10) {
            isDrawing = true;
            selectedLine = columnLines[i];
            break;
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
          drawRowsColumns();
        }
      }
    }

    function onMouseUp() {
      isDrawing = false;
      selectedLine = null;

      console.log(angelPositions);
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
