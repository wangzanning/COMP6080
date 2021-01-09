import React, { useEffect, useState } from 'react';
import { PORT_NUM } from "./components/action";
import { useHistory, useParams } from 'react-router-dom';

const PlayJoin = (props) => {
  const [inputSessionId, setInputSessionId] = useState(''); // 478384
  const [name, setName] = useState('');
  const history = useHistory();
  const sessionId = useParams().sessionId;
  const gameId = useParams().gameId;
  console.log('gameId', gameId);
  console.log('sessionID', sessionId)

  /**
   * Listen on the input of sessionId and Name to join the game.
   * 
   * @param {object} event 
   */
  const joinGame = event => {
    event.preventDefault();
    fetch(`http://localhost:${PORT_NUM}/play/join/${inputSessionId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name
      })
    })
      .then(res => res.json())
      .then(res => {
        console.log('PlayerID:', res.playerId);
        history.push(`/playGame/${gameId}/${res.playerId}`);
        console.log(window.location.pathname)
      })
      .catch(err => console.log(err));
  }

  /**
   * Check if the user is enter screen by copied URL or join button
   * and preconfigured session Id if entering by URL
   */
  useEffect(() => {
    if (sessionId !== undefined) setInputSessionId(sessionId);
  });

  /**
   * Determine if the screen is reached by entering URL in address bar 
   * or clicked the button from popup modal in dashboard.
   * Session ID should be undefined if entering by URL, which will let 
   * the user to input both session ID and his/her name.
   */
  return sessionId === undefined ?
    (
      <form onSubmit={joinGame}>
        <label>Please Input Your Session ID</label><br />
        <input type="text" onChange={e => setInputSessionId(e.target.value)} /><br />
        <label>Please Input Your Name</label><br />
        <input type="text" onChange={e => setName(e.target.value)} /><br />
        <button type="submit">Join</button>
      </form>
    ) :
    (
      <form onSubmit={joinGame}>
        <label>Please Input Your Name</label><br />
        <input type="text" onChange={e => setName(e.target.value)} /><br />
        <button type="submit">Join</button>
      </form>
    )
}

export default PlayJoin;