# Marching Squares Metaballs

## Overview

An interactive visualization of the marching squares algorithm through animated metaballs. This project features multiple implementations in both Python and JavaScript, showcasing different approaches and optimizations for generating smooth, organic shapes in real-time.

## Features

- Modern, responsive web interface with interactive controls
- Real-time parameter adjustment with visual feedback
- Multiple implementation approaches for comparison
- Clean, documented code with proper error handling
- Cross-platform compatibility (Python and JavaScript)

## Implementations

### 1. Standard Marching Squares
- **JavaScript**: Full-featured web implementation with 10 animated metaballs
- **Python**: Pygame-based desktop version
- Interactive grid size control (2-20 for web, fixed for Python)
- Smooth contour generation using the marching squares algorithm

### 2. Without Marching Squares
- **Python only**: Multi-threaded pixel-based approach
- Uses 100 threads for parallel processing
- Direct pixel coloring based on metaball field strength
- Demonstrates performance characteristics without marching squares

### 3. Optimized Marching Squares
- **JavaScript**: Advanced implementation with recursive subdivision
- **Python**: Desktop version with keyboard controls
- Adaptive grid refinement for better performance
- Only subdivides cells with interesting features
- Significantly faster while maintaining quality

## Marching Squares Algorithm

The marching squares algorithm is a computational technique commonly used in computer graphics and image processing. It is particularly useful for extracting and visualizing contours from two-dimensional scalar fields.

### Basic Steps

1. **Grid Division:**
   - The 2D space is divided into a grid of cells.

2. **Thresholding:**
   - For each cell, determine the configuration of the corners based on a threshold value.

3. **Contouring:**
   - Look up a predefined set of configurations and interpolate to find the contour lines within each cell.

4. **Rendering:**
   - Draw the contours, resulting in a smooth representation of the scalar field.

## Optimizations

### 1. Lookup Table

In the basic marching squares algorithm, a lookup table is employed to determine the appropriate contour configuration based on the state of the corners. In the optimized version, this lookup table can be precomputed to avoid repeated calculations during runtime, significantly improving performance.

### 2. Interpolation Optimization

Interpolation between contour points can be computationally expensive. In the optimized marching squares, techniques such as linear interpolation or bicubic interpolation can be used to enhance the smoothness of contours while maintaining efficiency.

### 3. Data Structures

Efficient data structures can be employed to store and manipulate grid information. For example, spatial partitioning techniques like quad trees can be used to reduce the number of unnecessary calculations, especially in regions with low activity.

### 4. Parallelization

In scenarios where performance is critical, the marching squares algorithm can be parallelized to leverage multiple processing units. This can be achieved by dividing the grid into sub-regions and processing them concurrently.

## Project Structure
```
|-- python
| |-- marching_squares.py
| |-- without_marching_squares.py
| |-- optimized_marching_squares.py
|-- javascript
| |--optimized
| | |--css
| | | |-- main.css
| | |--js
| | | |-- app.js
| | | |-- balls.js
| | | |-- p5.min.js
| | |-- index.html
| |--standard
| | |--css
| | | |-- main.css
| | |--js
| | | |-- app.js
| | | |-- balls.js
| | | |-- p5.min.js
| | |-- index.html
|-- screenshots
| |-- 1.gif
| |-- 2.gif
|-- LICENSE
|-- README.md
```


## Getting Started

### JavaScript Web Versions

The JavaScript implementations run directly in your web browser with no installation required:

1. **Standard Implementation**:
   - Open `javascript/standard/index.html` in your web browser
   - Use the slider to adjust grid size (2-20)
   - Watch 10 metaballs interact in real-time

2. **Optimized Implementation**:
   - Open `javascript/optimized/index.html` in your web browser
   - Adjust minimum grid size (2-16, even numbers)
   - Experience faster rendering with recursive subdivision

### Python Desktop Versions

#### Installation

```bash
cd python
pip install -r requirements.txt
```

Or install pygame directly:
```bash
pip install pygame
```

#### Running

**Standard Marching Squares**:
```bash
python marching_squares.py
```
- 6 metaballs with smooth animations
- Fixed grid size for consistent performance

**Without Marching Squares** (Multi-threaded):
```bash
python without_marching_squares.py
```
- 100 threads for parallel pixel processing
- Demonstrates alternative rendering approach

**Optimized Marching Squares**:
```bash
python optimized_marching_squares.py
```
- Press 'D' to increase grid size (faster, less detail)
- Press 'A' to decrease grid size (slower, more detail)
- Adaptive subdivision for optimal performance

## Controls

### JavaScript (Web)
- **Slider**: Adjust grid resolution in real-time
- Values update automatically with visual feedback

### Python (Desktop)
- **Optimized version only**:
  - `D` key: Increase minimum grid size
  - `A` key: Decrease minimum grid size
  - Close window to exit

## Technical Details

### Algorithm Improvements

**Standard Implementation**:
- Proper variable scoping to prevent global pollution
- String-based dictionary keys for reliable lookups
- Consistent use of strict equality operators
- Fixed frame rate management in Python versions

**Optimized Implementation**:
- Recursive subdivision starting at grid size 16
- Subdivides only cells with contour edges (not all-zero or all-one)
- Continues subdividing until reaching minimum grid size
- Dramatically reduces computation compared to uniform grids

### Code Quality Enhancements

- All variables properly declared with `let`/`const`
- Reliable object key handling using string concatenation
- Enabled FPS limiting in Python for smooth animations
- Fixed initialization bugs in Python optimized version
- Consistent error handling across all implementations

### UI/UX Improvements

- Modern, gradient-based color schemes
- Responsive design that works on different screen sizes
- Clear, accessible controls with real-time feedback
- Comprehensive documentation directly in the interface
- Professional typography and spacing

## Browser Compatibility

The JavaScript implementations work in all modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

Requires JavaScript enabled and HTML5 Canvas support.

## Performance Notes

- **Standard JS**: Handles 10 balls smoothly at grid size 2-10
- **Optimized JS**: Better performance with 5 balls, especially at fine resolutions
- **Python Standard**: Smooth at 100 FPS with 6 balls
- **Python Multi-threaded**: 30 FPS with 100 threads for pixel-level detail
- **Python Optimized**: 100 FPS with adaptive grid refinement

## Screenshots

![Screenshot 1](screenshots/1.gif)

![Screenshot 2](screenshots/2.gif)

## Project Structure

```
marching-squares-metaballs/
├── javascript/
│   ├── standard/           # Basic marching squares
│   │   ├── css/
│   │   │   └── main.css
│   │   ├── js/
│   │   │   ├── app.js
│   │   │   ├── balls.js
│   │   │   └── p5.min.js
│   │   └── index.html
│   └── optimized/          # Recursive subdivision
│       ├── css/
│       │   └── main.css
│       ├── js/
│       │   ├── app.js
│       │   ├── balls.js
│       │   └── p5.min.js
│       └── index.html
├── python/
│   ├── marching_squares.py
│   ├── without_marching_squares.py
│   ├── optimized_marching_squares.py
│   └── requirements.txt
├── screenshots/
│   ├── 1.gif
│   └── 2.gif
├── .gitignore
├── LICENSE
└── README.md
```

## Contributing

Contributions are welcome! Areas for improvement:
- Additional optimization techniques
- More metaball interaction patterns
- Color and visual effects
- Performance profiling tools
- Additional algorithm variations

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

Built with:
- [p5.js](https://p5js.org/) - JavaScript graphics library
- [Pygame](https://www.pygame.org/) - Python game development library

Educational resource for understanding computational geometry and real-time graphics algorithms.