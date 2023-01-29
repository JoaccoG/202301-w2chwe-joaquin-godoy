let rows = 9;
let cols = 9;
const width = 20;

const generateGrid = () => {
  let grid = "<table cellpadding=0 cellspacing=0 class='grid__table'>";
  for (let i = 0; i < rows; i++) {
    grid += "<tr>";
    for (let j = 0; j < cols; j++) {
      grid += `<td id="cell-${i + "-" + j}">`;
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
