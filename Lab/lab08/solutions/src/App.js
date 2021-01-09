import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import './App.css';
import { Typography } from '@material-ui/core';

function App() {

  const [name, setName] = React.useState([]);
  const [allNames, setAllNames] = React.useState([]);

  const submitInfo = () => {
    setAllNames([ ...allNames, name ]);
  };

  return (
    <div>
      <header className="header">
        <nav id="nav-bar" aria-label="Main">
          <ul role="menu">
            <li role="menuitem" className="nav-item" tabIndex={0}>Home</li>
            <li role="menuitem" className="nav-item" tabIndex={0}>About</li>
            <li role="menuitem" className="nav-item" tabIndex={0}>Pricing</li>
            <li role="menuitem" className="nav-item" tabIndex={0}>Partners</li>
            <li role="menuitem" className="nav-item" tabIndex={0}>Contact</li>
          </ul>
        </nav>
      </header>
      <main className="main">
        <label htmlFor="firstname">First name: </label>
        <input type="text" name="first-name" id="firstname" value={name} onChange={e => setName(e.target.value)} /><br />
        <ul>
          {allNames.map((n, idx) => (
            <Card key={idx} className="card-custom">
              <CardContent>
                <Typography>{n}</Typography>
              </CardContent>
            </Card>
            ))}
        </ul>
        <Button id="form-submit" variant="contained" color="primary" onClick={submitInfo}>Submit</Button>
      </main>
      <footer className="footer">
        &copy; Giant Apple 2020
      </footer>
    </div>
  );
}

export default App;
