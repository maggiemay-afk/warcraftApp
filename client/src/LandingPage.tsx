import './App.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { collageArray } from "./config/imageCollage";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';


type HeaderProps = {
  startGame: Function
}

const ScreenWidth = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('lg'));

  if (matches) {
    return 5;
  } else{
    return 3;
  }
  
}

export default function LandingPage(props: HeaderProps) {
  const { startGame } = props;

  return (
    <div >
      <Box width={"100%"} height={100}>
        <Typography sx={{ padding: 2 }} color="white" variant="h2" className="mount-trivia">Mount Trivia</Typography>
        <Stack
          spacing={2}
          direction="row"
          display="flex"
          justifyContent="center"
          alignItems="center"
          className='landing-buttons'
          sx={{ padding: 2 }}
        >
          <Button
            sx={{ boxShadow: 10 }}
            className="start-button"
            variant="contained"
            size="large"
            onClick={() => startGame(10)}
          > Mini Game
          </Button>
          <Button
            sx={{ boxShadow: 10 }}
            className="start-button"
            variant="contained"
            size="large"
            onClick={() => startGame(20)}
          > Normal Game
          </Button>
          <Button
            sx={{ boxShadow: 10 }}
            className="start-button"
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => startGame(-1)}
          > Sudden Death
          </Button>
        </Stack>
      </Box>

      <Typography sx={{ paddingBottom: 3, paddingTop: 2 }} variant='subtitle1' color={'white'}>
        Multiple choice style game for guessing mounts in World of Warcraft.<br></br>
        Mini Game: 10 rounds, Normal Game: 20 rounds. Sudden death ends after any wrong answer.
      </Typography>

      <ImageList 
        sx={{ paddingLeft: 1, paddingRight: 1, m: 0 }} 
        variant="masonry" 
        gap={4} 
        cols={ScreenWidth()} 
      >
        {collageArray.map((item: any) => (
          <ImageListItem >
            <img
              src={item}
              alt="Collage of images from World of Warcraft"
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}      
