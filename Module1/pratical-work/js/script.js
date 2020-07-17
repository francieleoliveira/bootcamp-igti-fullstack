window.addEventListener('load', start);

console.log('JavaScript em funcionamento!');

var redSlider = document.getElementById('red');
var greenSlider = document.getElementById('green');
var blueSlider = document.getElementById('blue');
var colorDiv = document.getElementById('pickedcolor');
var hexval = document.getElementById('hexval');
var hexDigits = new Array(
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'a',
  'b',
  'c',
  'd',
  'e',
  'f'
);

function start() {
  var events = 'input';

  addChangeEventstoElement(redSlider, events, handleChange);
  addChangeEventstoElement(greenSlider, events, handleChange);
  addChangeEventstoElement(blueSlider, events, handleChange);
  addChangeEventstoElement(redSlider, events, updateBitOnChange);
  addChangeEventstoElement(greenSlider, events, updateBitOnChange);
  addChangeEventstoElement(blueSlider, events, updateBitOnChange);
}

function addChangeEventstoElement(element, events, func) {
  events.split(' ').forEach((e) => element.addEventListener(e, func, false));
}

function handleChange() {
  r = redSlider.value;
  g = greenSlider.value;
  b = blueSlider.value;

  colorDiv.style.backgroundColor = rgb(r, g, b);
  hexval.value = rgb2hex(colorDiv.style.backgroundColor);
}

function rgb(r, g, b) {
  return 'rgb(' + r + ',' + g + ',' + b + ')';
}

function updateBitOnChange() {
  document.getElementById(this.id + 'Bit').value = this.value;
}

function rgb2hex(rgb) {
  rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  return '#' + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function hex(x) {
  return isNaN(x) ? '00' : hexDigits[(x - (x % 16)) / 16] + hexDigits[x % 16];
}