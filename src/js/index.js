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
    intervalId = setInterval(nextGridStatus, 125);
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
export const generateGrid = () => {
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
export const changeCellStatus = (i, j) => {
  let cell = document.querySelector(`#cell-${i}-${j}`);
  if (cell.style.background !== "white") {
    cell.style.background = "white";
  } else {
    cell.style.background = "";
  }
};

// -------->>> Obtener el tablero actual <<<--------
export const getActualGrid = () => {
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
export const countAliveNeighbors = (i, j) => {
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
export const nextGridStatus = () => {
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
export const renderGrid = () => {
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
export const clearGrid = () => {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let cell = document.querySelector(`#cell-${i}-${j}`);
      cell.style.background = "";
    }
  }
};

// -------->>> Generar grid random (random btn) <<<--------
export const randomGrid = () => {
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
export const updateGeneration = () => {
  generation++;
  generationCounter.innerHTML = generation;
};

// -------->>> Esconder home y mostrar game <<<--------
export const switchVisibleSections = () => {
  document.querySelector(".home__container").style.display = "none";
  document.querySelector(".game__container").style.display = "block";
};

// -------->>> Template 'gosper glider gun' <<<--------
let templateButton = document.querySelector(".gambe-btn__template");
templateButton.addEventListener("click", () => {
  clearInterval(intervalId);
  playing = false;
  generation = -1;
  updateGeneration();
  loadTemplate();
  startButton.click();
});
export const loadTemplate = () => {
  rows = 40;
  cols = 50;
  generateGrid();
  printTemplate([
    "cell-3-25",
    "cell-4-23",
    "cell-4-25",
    "cell-5-13",
    "cell-5-14",
    "cell-5-21",
    "cell-5-22",
    "cell-5-35",
    "cell-5-36",
    "cell-6-12",
    "cell-6-16",
    "cell-6-21",
    "cell-6-22",
    "cell-6-35",
    "cell-6-36",
    "cell-7-1",
    "cell-7-2",
    "cell-7-11",
    "cell-7-17",
    "cell-7-21",
    "cell-7-22",
    "cell-8-1",
    "cell-8-2",
    "cell-8-11",
    "cell-8-15",
    "cell-8-17",
    "cell-8-18",
    "cell-8-23",
    "cell-8-25",
    "cell-9-11",
    "cell-9-17",
    "cell-9-25",
    "cell-10-12",
    "cell-10-16",
    "cell-11-13",
    "cell-11-14",
  ]);
};
export const printTemplate = (ids) => {
  ids.forEach((id) => {
    let cell = document.getElementById(id);
    cell.style.background = "white";
  });
};

window.changeCellStatus = changeCellStatus;
