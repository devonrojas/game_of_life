let grid;
let resolution = 5;
let cells;
let rows;

function init(cells, rows) {
  grid = new Array(cells);

  for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(rows);
  }


}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  cells = width / resolution;
  rows = height / resolution;
  init(cells, rows);
  for (let i = 0; i < cells; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = 0;
    }
  }
  let middle = cells / 2;
  grid[middle][0] = 1;
  // for (let i = 0; i < cells; i++) {
  //   grid[i][0] = floor(random(2));
  // }
}

let gen = 0;


function draw() {
  background(0);
  for (let i = 0; i < cells; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution
      if (grid[i][j] == 1) {
        fill(255);
        stroke(255);
        rect(x, y, resolution - 1, resolution - 1);
      }
    }
  }
  generate();
  gen++;
  if (gen == rows) {
    noLoop();
  }
}

function generate() {
  let currentRow = new Array(cells);
  for (let i = 0; i < cells; i++) {
    currentRow[i] = 0;
    currentRow[i] = grid[i][gen];
  }
  for (let i = 0; i < cells; i++) {
    let state = calculateState(currentRow, i);
    grid[i][gen + 1] = state;
  }
}

// Rule 30
function calculateState(currentRow, i) {
  let state = 0;
  if (currentRow[i - 1] == 1 && currentRow[i] == 1 && currentRow[i + 1] == 1) {
    state = 0;
  } else if (currentRow[i - 1] == 1 && currentRow[i] == 1 && currentRow[i + 1] == 0) {
    state = 0;
  } else if (currentRow[i - 1] == 1 && currentRow[i] == 0 && currentRow[i + 1] == 1) {
    state = 0;
  } else if (currentRow[i - 1] == 1 && currentRow[i] == 0 && currentRow[i + 1] == 0) {
    state = 1;
  } else if (currentRow[i - 1] == 0 && currentRow[i] == 1 && currentRow[i + 1] == 1) {
    state = 1;
  } else if (currentRow[i - 1] == 0 && currentRow[i] == 1 && currentRow[i + 1] == 0) {
    state = 1;
  } else if (currentRow[i - 1] == 0 && currentRow[i] == 0 && currentRow[i + 1] == 1) {
    state = 1;
  } else if (currentRow[i - 1] == 0 && currentRow[i] == 0 && currentRow[i + 1] == 0) {
    state = 0;
  }
  return state;
}
