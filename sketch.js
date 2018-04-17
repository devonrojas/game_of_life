// Credits to Daniel Shiffman for base source code

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for(let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

let grid;
let cols;
let rows;
let resolution = 20;
let w = (Math.ceil(window.innerWidth/100) * 100) - (Math.ceil(window.innerWidth/400)*100);
let h = Math.ceil(window.innerHeight/100) * 100;

function setup() {
  createCanvas(w, h - 40);
  cols = width / resolution;
  rows = height / resolution;
  init();
  // Customize frameRate input to observe execution of Game of Life at different speeds.
  frameRate(8);
}
// Generation counter
let i = 0;

// draw() controller
let run = true;

function draw() {
  background(0);
  s = "Generation: " + str(i);
  text(s, width-200, height-50);
  textSize(24);
  fill(255);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;
      if (grid[i][j] == 1) {
        fill(255);
        stroke(255);
        rect(x, y, resolution - 1, resolution - 1);
      }
    }
  }
  if (run) {
    next = generate();
    grid = next;
    i++;
  }
}

function  init() {
  i = 0;
  grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = 0;
    }
  }
  let x = rows/2;
  grid[x][2] = 1;

  run = true;
}

function mouseDragged() {
  userDraw();
}

function mouseClicked() {
  userDraw();
}

// Allow for user to specify cell state
function userDraw() {
  let x = floor(winMouseX / resolution);
  let y = floor(winMouseY / resolution);
  if (grid[x][y] == 1) {
    grid[x][y] = 0;
  } else {
    grid[x][y] = 1;
  }
  fill(255);
  stroke(255);
}

// Allow for user control
function keyPressed() {
  if (keyCode === RETURN) {
    run = !run;
  }
  if (keyCode === BACKSPACE) {
    clearGrid();
  }
}

let savedPatterns = {};

// Save named pattern into memory
function saveGrid(name) {
  saved = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      saved[i][j] = grid[i][j]
    }
  }
  savedPatterns[name] = saved;
}

// Load named pattern from memory & reset canvas
function loadGrid(name) {
  loaded = savedPatterns[name];
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = loaded[i][j]
    }
  }
  i = 0;
}

// Set all cells to 0 & reset draw() function
function clearGrid() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = 0;
    }
  }
  run = false;
  i = 0;
}

function generate() {
  let next = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let state = grid[i][j];
        // Count live neighbors
        let neighbors = countNeighbors(grid, i, j);

        if (state == 0 && neighbors == 3) {
          next[i][j] = 1;
        } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
          next[i][j] = 0;
        } else {
          next[i][j] = state;
        }
      }
    }
    return next;
}

function countNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      sum += grid[col][row];
    }
  }
  sum -= grid[x][y];
  return sum;
}
