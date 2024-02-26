import React, { useState } from 'react';
import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";
import Slider from '@mui/material/Slider';

const notiBar = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  border: "1px"
};

const EyeRelief = () => {
  const [valDisp, setValDisp] = useState(false);
  const [min,setMin] = useState(20)

  const onMouseEnter = () => {
    setValDisp(true);
  };

  const onMouseLeave = () => {
    setValDisp(false);
  };
  const setSliderVal = (e,newVal)=>{
    setMin(newVal)
  }


  return (
    <>
      <div>Give break to eyes after <span>{min}</span> minutes</div>
      <Slider
        aria-label="Always visible"
        defaultValue={20}
        value = {min}
        step={10}
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
        
    </>
  );
};

export default EyeRelief;
