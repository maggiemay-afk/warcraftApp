import './App.css';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


export default function Header() {
  return (
    <Box className="header" sx={{ flexGrow: 1 }}>
        <img className="headerImage" src='./halfhill.png'></img>
        <AppBar position="static">
            <Toolbar>
                <Typography 
                  className="headerTitle" 
                  variant="h5" 
                  component="div" 
                  sx={{ flexGrow: 1 }}>
                    Mount Trivia
                </Typography>
                <img className="logo" src="./alliance.png"></img>
                <img className="logo" src="./horde.jpg"></img>                
            </Toolbar>
        </AppBar>
    </Box>
  );
}