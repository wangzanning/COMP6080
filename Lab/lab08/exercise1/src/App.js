//<!--z5224151	Zangning Wang-->
// <!--2020.11.01	Monday-->
// <!--Lab08-exercise1-->
import React from 'react';
import './App.css';
//import card and button css from lib material-UI
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';

function App() {
  const [name, setName] = React.useState([]);
  const [allNames, setAllNames] = React.useState([]);
  const submitInfo = () => {
    setAllNames([ ...allNames, name ]);
  };

  //change div to header, nav, ul, main, footer to increase the accessibility
  return (
    <body>
      <header className="header">
        <nav id="nav-bar">
          <ul>
            <li className="nav-item">Home</li>
            <li className="nav-item">About</li>
            <li className="nav-item">Pricing</li>
            <li className="nav-item">Partners</li>
            <li className="nav-item">Contact</li>
          </ul>
        </nav>
      </header>
      <main className="main">
        First name: <input type="text" name="first-name" value={name} onChange={e => setName(e.target.value)} /><br />
        {allNames.map((n, idx) => (
          <Card variant="outlined" key={idx} style={{ width: '50px', height: '50px', display: 'inline-block'}}>{n}</Card>
        ))}
          <Button variant="contained" color="primary" id="form-submit" onClick={submitInfo}>Submit</Button>
      </main>
      <footer className="footer">
        &copy; Giant Apple 2020
      </footer>
    </body>
  );
}

export default App;
