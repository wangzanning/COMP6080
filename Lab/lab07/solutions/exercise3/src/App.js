import React from 'react';
import './App.css';

class App extends React.Component {

  constructor() {
    super();
    const defaultBoard = [ [ '', '', '', ], [ '', '', '', ], [ '', '', '', ], ];
    this.state = {
      board: defaultBoard,
      firstUser: false,
    };
  }

  setCell(x, y) {
    if (this.state.board[x][y] === '') {
      const newBoard = [...this.state.board];
      newBoard[x][y] = this.state.firstUser ? 'X' : 'O';
      this.setState({
        board: newBoard,
        firstUser: !this.state.firstUser,
      });
    }
  };

  render () {
    return (
      <div className="App">
        <table border="1">
          {this.state.board.map((row, idx1) => (
            <tr key={idx1}>
            {row.map((cell, idx2) => (
              <td onClick={() => this.setCell(idx1,idx2)}>{this.state.board[idx1][idx2]}</td>
            ))}
            </tr>
          ))}
        </table>
      </div>
    );
  }
}

export default App;
