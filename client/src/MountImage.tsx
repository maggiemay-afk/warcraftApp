import { error } from 'console';
import React, { Component, useState, useEffect } from 'react';
import {TextField, Button} from '@mui/material/';

//TO DO: Randomly sort / display the order of real and fake names
type ImageResponse = {
  image: string,
  names: string[]
}


export default function MountImage() {
  const [image, setImage] = useState<ImageResponse|undefined>();

  useEffect(() => {
    fetch('http://localhost:3001/new-mount')
    .then((res) => res.json())
    .then((data) => {

      console.log("Data:")
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

      <img id='mountImage' src={image.image}></img>
      <div>
        {image.names.map((item) => <Button>{item}</Button>)}
      </div>

    </div>
  )
}