let balls;
let size;



function distance(p1, p2) {
    return Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2);
}

function getKey(i, j) {
    return i + ',' + j;
}

function setup() {
    let cnv = createCanvas(1200, 800);
    cnv.parent('container');

    // Connect to HTML slider
    size = select('#gridSlider');
    size.input(updateGridValue);

    balls = [];
    for (let i = 0; i < 10; i++) {
        balls.push(new Ball());
    }
}

function updateGridValue() {
    select('#gridValue').html(size.value());
}


function draw() {
    background(0);
    const CELL = size.value();

    // find the values at the grid positions
    const hm = {};
    for (let i = 0; i <= width; i += CELL) {
        for (let j = 0; j <= height; j += CELL) {
            let col = 0;
            for (let ball of balls) {
                const dis = distance([i, j], [ball.x, ball.y]);
                if (dis > 0)
                    col += (ball.radius ** 2) / dis;
                else
                    col = 1;
            }

            if (col > 0.2)
                hm[getKey(i, j)] = 1;
            else
                hm[getKey(i, j)] = 0;
        }
    }

    // using marching squares to draw the the hashmap
    stroke(255);
    for (let i = 0; i < width; i += CELL) {
        for (let j = 0; j < height; j += CELL) {
            const val = [
                hm[getKey(i, j)],
                hm[getKey(i + CELL, j)],
                hm[getKey(i + CELL, j + CELL)],
                hm[getKey(i, j + CELL)]
            ].join('');
            if (val === '0000')
                continue;
            else if (val === '0001')
                line(i, j + CELL / 2, i + CELL / 2, j + CELL);
            else if (val === '0010')
                line(i + CELL / 2, j + CELL, i + CELL, j + CELL / 2);
            else if (val === '0011')
                line(i, j + CELL / 2, i + CELL, j + CELL / 2);
            else if (val === '0100')
                line(i + CELL / 2, j, i + CELL, j + CELL / 2);
            else if (val === '0101') {
                line(i, j + CELL / 2, i + CELL / 2, j);
                line(i + CELL / 2, j + CELL, i + CELL, j + CELL / 2);
            } else if (val === '0110')
                line(i + CELL / 2, j, i + CELL / 2, j + CELL);
            else if (val === '0111')
                line(i, j + CELL / 2, i + CELL / 2, j);
            else if (val === '1000')
                line(i, j + CELL / 2, i + CELL / 2, j);
            else if (val === '1001')
                line(i + CELL / 2, j, i + CELL / 2, j + CELL);
            else if (val === '1010') {
                line(i + CELL / 2, j, i + CELL, j + CELL / 2);
                line(i, j + CELL / 2, i + CELL / 2, j + CELL);
            } else if (val === '1011')
                line(i + CELL / 2, j, i + CELL, j + CELL / 2);
            else if (val === '1100')
                line(i, j + CELL / 2, i + CELL, j + CELL / 2);
            else if (val === '1101')
                line(i + CELL / 2, j + CELL, i + CELL, j + CELL / 2);
            else if (val === '1110')
                line(i, j + CELL / 2, i + CELL / 2, j + CELL);
        }

    }



    // update balls
    for (let ball of balls) {
        ball.update();
    }
}