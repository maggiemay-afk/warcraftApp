import './App.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import alliance from "./images/alliance.png"
import horde from "./images/horde.jpg"

type restart = {
  totalRounds: number,
  gameStarted: Boolean
}

export default function Header(props: restart) {
  const {totalRounds, gameStarted} = props;

  return (
    <Box className="header" sx={{ flexGrow: 1, bgcolor: "white"}}>
      <AppBar position="static" sx={{bgcolor: "transparent"}}>
        <Toolbar>
          <Typography 
            className="header-title" 
            variant="h4" 
            component="div"
            color="black" 
            sx={{ flexGrow: 1 }}>
              Mount Trivia
              {totalRounds === -1 && gameStarted === true
                ?<strong className='sudden-death-title'>SUDDEN DEATH</strong>
                :<></>
              }
          </Typography>        
          <img alt="alliance logo" className="logo" src={alliance}></img>
          <img alt="horde logo" className="logo" src={horde}></img>                
        </Toolbar>
      </AppBar>
    </Box>
  );
}