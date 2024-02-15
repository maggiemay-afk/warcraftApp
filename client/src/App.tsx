import './App.css';
import Header from './Header';
import Footer from './Footer';
import MountImage from './MountImage';
import GameOver from './GameOver';
import LandingPage from './LandingPage';
import { GameData } from './types';
import {useState} from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#67032F',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});


function App() {
  const [timerID, setTimerID] = useState<number>(-1);
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

  function restartGame(warning: Boolean){
    clearTimeout(timerID);
    setTimerID(-1);
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
                <Header
                  totalRounds={totalRounds}
                  gameStarted={gameStarted}
                />
                <MountImage 
                  updateRound={incrementRound} 
                  updateScore={incrementScore} 
                  updateGameData={updateGameData}
                  endGame={endGame} 
                  gameData={finalGameData}
                  totalRounds={totalRounds}
                  setTimerID = {setTimerID}
                />
              <Footer 
                score={score} 
                round={rounds}
                totalRounds={totalRounds}
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
