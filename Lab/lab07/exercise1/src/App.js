//<!--z5224151	ZANNING WANG-->
// <!--2020.10.27	Tuesday-->
// <!--Lab07-exercise1-->
import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const [org, setOrg] = React.useState(0);

  //use promises
  // React.useEffect(() => {
  //   fetch(`https://api.github.com/orgs/microsoft`)
  //   .then(d => d.json())
  //   .then(d => setOrg(d.public_repos))
  //   .catch(err => console.log(err));
  // }, []);

  //  use async/await
    React.useEffect(showWeb,[])

    async function showWeb() {
        let res;
        try {
            res = await fetch(`https://api.github.com/orgs/microsoft`);
            res = await res.json();
            await setOrg(res.public_repos);
        }
        catch (error){
            console.log(error);
        }
    }

    return (
    <div style={{ margin: '50px'}}>
      <input disabled="true" type="text" value={org} />
    </div>
  );
}

export default App;
