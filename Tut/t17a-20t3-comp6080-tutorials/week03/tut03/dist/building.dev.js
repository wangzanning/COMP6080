"use strict";

var building = document.getElementById('building'); // 1. Using only JavaScript and the DOM API, add 9 square windows (with class window) to the building. The windows should be 50 × 50px, with a margin of 25px.

for (var i = 0; i < 9; i++) {
  // Create a div.
  var window = document.createElement('div');
  window.style.height = '50px';
  window.style.width = '50px';
  window.style.margin = '25px';
  window.style.display = 'inline-block';
  window.classList.add('window'); // Append it to building.

  building.appendChild(window);
}

document.body.addEventListener('keydown', function (event) {
  if (event.key === 'ArrowUp') {
    var _window = document.createElement('div');

    _window.style.height = '50px';
    _window.style.width = '50px';
    _window.style.margin = '25px';
    _window.style.display = 'inline-block';

    _window.classList.add('window'); // window.style.left = `${window.offsetLeft + 50}px`;
    // Append it to building.


    building.appendChild(_window);
  } else if (event.key === 'ArrowDown') {
    if (building.hasChildNodes()) {
      building.removeChild(building.lastChild);
    }
  }
});
document.body.addEventListener('click', function (event) {
  // if (document.body.hasAttribute('night')) {
  //     document.body.removeAttribute('night');
  // } else {
  //     document.body.setAttribute('night', '');
  // }
  document.body.toggleAttribute('night');
});