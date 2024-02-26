import React, { useState, useEffect } from 'react';

const clockSx = {
  "border": "1px solid black",
  "width": "60px",
  "fontFamily": "Anta"
};

const CountdownTimer = ({ minTime }) => {
  const initialTimeInSeconds = minTime * 60;
  const [startBtn, setStartBtn] = useState(true);
  const [time, setTime] = useState(initialTimeInSeconds);
  const [currTime, setCurrTime] = useState(minTime);
  const [timerStarted, setTimerStarted] = useState(false);

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
      setCurrTime(minTime);
      setTime(minTime * 60);
      setStartBtn(true);
      setTimerStarted(false);
    }
  }, [time, minTime]);

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
      <button onClick={timerStarted ? restartTimer : startTimer}>{startBtn ? "Start" : "Restart"}</button>
    </>
  );
};

export default CountdownTimer;
