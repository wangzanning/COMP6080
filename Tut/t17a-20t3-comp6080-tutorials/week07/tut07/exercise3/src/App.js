import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import logo from './logo.svg';
import './App.css';

function Home() {
  return <div>Home</div>;
}

function Pricing() {
  return <div>Pricing</div>;
}

function FAQ() {
  return <div>FAQ</div>;
}

function Gallery() {
  return <div>Gallery</div>;
}

function App() {
  const [page, setPage] = useState(Home);

  return (
    <Router>
      <header>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/132px-Instagram_logo_2016.svg.png" alt=""/>
        <nav>
          <ul>
            {/* <li onClick={() => setPage(Home)}>Home</li>
            <li onClick={() => setPage(Pricing)}>Pricing</li>
            <li onClick={() => setPage(FAQ)}>FAQ</li>
            <li onClick={() => setPage(Gallery)}>Gallery</li> */}
            <Link to="/home">Home</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/gallery">Gallery</Link>
          </ul>
        </nav>
      </header>
      <main>
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/pricing">
            <Pricing />
          </Route>
          <Route path="/faq">
            <FAQ />
          </Route>
          <Route path="/gallery">
            <Gallery />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
