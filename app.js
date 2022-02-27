const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');
const mode = document.getElementById('JsMode');
const saveBtn = document.getElementById('JsSave');
const clearBtn = document.getElementById('JsClear');

const INITIAL_STROKE_STYLE = '#2c2c2c';
const INITIAL_FILL_STYLE = 'white';
const INITIAL_STROKE_WIDTH = 2.5;

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

ctx.lineWidth = INITIAL_STROKE_WIDTH;
ctx.strokeStyle = INITIAL_STROKE_STYLE;
ctx.fillStyle = INITIAL_FILL_STYLE;
ctx.fillRect(0, 0, canvas.width, canvas.height);

let painting = false;
let filling = false;

function startPainting() {
  painting = true;
}

function stopPainting() {
  painting = false;
}

function onMouseMove(e) {
  if (filling) return;
  const x = e.offsetX;
  const y = e.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleColorClick(e) {
  const color = e.target.style.backgroundColor;
  if (filling) {
    ctx.fillStyle = color;
  } else {
    ctx.strokeStyle = color;
  }
}

function handleRangeChange(e) {
  const range = e.target.value;
  ctx.lineWidth = range;
}

function handleModeClick() {
  if (filling) {
    filling = false;
    mode.innerText = 'FILL';
  } else {
    filling = true;
    mode.innerText = 'PAINT';
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function handleCM(e) {
  e.preventDefault();
}

function handleSaveClick() {
  const img = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = img;
  link.download = 'paintJS[EXPORT]';
  link.click();
}

function handleClear() {
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

if (canvas) {
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mousedown', startPainting);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mouseleave', stopPainting);
  canvas.addEventListener('click', handleCanvasClick);
  canvas.addEventListener('contextmenu', handleCM);
}

Array.from(colors).forEach((color) =>
  color.addEventListener('click', handleColorClick)
);

if (range) {
  range.addEventListener('change', handleRangeChange);
}

if (mode) {
  mode.addEventListener('click', handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener('click', handleSaveClick);
}

if (clearBtn) {
  clearBtn.addEventListener('click', handleClear);
}
