let rows = 9;
let cols = 9;
const width = 20;

// -------->>> Generar tablero <<<--------
const generateGrid = () => {
  let grid = "<table cellpadding=0 cellspacing=0 class='grid__table'>";
  for (let i = 0; i < rows; i++) {
    grid += "<tr>";
    for (let j = 0; j < cols; j++) {
      grid += `<td id="cell-${
        i + "-" + j
      }" onmouseup="changeCellStatus(${i}, ${j})">`;
      grid += "</td>";
    }
    grid += "</tr>";
  }
  grid += "</table>";
  let gridContainer = document.querySelector(".grid__container");
  gridContainer.innerHTML = grid;

  let gridTable = document.querySelector(".grid__table");
  gridTable.style.height = width * rows + "px";
  gridTable.style.width = width * cols + "px";
};

// -------->>> Cambiar estado de células con click <<<--------
const changeCellStatus = (i, j) => {
  let cell = document.querySelector(`#cell-${i + "-" + j}`);
  if (cell.style.background !== "black") {
    cell.style.background = "black";
  } else {
    cell.style.background = "";
  }
};

// -------->>> Actualizar el tablero en cada segundo <<<--------
const getActualGrid = () => {
  actualGrid = [];
  for (let i = 0; i < cols; i++) {
    actualGrid.push([]);
    for (let j = 0; i < cols; i++) {
      let cell = document.querySelector(`#cell-${i + "-" + j}`);
      actualGrid[i][j] = cell.style.background === "black";
    }
  }
};

// -------->>> Contar cantidad de vecinos de cada célula <<<--------
const countNeighbors = (x, y) => {
  let aliveNeighbors = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (x === 0 && y === 0) {
        continue;
      }
      try {
        if (actualGrid[x + i][y + j]) {
          aliveNeighbors++;
        }
      } catch (e) {}
      if (aliveNeighbors > 3) {
        return aliveNeighbors;
      }
    }
  }
  return aliveNeighbors;
};
