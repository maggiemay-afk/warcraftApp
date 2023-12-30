import { error } from 'console';
import React, { Component, useState, useEffect, useCallback } from 'react';
import {TextField, Button, ImageList} from '@mui/material/';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box'; 
import './App.css';

type MountImageProps = {
  updateScore: Function,
  updateRound: Function,
  allGameData: Array<string>
}

type ImageResponse = {
  image: string,
  names: string[],
  answer: string,
}

function updateAllGameData() {

}

const MountImage = (props: MountImageProps) => {
  const {updateScore, updateRound, allGameData} = props;
  const [image, setImage] = useState<ImageResponse|undefined>();
  const [choice, setChoice] = useState<string|undefined>();
  

  const setNewMount = useCallback(() => {
    fetch('http://localhost:3001/new-mount')
    .then((res) => res.json())
    .then((data) => {

      setImage(data);

    })
    .then((data) => {

      updateAllGameData();

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

    if (choice === image.answer) {
      updateScore();
    }

     setTimeout(() => {
      setImage(undefined);
      setNewMount();
      setChoice(undefined);
      updateRound();
     }, 10000)

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
        {image.names.map((item) => <Button variant="outlined" onClick={() => evaluate(item)}> {item} </Button>)}
      </Stack>

    </div>
  )

} 

export default MountImage;