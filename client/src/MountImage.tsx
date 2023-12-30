import React, { Component, useState, useEffect, useCallback } from 'react';
import {Button} from '@mui/material/';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box'; 
import './App.css';
import { GameData } from './types';

type MountImageProps = {
  updateScore: Function,
  updateRound: Function,
  updateGameData: Function,
  gameData: GameData[]
}

type ImageResponse = {
  image: string,
  names: string[],
  answer: string,
}

function checkGameData(allGameData: GameData[], data: ImageResponse): boolean{

  //see if the current image is already in finalGameData

  return false;

}


const MountImage = (props: MountImageProps) => {
  const {updateScore, updateRound, updateGameData, gameData} = props;
  const [image, setImage] = useState<ImageResponse|undefined>();
  const [choice, setChoice] = useState<string|undefined>();
  

  const setNewMount = useCallback(() => {
    fetch('http://localhost:3001/new-mount')
    .then((res) => res.json())
    .then((data) => {

       //if (!checkGameData(gameData, data)) {
       // setImage(data);
       //} 
       //call API again? 
       setImage(data);

    })
    .catch((error) => {
      console.log(error.message);
    })
  }, []);

  useEffect(() => {
      setNewMount();
  }, [setNewMount]);

  if (!image) {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress className="loadingBar"/>
      </Box>
    )
  }

  const evaluate = (choice: string) => {

    setChoice(choice);
    updateGameData(image.image, choice, image.answer);

    if (choice === image.answer) {
      updateScore();
    }

     setTimeout(() => {
      setImage(undefined);
      setNewMount();
      setChoice(undefined);
      updateRound();
     }, 1000)

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