import './App.css';
import Header from './Header';
import Footer from './Footer';
import MountImage from './MountImage';
import GameOver from './GameOver';
import LandingPage from './LandingPage';
import { GameData } from './types';
import React, {useState} from 'react';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#af861f',
    },
    secondary: {
      main: '#121858',
    },
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        standardSuccess: {
          backgroundColor: 'green',
          color: 'white'
        },
        standardError: {
          backgroundColor: 'red',
          color: 'white'
        },
        standardWarning: {
          backgroundColor: 'orange',
          color: 'white'
        },
        standardInfo: {
          backgroundColor: '#121858',
          color: '#121858',
          border: '#121858'
        }
      }
    }
  }
});


function App() {
  const [gameStarted, setGameStarted] = useState<Boolean>(false);
  const [gameOver, setGameOver] = useState<Boolean>(false);
  const [finalGameData, setFinalGameData] = useState<GameData[]>([]);
  const [score, setScore] = useState<number>(0);
  const [rounds, setRounds] = useState<number>(1);
  const [totalRounds, setTotalRounds] = useState<number>(0);
  

  function startGame(totalRounds: number) {
    setGameStarted(true);
    setTotalRounds(totalRounds);
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
    if (rounds === totalRounds) {
      endGame(); 

    } else {
      setRounds(rounds + 1);
    }
  }

  function endGame() {
    setGameOver(true);
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
    
    <ThemeProvider theme={theme}>
    
    <div className="App">
      <Header restartGame={restartGame}></Header>
      <div>
        {gameOver === true
        ? <div> 
            <GameOver 
              finalGameData={finalGameData}
              score={score}
              rounds={rounds}
              totalRounds={totalRounds}
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
                endGame={endGame} 
                gameData={finalGameData}
                totalRounds={totalRounds}
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
  </ThemeProvider>

  );
}

export default App;
