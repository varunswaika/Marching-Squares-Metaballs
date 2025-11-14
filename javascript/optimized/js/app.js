let balls;
let size;
let hm;
let lowest_grid;
let height = 512;
let width = 1024;
let isPaused = false;
let speedMultiplier = 1;
let ballCount = 5;
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
    let cnv = createCanvas(1025, 513);
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
    stroke(255);
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



function calculate(i, j) {
    const key = getKey(i, j);
    if (key in hm)
        return;
    let val = 0;
    for (let ball of balls) {
        const dis = distance([i, j], [ball.x, ball.y]);
        if (dis > 0)
            val += (ball.radius ** 2) / dis;
        else
            val = 1;
    }
    if (val > 0.2)
        hm[key] = 1;
    else
        hm[key] = 0;
}

function draw() {
    background(0);
    frameCount++;
    updateFPS();

    if (isPaused) {
        return;
    }

    lowest_grid = size.value();
    hm = {};

    // set color
    const currentColor = colorSchemes[colorScheme];
    stroke(currentColor[0], currentColor[1], currentColor[2]);

    if (filledMode) {
        fill(currentColor[0], currentColor[1], currentColor[2], 150);
    } else {
        noFill();
    }

    marchingSquares(0, width, 0, height, 16);
    for (let ball of balls) {
        ball.update(speedMultiplier);
    }
}




function marchingSquares(start_width, end_width, start_height, end_height, grid) {

    for (let i = start_width; i <= end_width; i += grid) {
        for (let j = start_height; j <= end_height; j += grid) {
            calculate(i, j);
            calculate(i + grid, j);
            calculate(i, j + grid);
            calculate(i + grid, j + grid);

            const val = [
                hm[getKey(i, j)],
                hm[getKey(i + grid, j)],
                hm[getKey(i + grid, j + grid)],
                hm[getKey(i, j + grid)]
            ].join('');

            if (filledMode && val !== '0000' && grid <= lowest_grid) {
                rect(i, j, grid, grid);
            }

            if (val !== '0000' && val !== '1111' && grid > lowest_grid)
                marchingSquares(i, i + grid, j, j + grid, grid / 2);
            else if (val !== '0000' && val !== '1111') {

                if (val === '0001')
                    line(i, j + grid / 2, i + grid / 2, j + grid);
                else if (val === '0010')
                    line(i + grid / 2, j + grid, i + grid, j + grid / 2);
                else if (val === '0011')
                    line(i, j + grid / 2, i + grid, j + grid / 2);
                else if (val === '0100')
                    line(i + grid / 2, j, i + grid, j + grid / 2);
                else if (val === '0101') {
                    line(i, j + grid / 2, i + grid / 2, j);
                    line(i + grid / 2, j + grid, i + grid, j + grid / 2);
                } else if (val === '0110')
                    line(i + grid / 2, j, i + grid / 2, j + grid);
                else if (val === '0111')
                    line(i, j + grid / 2, i + grid / 2, j);
                else if (val === '1000')
                    line(i, j + grid / 2, i + grid / 2, j);
                else if (val === '1001')
                    line(i + grid / 2, j, i + grid / 2, j + grid);
                else if (val === '1010') {
                    line(i + grid / 2, j, i + grid, j + grid / 2);
                    line(i, j + grid / 2, i + grid / 2, j + grid);
                } else if (val === '1011')
                    line(i + grid / 2, j, i + grid, j + grid / 2);
                else if (val === '1100')
                    line(i, j + grid / 2, i + grid, j + grid / 2);
                else if (val === '1101')
                    line(i + grid / 2, j + grid, i + grid, j + grid / 2);
                else if (val === '1110')
                    line(i, j + grid / 2, i + grid / 2, j + grid);
            }
        }

    }
}