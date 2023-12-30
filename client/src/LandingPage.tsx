import './App.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


type HeaderProps = {
  startGame: Function
}

export default function LandingPage(props: HeaderProps) {
  const {startGame} = props;

  return (

    <div className="landingPage">
      <Box
        className="landingPageBox"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Stack className="gameOverTitle" sx={{ maxWidth: '100%' }}>
          <Alert sx={{display: "flex", justifyContent: "center"}} variant="outlined" severity="info" icon={false}>
            <Typography variant="h2">Instructions</Typography>
            <Typography className="instructionP" variant="h6" >
              This is a trivia game for guessing mount names in World of Warcraft<br></br>
              A picture will be provided from Blizzard followed by multiple choice options<br></br>
              The false names have been generated using ChatGPT<br></br>
              One game lasts 10 rounds, click the button to get started
            </Typography>
          </Alert>
        </Stack>        
      </Box>

      <Button 
        className="startButton" 
        variant="contained" 
        size="large" 
        onClick={() => startGame()}>START
      </Button>

    </div>
  );

}