import React from 'react';
import logo from './logo.svg';
import './App.css';

const BASE_URL = 'http://localhost:5005';

function App() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [loggedIn, setLoggedIn] = React.useState(false);

  const submit = async e => {
    e.preventDefault();
    const response = await fetch(`${BASE_URL}/admin/auth/register`, {
      body: {
        email,
        password,
        name,
      },
      method: 'POST',
    });
    if (response.status === 200) {
      setLoggedIn(true);
    }
    return false;
  }

  if (loggedIn) {
    return (<div className="App">
      You're logged in!
    </div>)
  }
  return (
    <div className="App">
      <form onSubmit={submit}>
        <label htmlFor="email">Email</label>
        <input
          onChange={e => setEmail(e.target.value)}
          type="text"
          id="email"
          value={email}
        />
        <br />
        <label htmlFor="password">Password</label>
        <input
          onChange={e => setPassword(e.target.value)}
          type="password"
          id="password"
          value={password}
        />
        <br />
        <label htmlFor="name">Name</label>
        <input
          onChange={e => setName(e.target.value)}
          type="text"
          id="name"
          value={name}
        />
        <br />
        <input type="submit" value="Register" /><br />
      </form>
    </div>
  );
}

export default App;
