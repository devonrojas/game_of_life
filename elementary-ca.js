let grid;
let cells;
let rows;
let resolution = 5;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  cells = width / resolution;
  rows = floor(height / resolution);
  init(cells, rows);
  for (let i = 0; i < cells; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = 0;
    }
  }
  // let middle = cells / 2;
  // grid[middle][0] = 1;
  for (let i = 0; i < cells; i++) {
    grid[i][0] = floor(random(2));
  }
}

function init(cells, rows) {
  grid = new Array(cells);
  for (let i = 0; i < cells; i++) {
    grid[i] = new Array(rows);
  }
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
  if (gen == rows) {
    noLoop();
  }
  gen++;
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

function calculateState(currentRow, i) {
  let state = 0;

  // // Implements Rule 30 a.k.a [00011110]
  // if (currentRow[i - 1] == 1 && currentRow[i] == 1 && currentRow[i + 1] == 1) {
  //   state = 0;
  // } else if (currentRow[i - 1] == 1 && currentRow[i] == 1 && currentRow[i + 1] == 0) {
  //   state = 0;
  // } else if (currentRow[i - 1] == 1 && currentRow[i] == 0 && currentRow[i + 1] == 1) {
  //   state = 0;
  // } else if (currentRow[i - 1] == 1 && currentRow[i] == 0 && currentRow[i + 1] == 0) {
  //   state = 1;
  // } else if (currentRow[i - 1] == 0 && currentRow[i] == 1 && currentRow[i + 1] == 1) {
  //   state = 1;
  // } else if (currentRow[i - 1] == 0 && currentRow[i] == 1 && currentRow[i + 1] == 0) {
  //   state = 1;
  // } else if (currentRow[i - 1] == 0 && currentRow[i] == 0 && currentRow[i + 1] == 1) {
  //   state = 1;
  // } else if (currentRow[i - 1] == 0 && currentRow[i] == 0 && currentRow[i + 1] == 0) {
  //   state = 0;
  // }

  // Implements Rule 90 a.k.a [01011010]
  if (currentRow[i - 1] == 1 && currentRow[i] == 1 && currentRow[i + 1] == 1) {
    state = 0;
  } else if (currentRow[i - 1] == 1 && currentRow[i] == 1 && currentRow[i + 1] == 0) {
    state = 1;
  } else if (currentRow[i - 1] == 1 && currentRow[i] == 0 && currentRow[i + 1] == 1) {
    state = 0;
  } else if (currentRow[i - 1] == 1 && currentRow[i] == 0 && currentRow[i + 1] == 0) {
    state = 1;
  } else if (currentRow[i - 1] == 0 && currentRow[i] == 1 && currentRow[i + 1] == 1) {
    state = 1;
  } else if (currentRow[i - 1] == 0 && currentRow[i] == 1 && currentRow[i + 1] == 0) {
    state = 0;
  } else if (currentRow[i - 1] == 0 && currentRow[i] == 0 && currentRow[i + 1] == 1) {
    state = 1;
  } else if (currentRow[i - 1] == 0 && currentRow[i] == 0 && currentRow[i + 1] == 0) {
    state = 0;
  }

  return state;
}

function keyPressed() {
  if (keyCode == ENTER) {
    gen = 0;
    for (let i = 0; i < cells; i++) {
      for (let j = 0; j < rows; j++) {
        grid[i][j] = 0;
      }
    }
    let middle = cells / 2;
    grid[middle][0] = 1;
  }
  loop();
}
