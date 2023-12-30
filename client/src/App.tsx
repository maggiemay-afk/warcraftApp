import './App.css';
import Header from './Header';
import Footer from './Footer';
import MountImage from './MountImage';
import GameOver from './GameOver';
import LandingPage from './LandingPage';
import { GameData } from './types';
import React, {useState} from 'react';

function App() {
  const [gameStarted, setGameStarted] = useState<Boolean>(false);
  const [gameOver, setGameOver] = useState<Boolean>(false);
  const [finalGameData, setFinalGameData] = useState<GameData[]>([]);
  const [score, setScore] = useState<number>(0);
  const [rounds, setRounds] = useState<number>(1);
  

  function startGame() {
    setGameStarted(true);
  }

  function restartGame(){
    setGameStarted(false);
    setGameOver(false);
    setFinalGameData([]);
    setScore(0);
    setRounds(1);
  }

  function incrementScore() {
    setScore(score + 1);
  }

  function incrementRound() {
    if (rounds === 10) {
      setGameOver(true);

    } else {
      setRounds(rounds + 1);
    }
  }

  function updateGameData(roundImage: string, roundChoice: string, roundAnswer: string){
    let roundData: GameData = {
      image: roundImage,
      choice: roundChoice, 
      answer: roundAnswer
    }

    finalGameData.push(roundData);
    setFinalGameData(finalGameData);
  }


  return (
    <div className="App">
      <Header></Header>
      <div>
        {gameOver === true
        ? <div> 
            <GameOver 
              finalGameData={finalGameData}
              score={score}
              rounds={rounds}
              restartGame={restartGame}
            />
          </div>
        : gameStarted === false 
          ? <LandingPage startGame={startGame}/>
          : <div> 
              <MountImage 
                updateRound={incrementRound} 
                updateScore={incrementScore} 
                updateGameData={updateGameData} 
                gameData={finalGameData}
              />
            <Footer 
              score={score} 
              round={rounds}
              restartGame={restartGame}
            />
            </div>
        }
      </div>
    </div>
  );
}

export default App;
