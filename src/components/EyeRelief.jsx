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
    return savedMin ? parseFloat(savedMin) : 20; // Retrieve min value from local storage, parse as float
  });
  const [notificationOn, setNotificationOn] = useState(false);
  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    if(min > 0) localStorage.setItem("min", min.toString()); // Store min value as string in local storage   
  },[min]);

  const onMouseEnter = () => {
    setValDisp(true);
  };

  const onMouseLeave = () => {
    setValDisp(false);
  };

  const setSliderVal = (e, newVal) => {
    if(newVal > 0){
      setMin(newVal); // Update min value directly
    }
  };

  const handleNotificationToggle = () => {
    setNotificationOn(!notificationOn);
    if (!notificationOn) {
      alert("Notifications turned on!");
    } else {
      alert("Notifications turned off!");
    }
  };
  const handleSoundToggle = () => {
    setSoundOn(!soundOn);
    if (!soundOn) {
      alert("Alarm turned off!");
    } else {
      alert("Alarm turned on!");
    }
  };

  return (
    <>
      <div>Give break to eyes after <span>{min}</span> minutes</div>
      <Slider
        aria-label="Always visible"
        defaultValue={20}
        value={min}
        step={5}
        valueLabelDisplay={valDisp ? "on" : "off"}
        onChange={setSliderVal}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        max={60}
        min={0.1}
        sx={{ width: "150px" }}
      />
      <div style={notiBar}>
        <div>Notification</div>
        <Switch onClick={handleNotificationToggle} />
      </div>
      <div style={notiBar}>
        <div>Sound</div>
        <Switch onClick = {handleSoundToggle}/>
      </div>
      <div>You are using the device continuously for<CountdownTimer minTime={min}/></div>
    </>
  );
};

export default EyeRelief;
