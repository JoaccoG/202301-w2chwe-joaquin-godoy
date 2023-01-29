let rows = 9;
let columns = 9;
const width = 20;

const generateGrid = () => {
  let grid = "<table cellpadding=0 cellspacing=0 class='grid__container'>";
  for (let y = 0; y < rows; y++) {
    grid += "<tr>";
    for (let x = 0; x < columns; x++) {
      grid += `<td id="cell-${x + "-" + y}">`;
      grid += "</td>";
    }
    grid += "</tr>";
  }
  grid += "</table>";
  let table = document.querySelector("#grid");
  table.innerHTML = grid;

  let gridContainer = document.querySelector(".grid__container");
  gridContainer.style.height = width * rows + "px";
  gridContainer.style.width = width * columns + "px";

  let cells = document.querySelectorAll("td");
  cells.forEach((cell) => {
    cell.addEventListener("mouseup", function (event) {
      let cell = event.target;
      changeStatus(cell);
    });
  });
};
generateGrid();

const changeStatus = (cell) => {
  if (cell.style.background != "gray") {
    cell.style.background = "gray";
  } else {
    cell.style.background = "";
  }
};

let actualGrid = [];
const getActualGrid = () => {
  actualGrid = [];
  for (let y = 0; y < rows; y++) {
    actualGrid.push([]);
    for (let x = 0; x < columns; x++) {
      let cell = document.querySelector(`#cell-${x + "-" + y}`);
      actualGrid[y][x] = cell.style.background == "gray";
    }
  }
};

getActualGrid();
