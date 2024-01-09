import './App.css';
import { GameData } from './types';
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

type finalGameData = {
  finalGameData: GameData[],
  score: number,
  rounds: number,
  restartGame: Function
}

function userAnswer(choice: string, answer: string) {
  if (choice === answer) {
    return <span>you: {choice}</span>
  } else {
    return <span className="incorrectAnswer">you: {choice}</span>
  }
}

export default function GameOver(props: finalGameData) {
  const {finalGameData, score, rounds, restartGame} = props;

  return (
    <div className="gameOver">
      <Stack className="gameOverTitle" sx={{ width: '100%' }} spacing={2}>
        <Alert sx={{display: "flex", justifyContent: "center"}} variant="outlined" severity="info" icon={false}>
          <Typography variant="h2">Game Over. Score: <strong>{score/rounds*100}%</strong></Typography>
        </Alert>
      </Stack>
      
      <Typography className="recapTitle" variant="h2"><strong>recap</strong></Typography>
      <Box         
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <ImageList sx={{ width: 800, height: 450}} cols={3} rowHeight={300} >        
            {finalGameData.map((item) => (
              <ImageListItem key={item.image}>
                <img
                  srcSet={`${item.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  src={`${item.image}?w=164&h=164&fit=crop&auto=format`}
                  alt={item.answer}
                  loading="lazy"
                />
                <ImageListItemBar
                title={item.answer}
                subtitle={userAnswer(item.choice, item.answer)}
                position='below'
              />
              </ImageListItem>
            ))}
        </ImageList>
      </Box>
      <Button 
        className="startButton" 
        variant="contained" 
        size="large" 
        onClick={() => restartGame()}>
          Restart Game
      </Button>
    </div>
  )
}

