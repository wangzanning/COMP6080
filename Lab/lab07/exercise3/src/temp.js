import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const defaultBoard = [ [ '', '', '', ], [ '', '', '', ], [ '', '', '', ], ];
  const [board, setBoard] = React.useState(defaultBoard);
  const [firstUser, setFirstUser] = React.useState(false);

  const setCell = (x, y) => {
    const letter = firstUser ? 'X' : 'O';
    const newBoard = { ... board };
    newBoard[x][y] = letter;
    setBoard(newBoard);
    setFirstUser(!firstUser);
  };

  return (
    <div className="App">
      <table border="1">
        <tr>
          <td onClick={() => setCell(0,0)}>{board[0][0]}</td>
          <td onClick={() => setCell(0,1)}>{board[0][1]}</td>
          <td onClick={() => setCell(0,2)}>{board[0][2]}</td>
        </tr>
        <tr>
          <td onClick={() => setCell(1,0)}>{board[1][0]}</td>
          <td onClick={() => setCell(1,1)}>{board[1][1]}</td>
          <td onClick={() => setCell(1,2)}>{board[1][2]}</td>
        </tr>
        <tr>
          <td onClick={() => setCell(2,0)}>{board[2][0]}</td>
          <td onClick={() => setCell(2,1)}>{board[2][1]}</td>
          <td onClick={() => setCell(2,2)}>{board[2][2]}</td>
        </tr>
      </table>
    </div>
  );
}

export default App;
