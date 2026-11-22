# Metaballs with Marching Squares

Moving metaballs drawn as outlines using the marching squares algorithm, written in Python with Pygame and in JavaScript with p5.js. Python has three versions (per-pixel, standard marching squares and an adaptive version); JavaScript has the standard and adaptive ones.

![Adaptive marching squares in Python (Pygame)](screenshots/1.gif)
![Adaptive marching squares in JavaScript (p5.js)](screenshots/2.gif)

## Why it is interesting

- **A field instead of shapes.** In the marching squares versions, each ball contributes $r^2 / d^2$ at a point a distance $d$ from its centre, and the contributions are added. A point is "inside" when the sum passes a threshold, so nearby balls merge smoothly into one blob without any shape-merging code.
- **Marching squares.** The field is sampled on a grid. Each cell's four corners are either inside or outside, giving one of 16 cases, and each case maps to zero, one or two line segments across the cell. Segment endpoints are placed at edge midpoints; the code does not interpolate along the edges, so outlines look stepped at coarse cell sizes.
- **Adaptive subdivision.** The adaptive version (`optimized_marching_squares.py`, `javascript/optimized/`) starts with 16-pixel cells and only splits a cell into four smaller ones when its corners disagree, recursing down to a chosen smallest size. Field values are cached by grid point so shared corners are computed once. Most of the screen is empty or solid, so far fewer samples are needed than with a uniform fine grid. A blob small enough to fit between the corners of a 16-pixel cell can be missed.

## Run it

### Python (Pygame)

```bash
pip install pygame
cd python
python without_marching_squares.py     # thresholds the field at every pixel, no marching squares
python marching_squares.py             # marching squares on a 1-pixel grid (slow)
python optimized_marching_squares.py   # adaptive marching squares
```

`without_marching_squares.py` draws a circle of radius `CELL // 4` at each point inside the threshold; with the default `CELL = 1` that radius is 0, so raise `CELL` to see the output.

In the adaptive version, press Enter to start; `d` and `a` double or halve the smallest cell size (1 to 16 pixels).

### JavaScript (p5.js)

Open `javascript/standard/index.html` or `javascript/optimized/index.html` in a browser. p5.js is bundled, so nothing needs installing. The slider sets the cell size (standard) or the smallest cell size (`optimized`).

## Tech

Python (Pygame) and JavaScript (p5.js).

## Context

Personal project, February 2022.

## License

MIT, see LICENSE.
