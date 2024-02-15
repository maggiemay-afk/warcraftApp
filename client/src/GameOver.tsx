import './App.css';
import { GameData } from './types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

type finalGameData = {
  finalGameData: GameData[],
  score: number,
  rounds: number,
  totalRounds: number,
  restartGame: Function
}

function userAnswer(choice: string, answer: string) {
  if (choice === answer) {
    return <span>you: {choice}</span>
  } else {
    return <span className="incorrect-answer">you: {choice}</span>
  }
}

export default function GameOver(props: finalGameData) {
  const {finalGameData, score, rounds, totalRounds, restartGame} = props;

  return (
    <div className="game-over">
      <Stack className="game-over-title" sx={{ width: '100%' }} spacing={2}>
        {totalRounds === -1 
          ? <Typography variant="h2">You made it <strong>{rounds-1}</strong> rounds</Typography>
          : <Typography variant="h2">Game Over. Score: <strong>{score/rounds*100}%</strong></Typography>
        }
      </Stack>
      <Typography className="recap-title" variant="h2"><strong>recap:</strong></Typography>
      <Box         
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
      <ImageList sx={{ width: 800, height: 450}} cols={3} rowHeight={350} >        
          {finalGameData.map((item) => (
            <ImageListItem key={item.image}>
              <img
                srcSet={`${item.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.image}?w=164&h=164&fit=crop&auto=format`}
                alt={item.answer}
                loading="lazy"
              />
              <ImageListItemBar
              className='recap-image-title'
              title={item.answer}
              subtitle={userAnswer(item.choice, item.answer)}
              position='below'
            />
            </ImageListItem>
          ))}
      </ImageList>
      </Box>
      <div className="start-button" >
        <Button 
          variant="contained" 
          color="secondary"
          size="large" 
          onClick={() => restartGame()}
        >
        Restart Game
        </Button> 
      </div>
    </div>
  )
}

