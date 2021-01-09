// z5224151	ZANNING WANG
// 2020.09.30 Wednesday
// Lab03-exercise4
import React from 'react';
import './App.css';
import cat from './cat.jpg'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>You are safe now</h1>
        <h5>human</h5>
        <img src={cat} className="cat-photo" alt="cat" />
        <div className="content">
          <p>
          You either die a hero, or live long <br/> enough to see yourself come the villian:
          </p>
          <ul>
            <li>
              <a className="App-link" href="https://www.youtube.com/watch?v=DXUAyRRkI6k" target="_blank" rel="noopener noreferrer">
            Cat Video 1</a>
            </li>
            <li>
              <a className="App-link" href="https://www.youtube.com/watch?v=5dsGWM5XGdg" target="_blank" rel="noopener noreferrer">
            Cat Video 1</a>
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;
