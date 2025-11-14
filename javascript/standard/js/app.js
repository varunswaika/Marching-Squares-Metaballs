let balls;
let size;
let isPaused = false;
let speedMultiplier = 1;
let ballCount = 10;
let colorScheme = 'white';
let filledMode = false;
let fps = 0;
let lastFrameTime = 0;
let frameCount = 0;
let fpsUpdateInterval = 30;

const colorSchemes = {
    white: [255, 255, 255],
    cyan: [0, 255, 255],
    magenta: [255, 0, 255],
    yellow: [255, 255, 0],
    green: [0, 255, 0],
    red: [255, 100, 100],
    blue: [100, 150, 255]
};

function distance(p1, p2) {
    return Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2);
}

function getKey(i, j) {
    return i + ',' + j;
}

function setup() {
    let cnv = createCanvas(1200, 800);
    cnv.parent('container');

    // Connect to HTML controls
    size = select('#gridSlider');
    size.input(updateGridValue);

    select('#pauseBtn').mousePressed(togglePause);
    select('#speedSlider').input(updateSpeed);
    select('#ballSlider').input(updateBallCount);
    select('#colorSelect').changed(updateColor);
    select('#fillCheck').changed(updateFillMode);

    initBalls(ballCount);
}

function initBalls(count) {
    balls = [];
    for (let i = 0; i < count; i++) {
        balls.push(new Ball());
    }
}

function togglePause() {
    isPaused = !isPaused;
    select('#pauseBtn').html(isPaused ? 'Play' : 'Pause');
}

function updateGridValue() {
    select('#gridValue').html(size.value());
}

function updateSpeed() {
    speedMultiplier = parseFloat(select('#speedSlider').value());
    select('#speedValue').html(speedMultiplier.toFixed(1) + 'x');
}

function updateBallCount() {
    const newCount = parseInt(select('#ballSlider').value());
    select('#ballValue').html(newCount);

    if (newCount > ballCount) {
        for (let i = ballCount; i < newCount; i++) {
            balls.push(new Ball());
        }
    } else if (newCount < ballCount) {
        balls = balls.slice(0, newCount);
    }
    ballCount = newCount;
}

function updateColor() {
    colorScheme = select('#colorSelect').value();
}

function updateFillMode() {
    filledMode = select('#fillCheck').checked();
}

function updateFPS() {
    if (frameCount % fpsUpdateInterval === 0) {
        const currentTime = millis();
        fps = Math.round(fpsUpdateInterval / ((currentTime - lastFrameTime) / 1000));
        lastFrameTime = currentTime;
        select('#fpsDisplay').html(fps + ' FPS');
    }
}


function draw() {
    background(0);
    frameCount++;
    updateFPS();

    if (isPaused) {
        return;
    }

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

    // set color
    const currentColor = colorSchemes[colorScheme];
    stroke(currentColor[0], currentColor[1], currentColor[2]);

    if (filledMode) {
        fill(currentColor[0], currentColor[1], currentColor[2], 150);
    } else {
        noFill();
    }

    // using marching squares to draw the hashmap
    for (let i = 0; i < width; i += CELL) {
        for (let j = 0; j < height; j += CELL) {
            const val = [
                hm[getKey(i, j)],
                hm[getKey(i + CELL, j)],
                hm[getKey(i + CELL, j + CELL)],
                hm[getKey(i, j + CELL)]
            ].join('');

            if (filledMode && val !== '0000') {
                rect(i, j, CELL, CELL);
            }

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
        ball.update(speedMultiplier);
    }
}