import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';

// Sample card data
const cards = [
  {
    title: 'Card 1',
    content: 'This is the content of Card 1.',
  },
  {
    title: 'Card 2',
    content: 'This is the content of Card 2.',
  },
  {
    title: 'Card 3',
    content: 'This is the content of Card 3.',
  },
  {
    title: 'Card 4',
    content: 'This is the content of Card 4.',
  },
];

function SwipeableCardStepper() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = cards.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep - 1 + maxSteps) % maxSteps);
  };

  return (
    <Box sx={{ maxWidth: 400, flexGrow: 1 ,border:"1px solid black",borderRadius:"25%"}}>
      <Paper square elevation={0}>
        <Typography>{cards[activeStep].title}</Typography>
      </Paper>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={(index) => setActiveStep(index)}
        enableMouseEvents
      >
        {cards.map((card, index) => (
          <Box key={index}>
            {index === activeStep && (
              <Box>
                <Typography>{card.content}</Typography>
                {/* Add your functionality or components for each card here */}
              </Box>
            )}
          </Box>
        ))}
      </SwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext}>
            
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            
          </Button>
        }
      />
    </Box>
  );
}

export default SwipeableCardStepper;