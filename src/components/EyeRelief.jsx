import React, { useState, useEffect } from 'react';
import Switch from "@mui/material/Switch";
import Slider from '@mui/material/Slider';
import CountdownTimer from './CountdownTimer';

const notiBar = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  border: "1px"
};

const EyeRelief = () => {
  const [valDisp, setValDisp] = useState(false);
  const [min, setMin] = useState(() => {
    const savedMin = localStorage.getItem("min");
    return savedMin ? parseInt(savedMin) : 1;
  });

  useEffect(() => {
    localStorage.setItem("min", min);
  }, [min]);

  const onMouseEnter = () => {
    setValDisp(true);
  };

  const onMouseLeave = () => {
    setValDisp(false);
  };

  const setSliderVal = (e, newVal) => {
    setMin(newVal);
  };

  return (
    <>
      <div>Give break to eyes after <span>{min}</span> minutes</div>
      <Slider
        aria-label="Always visible"
        defaultValue={20}
        value={min}
        step={1}
        valueLabelDisplay={valDisp ? "on" : "off"}
        onChange={setSliderVal}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        max={60}
        sx={{ width: "150px" }}
      />
      <div style={notiBar}>
        <div>Notification</div>
        <Switch />
      </div>
      <div style={notiBar}>
        <div>Sound</div>
        <Switch />
      </div>
      <div>You are using the device continuously for<CountdownTimer minTime={min}/></div>
    </>
  );
};

export default EyeRelief;
