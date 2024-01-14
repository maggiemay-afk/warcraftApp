import React, { Component, useState, useEffect, useCallback } from 'react';
import {Button} from '@mui/material/';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box'; 
import './App.css';
import { GameData } from './types';
import { error } from 'console';

type MountImageProps = {
  updateScore: Function,
  updateRound: Function,
  updateGameData: Function,
  endGame: Function,
  gameData: GameData[],
  totalRounds: number
}

type ImageResponse = {
  image: string,
  names: string[],
  answer: string,
}

//check for duplicate mounts in a single game, not used in sudden death
function checkGameData(allGameData: GameData[], data: ImageResponse): boolean{
  for (let i=0; i<allGameData.length; i++){
    if(data.image === allGameData[i].image){
      return true;
    }
  }
  return false;
}

class DuplicateMountError extends Error {
  constructor(message: string, imageResponse: ImageResponse) {
    super(message); 
    this.name = "DuplicateMountError"; 
  }
}


const MountImage = (props: MountImageProps) => {
  const {updateScore, updateRound, updateGameData, endGame, gameData, totalRounds} = props;
  const [image, setImage] = useState<ImageResponse|undefined>();
  const [choice, setChoice] = useState<string|undefined>();

  const setNewMount = useCallback(async () => {
    for (let i=0; i < 3; i++) {
      try {
        return await fetch('http://localhost:3001/new-mount')
          .then((res) => res.json())
          .then((data) => {
            
            if (totalRounds !== -1) {

              if (!checkGameData(gameData, data)) {
                setImage(data);
              } else {
                throw DuplicateMountError;
              }

           } else if (totalRounds === -1){
            setImage(data);
           }

          })
      } catch(err){
          const isLastAttempt = i + 1 === 3;
          if (isLastAttempt) throw err;
      }
   }
  }, []);

  useEffect(() => {
      setNewMount();
  }, [setNewMount]);

  if (!image) {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress className="loadingBar"/>
        <img className='mountImage' src="./600x600-pure-black.png"></img>
      </Box>
    )
  }

  const evaluate = (choice: string) => {

    setChoice(choice);
    
    //Don't track game data in sudden death
    if (totalRounds !== -1) {
      updateGameData(image.image, choice, image.answer);
    }
    
    if (choice !== image.answer && totalRounds === -1){
      updateGameData(image.image, choice, image.answer);
      endGame();

    } else {
      
      if (choice === image.answer) {
        updateScore();
      }
      
      setTimeout(() => {
        setImage(undefined);
        setNewMount();
        setChoice(undefined);
        updateRound();
      }, 5000)
    }
  }

  let Display = undefined;

  if(choice !== undefined) {
    
    Display = choice === image.answer
      ? <Stack className="displayAlert" justifyContent="center" alignItems="center">
          <Alert variant="filled" severity="success">
            <AlertTitle>Correct</AlertTitle>
            <p className='displayAlertText'>Your Choice: <strong>{choice}</strong></p>
            <p className='displayAlertText'>Correct Answer: <strong>{image.answer}</strong></p>
          </Alert>
        </Stack>
      : <Stack className="displayAlert" justifyContent="center" alignItems="center">
          <Alert variant="filled" severity="error">
            <AlertTitle>Incorrect</AlertTitle>
            <p className='displayAlertText'>Your Choice: <strong>{choice}</strong></p>
            <p className='displayAlertText'>Correct Answer: <strong>{image.answer}</strong></p>
          </Alert>        
        </Stack>
  }

  return (
    <div>
      {Display}
      <img className='mountImage' src={image.image}></img>
      <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
        {image.names.map((item) => <Button disabled={!!choice} variant="outlined" onClick={() => evaluate(item)}> {item} </Button>)}
      </Stack>
    </div>
  )

} 

export default MountImage;