import React, { useState, useEffect } from 'react';
import AlarmSound from '../assets/sound.wav';

const clockSx = {
  "border": "1px solid black",
  "width": "60px",
  "fontFamily": "Anta",
  "marginTop": "10px"
};

const CountdownTimer = ({ minTime, sound }) => {
  const initialTimeInSeconds = localStorage.getItem("time") || minTime * 60;
  const initialTimerStarted = localStorage.getItem("timerStarted") === "true" || false;
  const [startBtn, setStartBtn] = useState(!initialTimerStarted);
  const [time, setTime] = useState(parseInt(initialTimeInSeconds));
  const [currTime, setCurrTime] = useState(minTime);
  const [timerStarted, setTimerStarted] = useState(initialTimerStarted);

  useEffect(() => {
    let intervalId;
    if (timerStarted && currTime) {
      intervalId = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [timerStarted, currTime]);

  useEffect(() => {
    if (time === 0) {
      console.log("Timer reached zero. Opening new window...");
      const newWindow = window.open("https://www.medicalnewstoday.com/articles/321536");
      if (newWindow) {
        console.log("New window opened successfully.");
      } else {
        console.error("Failed to open new window. Popup blocker might be active.");
      }
      setCurrTime(minTime);
      setTime(minTime * 60);
      setStartBtn(true);
      setTimerStarted(false);
    }
  }, [time, minTime]);

  useEffect(() => {
    if (time < 3 && sound === true) {
      new Audio(AlarmSound).play();
    }
  }, [time, sound]);

  useEffect(() => {
    localStorage.setItem("time", time);
    localStorage.setItem("timerStarted", timerStarted);
  }, [time, timerStarted]);

  useEffect(() => {
    const storedTime = parseInt(localStorage.getItem("time"));
    const storedTimerStarted = localStorage.getItem("timerStarted") === "true";

    if (storedTimerStarted) {
      setTime(storedTime);
      setCurrTime(Math.floor(storedTime / 60));
      setStartBtn(false);
      setTimerStarted(true);
    }
  }, []);

  const startTimer = () => {
    setStartBtn(!startBtn);
    setTimerStarted(!timerStarted);
    if (!timerStarted) {
      setCurrTime(minTime);
      setTime(minTime * 60);
    }
  };

  const restartTimer = () => {
    setTime(minTime * 60);
    setCurrTime(minTime);
    setStartBtn(!startBtn);
    setTimerStarted(false);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;

    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <>
      <div style={{ "display": "flex", "justifyContent": "center" }}>
        <div style={clockSx}>{formatTime(time)}</div>
      </div>
      <button style={{ "margin": "20px" }} onClick={timerStarted ? restartTimer : startTimer}>{startBtn ? "Start" : "Reset"}</button>
    </>
  );
};

export default CountdownTimer;