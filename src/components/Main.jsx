import * as React from "react";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";


import EyeRelief from "./EyeRelief";
import PostureCorrection from "./PostureCorrection";
import WaterIntake from "./WaterIntake";
import BlueLightFilter from "./BlueLightFilter";

const cards = [
  { title: "Eye Relief", content: <EyeRelief /> },
  { title: "Posture Correction", content: <PostureCorrection /> },
  { title: "Water Intake Tracker", content: <WaterIntake /> },
  { title: "Blue light mode", content: <BlueLightFilter /> },
];


function Main() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = cards.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
  };

  const handleBack = () => {
    setActiveStep(
      (prevActiveStep) => (prevActiveStep - 1 + maxSteps) % maxSteps
    );
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        flexGrow: 1,
        border: "1px solid black",
        borderRadius: "25%",
      }}
    >
      <Paper square elevation={0}>
        <Typography
          sx={{
            backgroundColor: "#0093E9",
            backgroundImage:
              "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)",
            padding: "4px",
            borderRadius: "15px",
            fontFamily: "'Play', sans-serif", 
          }}
        >
          {cards[activeStep].title}
        </Typography>
      </Paper>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={(index) => setActiveStep(index)}
        enableMouseEvents
      >
        {cards.map((card, index) => (
          <Box key={index}>
            {index === activeStep && <Box>{card.content}</Box>}
          </Box>
        ))}
      </SwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
          </Button>
        }
      />
    </Box>
  );
}

export default Main;
