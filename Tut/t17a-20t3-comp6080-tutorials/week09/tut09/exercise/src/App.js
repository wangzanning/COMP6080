import './App.css';
import React from "react";
import { Menu } from "./Menu";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Menu items={['Item 1', 'Item 2', 'Item 3']} />
      </header>
    </div>
  );
}

export default App;
