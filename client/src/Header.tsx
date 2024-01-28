import './App.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

type restart = {
  totalRounds: number,
  gameStarted: Boolean
}

export default function Header(props: restart) {
  const {totalRounds, gameStarted} = props;

  return (
    <Box className="header" sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography 
            className="headerTitle" 
            variant="h5" 
            component="div" 
            sx={{ flexGrow: 1 }}>
              Mount Trivia
              {totalRounds === -1 && gameStarted === true
                ?<strong className='suddenDeathTitle' color='secondary'>SUDDEN DEATH</strong>
                :<></>
              }
          </Typography>        
          <img className="logo" src="./alliance.png"></img>
          <img className="logo" src="./horde.jpg"></img>                
        </Toolbar>
      </AppBar>
    </Box>
  );
}