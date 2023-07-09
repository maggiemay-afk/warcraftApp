import { error } from 'console';
import React, { Component, useState, useEffect } from 'react';
import {TextField, Button} from '@mui/material/';
import fuzzysort from 'fuzzysort'

type ImageResponse = {
  image: string,
  name: string
}


export default function MountImage() {
  const [image, setImage] = useState<ImageResponse|undefined>();
  const [guessValue, setGuessValue] = useState<string>("");

  useEffect(() => {
    
    fetch('http://localhost:3001/new-mount')
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      setImage(data);
    })
    .catch((error) => {
      console.log(error.message);
    });
      
  }, []);

  function checkAnswer(): boolean {
    console.log(guessValue)

    if(!image) {
      return false;
    }

    const result = fuzzysort.single(guessValue, image.name)

    if (!result || result.score != 0) {
      return false;
    }
    
    console.log(result)
    return true;

  }

  if (!image) {
    return (
      <p>loading...</p>
    )
  }

  return (
    <div>

      <img id='mountImage' src={image.image}></img>
      <p>Answer: {image.name}</p>
      <div id='userInput'>
        <TextField 
            id="outlined-basic" 
            label="Answer" 
            variant="outlined"
            value={guessValue}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setGuessValue(event.target.value)
            }}
        />
        <Button variant="outlined" size="large" onClick={checkAnswer}>
          Submit
        </Button>
      </div>
    </div>
  )
}