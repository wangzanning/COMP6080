import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  const [pageType, setPageType] = React.useState(0);
  return (
    <Router>
    	<div className="main-logo">
    		<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQhBxob-6yeTiZKW_ep9WsuSgTYKSEGaqIFXw&usqp=CAU" />
    	</div>
    	<div className="nav-bar">
    		<Link to="/"><div className="nav-item" onClick={() => setPageType(0)}>Home</div></Link>
    		<Link to="/about"><div className="nav-item" onClick={() => setPageType(1)}>Pricing</div></Link>
    		<Link to="/faq"><div className="nav-item" onClick={() => setPageType(2)}>FAQ</div></Link>
    		<Link to="/gallery"><div className="nav-item" onClick={() => setPageType(3)}>Gallery</div></Link>
    	</div>
    	<div className="break"></div>
    	<div className="body">
	    	<Switch>
	    		<Route path="/about">
	    			About
	    		</Route>
	    		<Route path="/faq">
	    			FAQ
	    		</Route>
	    		<Route path="/gallery">
	    			Gallery
	    		</Route>
	    		<Route path="/">
	    			Home
	    		</Route>
	    	</Switch>
	    </div>
    </Router>
  );
}

export default App;
