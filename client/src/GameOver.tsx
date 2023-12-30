import './App.css';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';


export default function Header() {

  return (
  
    <Stack sx={{width: '50%'}}>
      <Alert variant="filled" severity="success">
        <AlertTitle>Game Over</AlertTitle>
      </Alert>
    </Stack>
  )

}

