// -------->>> Variables globales <<<--------
let rows;
let cols;

let actualGrid = [];
let nextGrid = [];

let intervalId;
let playing = false;

let generation = 0;

// -------->>> Contador de generaciones <<<--------
let generationCounter = document.querySelector(".game__generations-counter");

// -------->>> Funcionalidad botones <<<--------
let startButton = document.querySelector(".game-btn__start");
let stopButton = document.querySelector(".game-btn__stop");
let randomButton = document.querySelector(".game-btn__random");
let clearButton = document.querySelector(".game-btn__clear");
let loadGrid = document.querySelector(".form__load-btn");

startButton.addEventListener("click", () => {
  if (!playing) {
    intervalId = setInterval(nextGridStatus, 150);
    playing = true;
  }
});
stopButton.addEventListener("click", () => {
  clearInterval(intervalId);
  playing = false;
});
randomButton.addEventListener("click", () => {
  clearInterval(intervalId);
  playing = false;
  generation = -1;
  updateGeneration();
  randomGrid();
});
clearButton.addEventListener("click", () => {
  clearInterval(intervalId);
  playing = false;
  generation = -1;
  updateGeneration();
  clearGrid();
});
loadGrid.addEventListener("click", () => {
  rows = document.querySelector("#rows").value;
  cols = document.querySelector("#cols").value;
  if (rows > 100) {
    rows = 100;
  }
  if (cols > 100) {
    cols = 100;
  }
  switchVisibleSections();
  generateGrid();
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
  let gridContainer = document.querySelector(".game__grid-container");
  gridContainer.innerHTML = grid;
};

// -------->>> Cambiar estado de células con click <<<--------
const changeCellStatus = (i, j) => {
  let cell = document.querySelector(`#cell-${i}-${j}`);
  if (cell.style.background !== "white") {
    cell.style.background = "white";
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
      if (cell.style.background === "white") {
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
        cell.style.background = "white";
      } else {
        cell.style.background = "";
      }
    }
  }
  updateGeneration();
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
        cell.style.background = "white";
      } else {
        cell.style.background = "";
      }
    }
  }
};

// -------->>> Actualizar contador de generaciones <<<--------
const updateGeneration = () => {
  generation++;
  generationCounter.innerHTML = generation;
};

// -------->>> Esconder home y mostrar game <<<--------
const switchVisibleSections = () => {
  document.querySelector(".home__container").style.display = "none";
  document.querySelector(".game__container").style.display = "block";
};
