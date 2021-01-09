const SIZE = 4;
const TILE_EMPTY_CLASS = 'tile empty';

window.addEventListener('keydown', (event) => {
    let moved = false;
    switch (event.key) {
        case 'ArrowUp':
            moved = moveUp();
            break;
        case 'ArrowDown':
            moved = moveDown();
            break;
        case 'ArrowLeft':
            moved = moveLeft();
            break;
        case 'ArrowRight':
            moved = moveRight();
            break;
    }

    if (gameWon()) {
        handleGameWon();
    }

    if (moved) {
        addRandom();
    }

    if (gameLost()) {
        handleGameLost();
    }
});

const getRandomInt = max => Math.floor(Math.random() * Math.ceil(max));
  
const addRandom = () => {
    const emptyCellList = document.getElementsByClassName('empty');
    const randomCell = emptyCellList[getRandomInt(emptyCellList.length - 1)];
    const randomValue = getRandomInt(2) == 0 ? 2 : 4;
    randomCell.innerText = randomValue;
    randomCell.className = `tile style-${randomValue}`;
};

const setup = () => {
    const col = document.getElementsByClassName('board-col')[0];
    const tile = col.children[0];
    tile.innerText = '2';
    tile.className = 'tile style-2';
};

const gameWon = () => 
    document.getElementsByClassName('style-2048').length > 0;

const handleGameWon = () => {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';

    const message = document.createElement('h2');
    message.innerText = 'You won!';
    overlay.appendChild(message);

    const button = document.createElement('button');
    button.innerText = 'Play Again';
    overlay.appendChild(button);
    button.onclick = () => location.reload();

    const background = document.getElementById('background');
    background.appendChild(overlay);
};

const gameLost = () => {
    if (gameWon()) {
        return false;
    }

    const columnList = document.getElementsByClassName('board-col');
    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE - 1; j++) {
            if (columnList[i].children[j].innerText === columnList[i].children[j + 1].innerText) {
                return false;
            }
            if (columnList[j].children[i].innerText === columnList[j + 1].children[i].innerText) {
                return false;
            }
        }
    }

    return true;
};

const handleGameLost = () => {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';

    const message = document.createElement('h2');
    message.innerText = 'Game over!';
    overlay.appendChild(message);

    const button = document.createElement('button');
    button.innerText = 'Try Again';
    button.onclick = () => location.reload();
    overlay.appendChild(button);

    const background = document.getElementById('background');
    background.appendChild(overlay);
};









const upDownColLoop = (callback) => {
    let moved = false;
    const columnList = document.getElementsByClassName('board-col');
    for (let i = 0; i < SIZE; i++) {
        const col = columnList[i];
        if (callback(col, i)) {
            moved = true;
        }
    }
    return moved;
}

const leftRightColLoop = (callback) => {
    let moved = false;
    const columnList = document.getElementsByClassName('board-col');
    for (let i = 0; i < SIZE; i++) {
        if (callback(columnList, i)) {
            moved = true;
        }
    }
    return moved;
}

const moveUp = () => {
    let moved = slideUp();
    moved |= mergeUp();
    moved |= slideUp();
    return moved;
};

const slideUp = () => upDownColLoop((col, i) => {
    let moved = false;
    for (let j = 0, empty = 0; j < SIZE; j++) {
        if (col.children[empty].className !== TILE_EMPTY_CLASS) {
            empty++;
        } else if (col.children[j].className !== TILE_EMPTY_CLASS) {
            col.children[empty].className = col.children[j].className;
            col.children[empty].innerText = col.children[j].innerText;
            col.children[j].className = TILE_EMPTY_CLASS;
            col.children[j].innerText = '';
            moved = true;
            empty++;
        }
    };
    return moved;
});

const mergeUp = () => upDownColLoop((col, i) => {
    let moved = false;
    for (let j = 0; j < SIZE - 1; j++) {
        if (col.children[j].className !== TILE_EMPTY_CLASS && col.children[j].innerText === col.children[j + 1].innerText) {
            const doubledValue = parseInt(col.children[j].innerText) * 2;
            col.children[j].innerText = doubledValue;
            col.children[j].className = `tile style-${doubledValue}`;
            col.children[j + 1].innerText = '';
            col.children[j + 1].className = TILE_EMPTY_CLASS;
            moved = true;
        }
    }
    return moved;
});

const moveDown = () => {
    let moved = slideDown();
    moved |= mergeDown();
    moved |= slideDown();
    return moved;
};

const slideDown = () => upDownColLoop((col, i) => {
    let moved = false;
    for (let j = SIZE - 1, empty = SIZE - 1; j >= 0; j--) {
        if (col.children[empty].className !== TILE_EMPTY_CLASS) {
            empty--;
        } else if (col.children[j].className !== TILE_EMPTY_CLASS) {
            col.children[empty].className = col.children[j].className;
            col.children[empty].innerText = col.children[j].innerText;
            col.children[j].className = TILE_EMPTY_CLASS;
            col.children[j].innerText = '';
            moved = true;
            empty--;
        }
    }
    return moved;
});

const mergeDown = () => upDownColLoop((col, i) => {
    let moved = false;
    for (let j = SIZE - 1; j > 0; j--) {
        if (col.children[j].className !== TILE_EMPTY_CLASS && col.children[j].innerText === col.children[j - 1].innerText) {
            const doubledValue = parseInt(col.children[j].innerText) * 2;
            col.children[j].innerText = doubledValue;
            col.children[j].className = `tile style-${doubledValue}`;
            col.children[j - 1].innerText = '';
            col.children[j - 1].className = TILE_EMPTY_CLASS;
            moved = true;
        }
    }
    return moved;
});

const moveLeft = () => {
    let moved = slideLeft();
    moved = mergeLeft();
    moved = slideLeft();
    return moved;
};

const slideLeft = () => leftRightColLoop((columnList, i) => {
    let moved = false;
    for (let j = 0, empty = 0; j < SIZE; j++) {
        if (columnList[empty].children[i].className !== TILE_EMPTY_CLASS) {
            empty++;
        } else if (columnList[j].children[i].className !== TILE_EMPTY_CLASS) {
            columnList[empty].children[i].className = columnList[j].children[i].className;
            columnList[empty].children[i].innerText = columnList[j].children[i].innerText;
            columnList[j].children[i].className = TILE_EMPTY_CLASS;
            columnList[j].children[i].innerText = '';
            moved = true;
            empty++;
        }
    }
    return moved;
});

const mergeLeft = () => leftRightColLoop((columnList, i) => {
    let moved = false;
    for (let j = 0; j < SIZE - 1; j++) {
        if (columnList[j].children[i].className !== TILE_EMPTY_CLASS && columnList[j].children[i].innerText === columnList[j + 1].children[i].innerText) {
            const doubledValue = parseInt(columnList[j].children[i].innerText) * 2;
            columnList[j].children[i].innerText = doubledValue;
            columnList[j].children[i].className = `tile style-${doubledValue}`;
            columnList[j + 1].children[i].innerText = '';
            columnList[j + 1].children[i].className = TILE_EMPTY_CLASS;
            moved = true;
        }
    }
    return moved;
});

const moveRight = () => {
    let moved = slideRight();
    moved |= mergeRight();
    moved |= slideRight();
    return moved;
};

const slideRight = () => leftRightColLoop((columnList, i) => {
    let moved = false;
    for (let j = SIZE - 1, empty = SIZE - 1; j >= 0; j--) {
        if (columnList[empty].children[i].className !== TILE_EMPTY_CLASS) {
            empty--;
        } else if (columnList[j].children[i].className !== TILE_EMPTY_CLASS) {
            columnList[empty].children[i].className = columnList[j].children[i].className;
            columnList[empty].children[i].innerText = columnList[j].children[i].innerText;
            columnList[j].children[i].className = TILE_EMPTY_CLASS;
            columnList[j].children[i].innerText = '';
            moved = true;
            empty--;
        }
    }
    return moved;
});

const mergeRight = () => leftRightColLoop((columnList, i) => {
    let moved = false;
    for (let j = SIZE - 1; j > 0; j--) {
        if (columnList[j].children[i].className !== TILE_EMPTY_CLASS && columnList[j].children[i].innerText === columnList[j - 1].children[i].innerText) {
            const doubledValue = parseInt(columnList[j].children[i].innerText) * 2;
            columnList[j].children[i].innerText = doubledValue;
            columnList[j].children[i].className = `tile style-${doubledValue}`;
            columnList[j - 1].children[i].innerText = '';
            columnList[j - 1].children[i].className = TILE_EMPTY_CLASS;
            moved = true;
        }
    }
    return moved;
});

setup();