import React from 'react';
import UserCard from './UserCard.js';

let updateTimeout = null;

function App() {
  const [usernames, setUsernames] = React.useState([]);
  const [userData, setUserData] = React.useState([]);
  const [canUpdate, setCanUpdate] = React.useState(true);

  React.useEffect(() => {
    if (!usernames.length) {
      setUserData([]);
      return;
    }
    const requests = usernames.map(username => fetch(`https://api.github.com/users/${username}`));
    Promise.allSettled(requests)
      .then(responses => Promise.all(responses.map(response => response.value.json())))
      .then(data => data.filter((user) => user.name))
      .then(data => setUserData(data))
  }, [usernames]);

  const updateUsernames = (e) => {
    clearTimeout(updateTimeout);
    updateTimeout = setTimeout(() => {
      setUsernames(e.target.value.split(',').map(str => str.trim()).filter((item) => item));
    }, 500);
  }

  return (
    <div className="main-content">
      <form>
        <label>
          Enter GitHub usernames:
          <input type="text" name="usernames" onChange={updateUsernames}/>
        </label>
      </form>
      <div className="card-container">
        {userData.map((user, index) => <UserCard key={index} user={user} />)}
      </div>
    </div>
  );
}

export default App;
