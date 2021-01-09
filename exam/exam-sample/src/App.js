import React, { useEffect, useState } from "react";

import './App.css';

function App() {
  const [time, setTime] = useState('')

  function setTimeRepeat() {
    let currentTime = new Date();
    let result = currentTime.toLocaleTimeString();
    setTime(result)
  }
  setInterval(setTimeRepeat, 1000)

  return (
    <div>
      {time}
    </div>
  );
}

export default App;
