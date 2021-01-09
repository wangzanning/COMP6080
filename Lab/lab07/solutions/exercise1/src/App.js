import React from 'react';

function App() {

  const [repos, setRepos] = React.useState(0);

  React.useEffect(async() => {
    try {
      const response = await fetch(`https://api.github.com/orgs/microsoft`);
      const data = await response.json();
      setRepos(data.public_repos);
    } catch(error) {
      console.log(error);
    }
  }, []);

  return (
    <div style={{ margin: '30px'}}>
      <input disabled="true" type="text" value={repos} />
    </div>
  );
}

export default App;
