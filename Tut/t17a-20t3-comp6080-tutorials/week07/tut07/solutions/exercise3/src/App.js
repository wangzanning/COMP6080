import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [pageType, setPageType] = React.useState(0);
  return (
    <>
    	<div className="main-logo">
    		<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQhBxob-6yeTiZKW_ep9WsuSgTYKSEGaqIFXw&usqp=CAU" />
    	</div>
    	<div className="nav-bar">
    		<div className="nav-item" onClick={() => setPageType(0)}>Home</div>
    		<div className="nav-item" onClick={() => setPageType(1)}>Pricing</div>
    		<div className="nav-item" onClick={() => setPageType(2)}>FAQ</div>
    		<div className="nav-item" onClick={() => setPageType(3)}>Gallery</div>
    	</div>
    	<div className="break"></div>
    	<div className="body">
    		{pageType === 0 && (
    			<>
    				Home
    			</>
    		)}
    		{pageType === 1 && (
    			<>
    				About
    			</>
    		)}
    		{pageType === 2 && (
    			<>
    				FAQ
    			</>
    		)}
    		{pageType === 3 && (
    			<>
    				Gallery
    			</>
    		)}
    	</div>
    </>
  );
}

export default App;
