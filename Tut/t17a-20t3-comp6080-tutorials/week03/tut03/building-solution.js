const building = document.getElementById("building");

// 2. Using only Javascript and the DOM API, add 9 square windows to the building.
// The windows should be 50 x 50px, with a margin of 25px.

for (let i = 0; i < 9; i++) {
    const windowEl = document.createElement("div");
    windowEl.style.display = "inline-block";
    windowEl.style.margin = "25px";
    windowEl.style.width = "50px";
    windowEl.style.height = "50px";
    windowEl.className = "window";
    building.append(windowEl);
}

// 3. Now, add a keyboard shortcut that will add a window when the UP (`ArrowUp`) button
//    is pressed, and remove a window when the DOWN (`ArrowDown`) button is pressed.

document.addEventListener("keydown", event => {
    if (event.key === "ArrowUp") {

        // Just a copy & paste of the above code
        const windowEl = document.createElement("div");
        windowEl.style.display = "inline-block";
        windowEl.style.margin = "25px";
        windowEl.style.width = "50px";
        windowEl.style.height = "50px";
        windowEl.className = "window";
        building.append(windowEl);

    } else if (event.key === "ArrowDown") {
        if (building.hasChildNodes()) {
            building.removeChild(building.lastChild);
        }

        // 4. Add another keyboard shortcut that will move the building left/right by 50px when
        //    the LEFT/RIGHT buttons are pressed.

    } else if (event.key === "ArrowRight") {
        building.style.left = (building.offsetLeft + 50) + "px";
    } else if (event.key === "ArrowLeft") {
        building.style.left = (building.offsetLeft - 50) + "px";
    }
});

// 5. Add an event handler that will toggle on/off night mode when the user clicks anywhere on the screen.

document.addEventListener("mousedown", () => {
    const body = document.body;
    if (body.hasAttribute("night")) {
        body.removeAttribute("night");
    } else {
        body.setAttribute("night", "");
    }
});