import React, { useState } from 'react';
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
    <>
      <header>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/132px-Instagram_logo_2016.svg.png" alt=""/>
        <nav>
          <ul>
            <li onClick={() => setPage(Home)}>Home</li>
            <li onClick={() => setPage(Pricing)}>Pricing</li>
            <li onClick={() => setPage(FAQ)}>FAQ</li>
            <li onClick={() => setPage(Gallery)}>Gallery</li>
          </ul>
        </nav>
      </header>
      <main>
        {page}
      </main>
    </>
  );
}

export default App;
