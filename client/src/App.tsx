import './App.css';
import Header from './Header';
import Footer from './Footer';
import MountImage from './MountImage';
import GameOver from './GameOver';
import React, {useState} from 'react';
import { TextField, Button } from '@mui/material';
import Typography from '@mui/material/Typography';


function App() {
  const [gameStarted, setGameStarted] = useState<Boolean>(false);
  const [gameOver, setGameOver] = useState<Boolean>(false);
  const [finalGameData, setFinalGameData] = useState<Array<string>>([]);
  const [score, setScore] = useState<number>(0);
  const [rounds, setRounds] = useState<number>(1);
  

  function startGame() {
    setGameStarted(true);
  }

  function incrementScore() {
    setScore(score + 1);
  }

  function incrementRound() {
    if (rounds === 5) {
      setGameOver(true);

    } else {
      setRounds(rounds + 1);
    }
  }

  function addFinalGameData(){

  }

  function checkFinalGameData(){

  }


  return (
    <div className="App">
      <Header></Header>
      <div>
        {gameOver === true
        ? <div> 
            <GameOver></GameOver>
            <Footer score={score} round={rounds}></Footer>
          </div>
        : gameStarted === false 
          ? <div className="instructions">
              <h3>
                This is a trivia game for guessing mount names in World of Warcraft<br></br>
                A picture will be provided from the Blizzard API followed by multiple choice options<br></br>
                The false names have been generated using ChatGPT<br></br>
                One game lasts 5 rounds, click the button to get started
              </h3>
              <Button variant="contained" size="large" onClick={startGame}>START</Button>
            </div>
          : <div> 
              <MountImage updateRound={incrementRound} updateScore={incrementScore} allGameData={finalGameData}/>
              <Footer score={score} round={rounds}></Footer>
            </div>
        }
      </div>
    </div>
  );
}

export default App;
