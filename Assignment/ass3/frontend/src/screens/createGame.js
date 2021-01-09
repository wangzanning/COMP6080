import React, { useState } from 'react';
import { PORT_NUM } from "./components/action";
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';

const CreateGame = (props) => {
  const [name, setName] = useState('');
  const token = useSelector(state => state.token).token;
  const history = useHistory();

  /**
   * Create a new game by specifying its name
   */
  const createGame = event => {
    event.preventDefault();
    const para = {
      method: 'POST',
      body: JSON.stringify({
        name: name
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }
    fetch(`http://localhost:${PORT_NUM}/admin/quiz/new`, para)
      .then(res => res.json())
      .then(res =>{
        const gameID = res.quizId;
        console.log(gameID);
        history.push(`../dashBoard/gameDetail/${gameID}`);
      }).catch(res => console.log(res));
  }

  return (
    <div>
      <form onSubmit={createGame}>
        <label>Give a name to the new game</label><br/>
        <input type="text" onChange={e => setName(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default CreateGame;