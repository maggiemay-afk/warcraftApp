import './App.css';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import Typography from '@mui/material/Typography';


type FooterProps = {
  score: number,
  round: number,
  restartGame: Function,
  totalRounds: number
}

export default function Footer(props: FooterProps) {
  const {score, round, restartGame, totalRounds} = props;
  
  return (
    <Box 
      className="footer" 
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <BottomNavigation showLabels>
        <BottomNavigationAction 
          onClick={() => restartGame()} 
          label="Restart Game" 
          icon={<RestoreIcon/>}
          className="restartButton" 
        />
        <Typography 
            className="gameData" 
            variant="h5">
            <strong>Score: {score}</strong> 
        </Typography>
        <Typography 
            className="gameData" 
            variant="h5">
            {totalRounds === -1
              ?<strong>Round: {round}</strong>
              :<strong>Round: {round}&nbsp; of &nbsp;{totalRounds}</strong>
            } 
        </Typography>
      </BottomNavigation>
    </Box>
  );
}

