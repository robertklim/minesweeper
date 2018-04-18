function Cell(i, j, w) {
    this.i = i;
    this.j = j;
    this.x = i * w;
    this.y = j * w;
    this.w = w;
    this.neighborCount = 0;
    this.mine = false;
    this.revealed = false;
    this.flagged = false;
}

Cell.prototype.toggleFlag = function() {
    if (this.flagged) {
        this.flagged = false;
        flags++;
    } else {
        this.flagged = true;
        flags--;
    }
    
}

Cell.prototype.show = function() {
    stroke(0);
    noFill();
    rect(this.x, this.y, this.w, this.w);
    if (this.revealed) {
        if (this.mine) {
            stroke(0);
            fill(127);
            ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5);
        } else {
            fill(180);
            rect(this.x, this.y, this.w, this.w);
            if (this.neighborCount > 0) {
                textAlign(CENTER);
                textSize(20);
                fill(0);
                text(this.neighborCount, this.x + this.w * 0.5, this.y + this.w - 10);
            }
        }
    } else if (this.flagged) {
        textAlign(CENTER);
        textSize(20);
        fill(0);
        text("!", this.x + this.w * 0.5, this.y + this.w - 10);
    }
}

Cell.prototype.countMines = function() {
    if (this.mine) {
        this.neighborCount = -1;
        return;
    }
    var total = 0;
    for (var xoff = -1; xoff <= 1; xoff++) {
        for (var yoff = -1; yoff <= 1; yoff++) {
            var i = this.i + xoff;
            var j = this.j + yoff;
            if (i > -1 && i < cols && j > -1 && j < rows) {
                var neighbor = grid[i][j];
                if (neighbor.mine) {
                    total++;
                }
            }
        }
    }
    this.neighborCount = total;
}

Cell.prototype.contains = function(x, y) {
    return (x > this.x && 
            x < this.x + this.w && 
            y > this.y && 
            y < this.y + this.w);
}

Cell.prototype.reveal = function() {
    this.revealed = true;
    if (this.neighborCount == 0) {
        // Google flood fill!
        this.floodFill();
    }
}

Cell.prototype.floodFill = function() {
    for (var xoff = -1; xoff <= 1; xoff++) {
        for (var yoff = -1; yoff <= 1; yoff++) {
            var i = this.i + xoff;
            var j = this.j + yoff;
            if (i > -1 && i < cols && j > -1 && j < rows) {
                var neighbor = grid[i][j];
                if (!neighbor.mine && !neighbor.revealed) {
                    neighbor.reveal();
                }
            }
        }
    }
}