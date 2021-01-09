import React from 'react';
import { Route, Switch, Link, useHistory, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { PORT_NUM } from "./screens/components/action";
import './App.css';
import Signup from './screens/signup';
import Login from './screens/login';
import DashBoard from './screens/dashboard';
import CreateGame from './screens/createGame';
import PlayGame from './screens/playGame';
import Result from './screens/result';
import PlayJoin from './screens/playJoin';
import editGame_new from "./screens/editGame";

function App() {
  const token = useSelector(state => state.token).token;
  const history = useHistory();

  return (
    <div>
      {/*<Link to="/login" >login page</Link><br />*/}
      {/*<Link to="/signUp">SignUp page</Link><br />*/}
      {/*<Link to="/dashBoard">DashBoard page</Link><br />*/}
      {/*<Link to="/playJoin">Play Join</Link><br />*/}
      {token ? null : <Redirect to='./login'/>}
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signUp" component={Signup} />
        <Route path="/dashBoard" component={DashBoard} />
        <Route path="/createGame" component={CreateGame} />
        <Route path="/playGame/:gameId/:playerId" component={PlayGame} />
        <Route path="/playJoin/:gameId/:sessionId" component={PlayJoin} />
        <Route path="/playJoin/:gameId/" component={PlayJoin} />
        <Route path="/result/:sessionId" component={Result} />
        <Route path="/editGame/:gameId" component={editGame_new} />
      </Switch>
    </div>
  );
}

export default App;
