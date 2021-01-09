import React from 'react';
import logo from './logo.svg';
import './App.css';
import dog from './dog.jpg'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={dog} className="dog-photo" alt="cute-dog" />
        <p>
          Pa-ran-nah!
        </p>
        
      </header>
    </div>
  );
}

export default App;
