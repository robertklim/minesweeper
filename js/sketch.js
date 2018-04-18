// Minesweeper

function make2DArray(cols, rows) {
    var arr = new Array(cols);
    for (var i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}

var grid;
var cols;
var rows;
var w = 40;
var totalMines = 10;
var flags = totalMines;
var over = false;

function setup() {
    createCanvas(431, 431);
    cols = floor(width / w);
    rows = floor(height / w);
    grid = make2DArray(cols, rows);
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j] = new Cell(i, j, w);
        }
    }

    // Pick totlaMines spots
    // Fill options with all the possible spots
    var options = [];
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < cols; j++) {
            options.push([i, j]);
        }
    }

    // Choose random spot (totalMines times), and remove it from options
    // Maybe try shuffle the array and pop last element as a spot
    for (var n = 0; n < totalMines; n++) {
        var index = floor(random(options.length));
        var spot = options[index];
        var i = spot[0];
        var j = spot[1];
        options.splice(index, 1); // Delete the spot
        grid[i][j].mine = true;
    }

    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].countMines();
        }
    }
}

function gameOver() {
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].revealed = true;
        }
    }
    over = true;
}

function mousePressed() {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            if (grid[i][j].contains(mouseX, mouseY)) {
                if (mouseButton === LEFT) {
                    grid[i][j].reveal();
                    if (grid[i][j].mine) {
                        gameOver();
                    }
                } else {
                    grid[i][j].toggleFlag();
                }
            }
        }
    }
}


function draw() {
    background(255);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].show();
        }
    }
    if (over) {
        textSize(42);
        fill("red");
        text("GAME OVER!", width/2, height/2);
    }
    textAlign(LEFT);
    textSize(20);
    fill("red");
    text("Flags: " + flags, 0, 420);

}
