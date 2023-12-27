import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import MountImage from './MountImage';
import { TextField, Button } from '@mui/material';
import Header from './Header';
import Footer from './Footer';

function App() {
  const [gameStarted, setGameStarted] = useState<Boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [rounds, setRounds] = useState<number>(1);

  function startGame() {
    setGameStarted(true);
  }

  function incrementScore() {
    setScore(score + 1);
  }

  function incrementRound() {
    setRounds(rounds + 1);
  }

  return (
    <div className="App">
      
      <Header></Header>
      <div>
        { gameStarted == false 
          ? <div className="Instructions">
              <h3>
                This is a trivia game for guessing mount names in World of Warcraft<br></br>
                A picture will be provided from the Blizzard API followed by multiple choice options<br></br>
                The false names have been generated using ChatGPT<br></br>
                One game lasts 5 rounds, click the button to get started
              </h3>
              <Button variant="contained" size="large" onClick={startGame}>START</Button>
            </div>
          : <div> 
              <MountImage updateRound={incrementRound} updateScore={incrementScore}/>
              <div className="GameData">
                <h2>Score: {score}</h2>
                <h2>Round: {rounds}</h2>
              </div>
            </div>
        }
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
