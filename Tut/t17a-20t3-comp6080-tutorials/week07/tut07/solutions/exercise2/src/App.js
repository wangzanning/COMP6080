import React from 'react';
import logo from './logo.svg';
import './App.css';

let updateTimeout = null;

function App() {

  const [orgText, setOrgText] = React.useState('microsoft');
  const [org, setOrg] = React.useState('microsoft');
  const [numPublicRepos, setNumPublicRepos] = React.useState(0);

  React.useEffect(() => {
    fetch(`https://api.github.com/orgs/${org}`)
    .then(d => d.json())
    .then(d => setNumPublicRepos(d.public_repos));
  }, [org]);

  const updateOrg = e => {
    setOrgText(e.target.value);
    clearTimeout(updateTimeout);
    updateTimeout = setTimeout(() => {
      setOrg(e.target.value);
    }, 500);
  }

  return (
    <div style={{ margin: '50px'}}>
      <input disabled="true" type="text" value={numPublicRepos} />
      <button type="button" onClick={() => setNumPublicRepos(numPublicRepos - 1)}>&minus;</button>
      <button type="button" onClick={() => setNumPublicRepos(numPublicRepos + 1)}>&#43;</button>
      <br /><br />
      <input type="text" value={orgText} onChange={updateOrg} />
    </div>
  );
}

export default App;
