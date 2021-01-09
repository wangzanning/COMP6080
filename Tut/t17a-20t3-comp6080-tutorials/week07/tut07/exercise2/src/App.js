import React, { useEffect, useState } from 'react';
import './App.css';

let timeout = null;

function App() {
  const [orgText, setOrgText] = useState('microsoft');
  const [org, setOrg] = useState('microsoft');
  const [numRepos, setNumRepos] = useState(0);

  
  useEffect(() => {
    fetch(`https://api.github.com/orgs/${org}`)
    .then(d => d.json());
    .then(d => setNumRepos(d.public_repos));
  }, [org]);

  const handleChange = e => {
    setOrgText(e.target.value);
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      console.log('fetching', orgText);
      setOrg(orgText);
    }, 500);
  }

  return (
    <div style={{ margin: '50px'}}>
      <input disabled={true} type="text" value={numRepos} />
      <button type="button" onClick={() => setNumRepos(numRepos - 1)}>&minus;</button>
      <button type="button" onClick={() => setNumRepos(numRepos + 1)}>&#43;</button>
      <br />
      <input type="text" onChange={handleChange} value={orgText} placeholder="Organisation" />
    </div>
  );
}

export default App;
