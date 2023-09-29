import React, { useState, useEffect } from 'react';
import './App.scss';
import GameCards from './components/GameCards';

const App = () => {
  const [userName, setUserName] = useState('');
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = () => {
    setGameStarted(!gameStarted);
  };

  const resetGame = () => {
    localStorage.removeItem("userName");
    setUserName('');
    setGameStarted(false);
  }

  const nameLocalStorage = () => {
    const localUserName = localStorage.getItem("userName");
    if(localUserName){
      setUserName(localUserName);
      setGameStarted(!gameStarted);
    }
  }

  useEffect(() => {
    if(userName){
      localStorage.setItem("userName", userName);
    }
  }, [userName]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    nameLocalStorage();
  }, [])

  return (
    <div className="app">
      {!gameStarted ? (
        <div className="start-screen">
          <h1>Welcome to Memory Game</h1>
          <input
            type="text"
            placeholder="Enter your name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <button onClick={handleStartGame}>Start Game</button>
        </div>
      ) : (
        <div className="game-container">
          <h1>Hello, {userName}!</h1>
          <GameCards resetGame={resetGame} />
        </div>
      )}
    </div>
  );
};

export default App;
