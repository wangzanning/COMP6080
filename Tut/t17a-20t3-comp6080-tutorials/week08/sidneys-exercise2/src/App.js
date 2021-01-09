import React, { useEffect, useState } from "react";
import "./App.css";

const Card = ({ key, data }) => (
  <li key={key}>
    <img
      style={{ width: "50px", height: "50px" }}
      src={data.avatar_url}
      alt={`Avatar for ${data.login}`}
    />
    <a target="_blank" rel="noopener noreferrer" href={data.url}>
      {data.name}
    </a>
  </li>
);

function App() {
  const [usernamesInput, setUsernamesInput] = useState("");
  // data Users = Users { users: [Object] }
  //            | Error { anInvalidUsername: String }
  const [users, setUsers] = useState(null);

  useEffect(() => {
    // When input field changes:
    //  1. Run a callback in 500ms that:
    //    1. Parses usernames.
    //    2. Fetches data.
    // 2. If the field is changed before the callback runs, cancel that callback.

    const timeoutID = setTimeout(async () => {
      const usernames = usernamesInput
        .split(",")
        .map((x) => x.trim())
        .filter((x) => x);

      try {
        const data = await Promise.all(
          usernames.map((u) =>
            fetch(`https://api.github.com/users/${u}`).then((res) => {
              if (!res.ok) {
                throw new Error(u);
              }
              return res.json();
            })
          )
        );
        setUsers({ kind: "users", users: data });
      } catch (e) {
        setUsers({ kind: "error", anInvalidUsername: e.message });
      }
    }, 500);

    return () => clearTimeout(timeoutID);
  }, [usernamesInput]);

  return (
    <main>
      <form>
        <label>
          Enter GitHub usernames:
          <input
            type="text"
            name="usernames"
            value={usernamesInput}
            onChange={(e) => setUsernamesInput(e.target.value)}
          />
        </label>
        {users && users.kind === "error" && (
          <p>At least one invalid username given: {users.anInvalidUsername}</p>
        )}
      </form>
      <ul>
        {users &&
          users.kind === "users" &&
          users.users.map((u, i) => <Card key={i} data={u} />)}
      </ul>
    </main>
  );
}

export default App;
