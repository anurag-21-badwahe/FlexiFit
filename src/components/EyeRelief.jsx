import React, { useState, useEffect } from 'react';
import Switch from "@mui/material/Switch";
import Slider from '@mui/material/Slider';
import Alert from '@mui/material/Alert';
import CountdownTimer from './CountdownTimer';
import Notification from './Notification';

function notifyUser(notificationText = "Thank you for enabling notifications!") {
  if (!("Notification" in window)) {
    alert("Browser does not support notifications");
  } else if (Notification.permission === "granted") {
    const notification = new Notification(notificationText);
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        const notification = new Notification(notificationText);
      }
    });
  }
}

const notiBar = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  border: "1px"
};

const EyeRelief = () => {
  const [valDisp, setValDisp] = useState(false);
  const [userResponded, setUserResponded] = useState(false);
  const [min, setMin] = useState(() => {
    const savedMin = localStorage.getItem("min");
    return savedMin ? parseFloat(savedMin) : 20;
  });
  const [notificationOn, setNotificationOn] = useState(false);
  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    if (min > 0) localStorage.setItem("min", min.toString());
  }, [min]);

  const onMouseEnter = () => {
    setValDisp(true);
  };

  const onMouseLeave = () => {
    setValDisp(false);
  };

  const setSliderVal = (e, newVal) => {
    if (newVal > 0) {
      setMin(newVal);
    }
  };

  const handleNotificationToggle = () => {
    setNotificationOn(prevState => !prevState);
    if (!notificationOn) {
      alert("Notifications turned on!");
    } else {
      alert("Notifications turned off!");
    }
  };

  const handleSoundToggle = () => {
    setSoundOn(prevState => !prevState);
    if (!soundOn) {
      alert("Alarm turned on!");
    } else {
      alert("Alarm turned off!");
    }
  };

  const clickToNotify = () => {
    console.log("clickToNotify function called");
    if (!("Notification" in window)) {
      console.log("Browser does not support notifications");
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      console.log("Notification permission granted");
      showNotification();
    } else {
      console.log("Requesting notification permission");
      Notification.requestPermission().then(function (permission) {
        console.log("Permission status after request:", permission);
        if (permission === "granted") {
          console.log("Notification permission granted after request");
          showNotification();
        } else if (permission === "denied") {
          console.log("Notification permission denied after request");
          alert("Notifications are blocked. Please enable them in your browser settings.");
        }
      });
    }
  };
  
  const showNotification = () => {
    console.log("Showing notification");
    new Notification("Eye Relief", { body: "Take a break and rest your eyes!" });
  };
  
  
  
  

  
  

  useEffect(() => {
    if (Notification.permission === "granted") {
      notifyUser();
    }
  }, []);

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
        <Switch onClick={handleSoundToggle} />
      </div>
      <div>You are using the device continuously for<CountdownTimer minTime={min} /></div>
       <button onClick={clickToNotify}>show</button>
    </>
  );
}

export default EyeRelief;
