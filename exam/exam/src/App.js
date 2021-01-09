import React, { useState }from 'react';
import { Route, Switch, Link, useHistory, Redirect } from 'react-router-dom';
import './App.css';
import dashboard from './dashboard';
import blanko from './blanko';
import slido from './slido';
import tetro from './tetro'


function App() {
  // const history = useHistory();
  // const [loginFlag, setLoginFlag] = useState('');
  return (
    <div>
      <Link to="/dashboard" >dashboard</Link><br />
      <Link to="/blanko" >blanko</Link><br />
      <Link to="/slido" >slido</Link><br />
      <Link to="/tetro" >tetro</Link><br />

      <Redirect to='./dashboard'/>}
      <Switch>
        <Route path="/dashboard" component={dashboard}/>
        <Route path="/blanko" component={blanko} />
        <Route path="/slido" component={slido} />
        <Route path="/tetro" component={tetro} />

      </Switch>
    </div>
  );
}

export default App;
