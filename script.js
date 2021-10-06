const DEFAULT_SIZE = 16
const DEFAULT_MODE = 'color'
const DEFAULT_COLOR = 'black'
let size = DEFAULT_SIZE;
let currentMode = DEFAULT_MODE;
let currentColor = DEFAULT_COLOR;


const grid = document.getElementById('grid');
const clearButton = document.getElementById('clear-btn');
const colorButton = document.getElementById('color-btn');
const rainbowButton = document.getElementById('rainbow-btn');
const shaderButton = document.getElementById('shader-btn');
const eraserButton = document.getElementById('eraser-btn');
const gridSize = document.getElementById('grid-size');
const gridSizeValue = document.getElementById('grid-size-value');
const colorPicker = document.getElementById('color-picker');

colorPicker.onchange = (e) => setColor(e.target.value);
clearButton.onclick = () => reloadGrid();
colorButton.onclick = () => setCurrentMode('color');
rainbowButton.onclick = () => setCurrentMode('rainbow');
shaderButton.onclick = () => setCurrentMode('shader');
eraserButton.onclick = () => setCurrentMode('eraser');
gridSize.onmousemove = (e) => updateGridSize(e.target.value);
gridSize.onchange = (e) => changeSize(e.target.value);

function createGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    for (let i = 0; i < size * size; i++) {
        const gridCell = document.createElement('div');
        gridCell.classList.add('gridCells')
        gridCell.addEventListener('mouseover', changeColor);
        grid.appendChild(gridCell);
    }
}

function setColor(newColor) {
    currentColor = newColor;
}
function setCurrentMode(newMode) {
    activateButton(newMode)
    currentMode = newMode
}

function changeSize(value) {
    updateGridSize(value)
    reloadGrid()
}

function updateGridSize(value) {
    size = value;
    gridSizeValue.textContent = `${value} x ${value}`;
}
function changeColor(e) {
    if (currentMode === 'rainbow') {
      const randomR = Math.floor(Math.random() * 256)
      const randomG = Math.floor(Math.random() * 256)
      const randomB = Math.floor(Math.random() * 256)
      e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
    } else if (currentMode === 'color') {
      e.target.style.backgroundColor = currentColor;
    }else if (currentMode === 'shader') {
        e.target.style.backgroundColor = currentColor;
        e.target.style.opacity = (parseFloat(this.style.opacity) || 0) + 0.1;
    }else if (currentMode === 'eraser') {
        e.target.style.backgroundColor = '#fefefe'
    }
}

function activateButton(newMode) {
  if (currentMode === 'rainbow') {
    rainbowButton.classList.remove('active')
  } else if (currentMode === 'color') {
    colorButton.classList.remove('active')
  } else if (currentMode === 'shader') {
    shaderButton.classList.remove('active')
  } else if (currentMode === 'eraser') {
      eraserButton.classList.remove('active');
  }

  if (newMode === 'rainbow') {
    rainbowButton.classList.add('active')
  } else if (newMode === 'color') {
    colorButton.classList.add('active')
  } else if (newMode === 'shader') {
    shaderButton.classList.add('active')
  }else if (newMode == 'eraser') {
    eraserButton.classList.add('active');
}

}
function clearGrid() {
    grid.innerHTML = "";
}

function reloadGrid () {
    clearGrid();
    createGrid(size);
}

window.onload = () => {
    createGrid(DEFAULT_SIZE);
    activateButton(DEFAULT_MODE);

}