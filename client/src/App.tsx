import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import MountImage from './MountImage';
import { TextField, Button } from '@mui/material';
import Header from './Header';

function App() {
  const [gameStarted, setGameStarted] = useState<Boolean>(false);

  function startGame() {
    setGameStarted(true);
  }

  return (
    <div className="App">
      
      <Header></Header>
      <div>
        { gameStarted == false 
          ? <div>
              <p>This is a WoW mount guessing game.<br></br>Click the button to get started</p>
              <Button variant="contained" size="large" onClick={startGame}>START</Button>
            </div>
          : <MountImage/>
        }
      </div>
    </div>
  );
}

export default App;
