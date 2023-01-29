// -------->>> Variables globales <<<--------
let rows = 50;
let cols = 50;
const width = 20;

let actualGrid = [];
let nextGrid = [];

let intervalId;

// -------->>> Eventos <<<--------
// ---> Avanzar 1 generación con right arrow <---
document.addEventListener("keydown", (e) => {
  e.preventDefault();
  switch (e.key) {
    case "ArrowRight":
      nextGridStatus();
      break;
  }
});

// ---> Funcionalidad botones <---
let startButton = document.querySelector(".button__start");
let stopButton = document.querySelector(".button__stop");
let randomButton = document.querySelector(".button__random");
let clearButton = document.querySelector(".button__clear");

startButton.addEventListener("click", () => {
  intervalId = setInterval(nextGridStatus, 50);
});
stopButton.addEventListener("click", () => {
  clearInterval(intervalId);
});
randomButton.addEventListener("click", () => {
  clearInterval(intervalId);
  randomGrid();
});
clearButton.addEventListener("click", () => {
  clearInterval(intervalId);
  clearGrid();
});

// -------->>> Generar tablero <<<--------
const generateGrid = () => {
  let grid = "<table cellpadding=0 cellspacing=0 class='grid__table'>";
  for (let i = 0; i < rows; i++) {
    grid += "<tr>";
    for (let j = 0; j < cols; j++) {
      grid += `<td id="cell-${i}-${j}" onmouseup="changeCellStatus(${i}, ${j})">`;
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
  let cell = document.querySelector(`#cell-${i}-${j}`);
  if (cell.style.background !== "black") {
    cell.style.background = "black";
  } else {
    cell.style.background = "";
  }
};

// -------->>> Obtener el tablero actual <<<--------
const getActualGrid = () => {
  actualGrid = [];
  for (let i = 0; i < rows; i++) {
    actualGrid.push([]);
    for (let j = 0; j < cols; j++) {
      let cell = document.querySelector(`#cell-${i}-${j}`);
      if (cell.style.background === "black") {
        actualGrid[i][j] = true;
      } else {
        actualGrid[i][j] = false;
      }
    }
  }
};

// -------->>> Contar cantidad de vecinos vivos de cada célula <<<--------
const countAliveNeighbors = (i, j) => {
  let liveCells = 0;
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      if (i + x >= 0 && i + x < rows && j + y >= 0 && j + y < cols) {
        if (actualGrid[i + x][j + y]) {
          liveCells++;
        }
      }
    }
  }
  if (actualGrid[i][j]) {
    liveCells--;
  }
  return liveCells;
};

// -------->>> Determinar el siguiente estado de cada célula <<<--------
const nextGridStatus = () => {
  getActualGrid();
  for (let i = 0; i < rows; i++) {
    nextGrid.push([]);
    for (let j = 0; j < cols; j++) {
      let liveCells = countAliveNeighbors(i, j);
      if (actualGrid[i][j]) {
        if (liveCells < 2 || liveCells > 3) {
          nextGrid[i][j] = false;
        } else {
          nextGrid[i][j] = true;
        }
      } else {
        if (liveCells === 3) {
          nextGrid[i][j] = true;
        } else {
          nextGrid[i][j] = false;
        }
      }
    }
  }
  actualGrid = nextGrid;
  renderGrid();
};

// -------->>> Mostrar próximo grid <<<--------
const renderGrid = () => {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let cell = document.querySelector(`#cell-${i}-${j}`);
      if (actualGrid[i][j]) {
        cell.style.background = "black";
      } else {
        cell.style.background = "";
      }
    }
  }
};

// -------->>> Limpiar grid (clear btn) <<<--------
const clearGrid = () => {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let cell = document.querySelector(`#cell-${i}-${j}`);
      cell.style.background = "";
    }
  }
};

// -------->>> Generar grid random (random btn) <<<--------
const randomGrid = () => {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let cell = document.querySelector(`#cell-${i}-${j}`);
      let randomNumber = Math.floor(Math.random() * 2);
      if (randomNumber == 1) {
        cell.style.background = "black";
      } else {
        cell.style.background = "";
      }
    }
  }
};

generateGrid();
