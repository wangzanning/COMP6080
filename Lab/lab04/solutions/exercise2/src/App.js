import React, { useEffect, useState } from 'react';
import './App.css';

const size = 4;

const getRandomInt = (max) => Math.floor(Math.random() * Math.ceil(max));

const App = () => {
  const [board, setBoard] = useState(
    Array.from({length: size}, () => Array.from({length: size}, () => null))
  );
  const [gameState, setGameState] = useState('');

  const updateCell = (row, column, value) => {
    let copy = [...board];
    copy[row][column] = value;
    setBoard(copy);
  };

  useEffect(() => {
    updateCell(0, 0, 2);

    window.addEventListener('keydown', (event) => {
      let moved = false;
      if (!gameLost()) {
        switch (event.key) {
            case "ArrowUp":
                moved = moveUp(board);
                break;
            case "ArrowDown":
                moved = moveDown(board);
                break;
            case "ArrowLeft":
                moved = moveLeft(board);
                break;
            case "ArrowRight":
                moved = moveRight(board);
                break;
        }
      }
      if (gameWon()) {
        setGameState("won");
      } else if (gameLost()) {
        setGameState("lost");
      } else if (moved) {
        addRandom(board);
      }
    });

    return () => window.removeEventListener('keydown');
  }, []);

  const addRandom = (board) => {
    const emptyCellList = [];
    boardLoop((i, j) => board[i][j] === null && emptyCellList.push({row: i, col: j}));
    const randomCell = emptyCellList[getRandomInt(emptyCellList.length - 1)];
    const randomValue = getRandomInt(2) == 0 ? 2 : 4;
    updateCell(randomCell.row, randomCell.col, randomValue);
  }

  const boardLoop = (callback, initialVal) => {
    let value = initialVal;
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        value = callback(i, j, value);
      }
    }
    return value;
  }

  const gameWon = () => boardLoop((i, j) => board[i][j] === 2048, false);

  const gameLost = () => {
    let state = boardLoop((i, j, val) => board[i][j] === null ? false : val, true);
    if (!state) {
      return false;
    }
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size - 1; j++) {
        if (board[i][j] === board[i][j + 1]) {
          return false;
        }
        if (board[j][i] === board[j + 1][i]) {
          return false;
        }
      }
    }
    return true;
  }

  const resetGame = () => {
    boardLoop((i, j) => updateCell(i, j, null));
    setGameState("inProgress");
    updateCell(0, 0, 2);
  }

  const WinningOverlay = () => (
    <div className="overlay">
      <h2>You Won!</h2>
      <button onClick={resetGame}>Play Again</button>
    </div>
  );

  const LosingOverlay = () => (
    <div className="overlay">
      <h2>Game Over!</h2>
      <button onClick={resetGame}>Try Again</button>
    </div>
  );

  const moveCheck = (callbacks) => {
    let moved = false;
    callbacks.map(callback => moved |= callback());
    return moved;
  }

  const moveUp = () => moveCheck([slideUp, mergeUp, slideUp]);
  const moveDown = () => moveCheck([slideDown, mergeDown, slideDown]);
  const moveLeft = () => moveCheck([slideLeft, mergeLeft, slideLeft]);
  const moveRight = () => moveCheck([slideRight, mergeRight, slideRight]);

  const slideUp = () => {
    let moved = false;
    for (let i = 0; i < size; i++) {
      for (let j = 0, empty = 0; j < size; j++) {
        if (board[i][empty] !== null) {
          empty++;
        } else if (board[i][j] !== null) {
          updateCell(i, empty, board[i][j]);
          updateCell(i, j, null);
          moved = true;
          empty++;
        }
      }
    }
    return moved;
  }

  const mergeUp = () => {
    let moved = false;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size - 1; j++) {
        if (board[i][j] !== null && board[i][j] === board[i][j + 1]) {
          updateCell(i, j, board[i][j] * 2);
          updateCell(i, j + 1, null);
          moved = true;
        }
      }
    }
    return moved;
  }

  const slideDown = () => {
    let moved = false;
    for (let i = 0; i < size; i++) {
      for (let j = size - 1, empty = size - 1; j >= 0; j--) {
        if (board[i][empty] !== null) {
          empty--;
        } else if (board[i][j] !== null) {
          updateCell(i, empty, board[i][j]);
          updateCell(i, j, null);
          moved = true;
          empty--;
        }
      }
    }
    return moved;
  }

  const mergeDown = () => {
    let moved = false;
    for (let i = 0; i < size; i++) {
      for (let j = size - 1; j > 0; j--) {
        if (board[i][j] !== null && board[i][j] === board[i][j - 1]) {
          updateCell(i, j, board[i][j] * 2);
          updateCell(i, j - 1, null);
          moved = true;
        }
      }
    }
    return moved;
}


  const slideLeft = () => {
    let moved = false;
    for (let i = 0; i < size; i++) {
      for (let j = 0, empty = 0; j < size; j++) {
        if (board[empty][i] !== null) {
          empty++;
        } else if (board[j][i] !== null) {
          updateCell(empty, i, board[j][i]);  
          updateCell(j, i, null);
          moved = true;
          empty++;
        }
      }
    }
    return moved;
  }

  const mergeLeft = () => {
    let moved = false;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size - 1; j++) {
        if (board[j][i] !== null && board[j][i] === board[j + 1][i]) {
          updateCell(j, i, board[j][i] * 2);
          updateCell(j + 1, i, null);
          moved = true;
        }
      }
    }
    return moved;
  }


  const slideRight = () => {
    let moved = false;
    for (let i = 0; i < size; i++) {
      for (let j = size - 1, empty = size - 1; j >= 0; j--) {
        if (board[empty][i] !== null) {
          empty--;
        } else if (board[j][i] !== null) {
          updateCell(empty, i, board[j][i]);
          updateCell(j, i, null);
          moved = true;
          empty--;
        }
      }
    }
    return moved;
  }

  const mergeRight = () => {
    let moved = false;
    for (let i = 0; i < size; i++) {
      for (let j = size - 1; j > 0; j--) {
        if (board[j][i] !== null && board[j][i] === board[j - 1][i]) {
          updateCell(j, i, board[j][i] * 2);
          updateCell(j - 1, i, null);
          moved = true;
        }
      }
    }
    return moved;
  }

  return (
    <div className="App">
      <div className="background" id="background">
        { gameState === "won" && <WinningOverlay /> }
        { gameState === "lost" && <LosingOverlay /> }
        <div className="board">
          {[0,1,2,3].map(id => (
            <div className="board-col">
              {board[id].map((cell, index) => (
                <div key={index} className={(cell !== null) ? `tile style-${cell}` : 'tile empty'}>
                  {cell}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
