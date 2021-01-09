const building = document.getElementById('building');

// 1. Using only JavaScript and the DOM API, add 9 square windows (with class window) to the building. The windows should be 50 × 50px, with a margin of 25px.

for (let i = 0; i < 9; i++) {
    // Create a div.
    const window = document.createElement('div');
    window.style.height = '50px';
    window.style.width = '50px';
    window.style.margin = '25px';
    window.style.display = 'inline-block';
    window.classList.add('window');


    // Append it to building.
    building.appendChild(window);
}

document.body.addEventListener('keydown', event => {
    if (event.key === 'ArrowUp') {
        const window = document.createElement('div');
        window.style.height = '50px';
        window.style.width = '50px';
        window.style.margin = '25px';
        window.style.display = 'inline-block';
        window.classList.add('window');

        // window.style.left = `${window.offsetLeft + 50}px`;

        // Append it to building.
        building.appendChild(window);
    } else if (event.key === 'ArrowDown') {
        if (building.hasChildNodes()) {
            building.removeChild(building.lastChild);
        }
    }
});

document.body.addEventListener('click', event => {
    // if (document.body.hasAttribute('night')) {
    //     document.body.removeAttribute('night');
    // } else {
    //     document.body.setAttribute('night', '');
    // }

    document.body.toggleAttribute('night');
});