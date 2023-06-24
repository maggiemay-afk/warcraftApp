import { error } from 'console';
import React, { Component, useState, useEffect } from 'react';
import {TextField, Button} from '@mui/material/';

type ImageResponse = {
  image: string,
  name: string
}

export default function MountImage() {
  const [image, setImage] = useState<ImageResponse|undefined>();

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

  if (!image) {
    return (
      <p>loading...</p>
    )
  }

  return (
    <div>

      <img src={image.image}></img>
      <p>Answer: {image.name}</p>
      <TextField id="outlined-basic" label="Answer" variant="outlined"/>
      <Button variant="outlined" size="large">Submit</Button>
      
    </div>
  )
}