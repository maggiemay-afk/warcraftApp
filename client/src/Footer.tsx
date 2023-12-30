import * as React from 'react';
import './App.css';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Typography from '@mui/material/Typography';

//TODO: Restart Game on click should actually restart game

type GameData = {
  score: number,
  round: number
}

export default function Footer(props: GameData) {
  const {score, round} = props;
  const [value, setValue] = React.useState(0);
  
  return (
      <Box className="footer">
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Restart Game" icon={<RestoreIcon />} />
          <Typography className="gameData" variant="h6">Score: {score}</Typography>
          <Typography className="gameData" variant="h6">Round: {round}</Typography>

        </BottomNavigation>
      </Box>
  );
}

