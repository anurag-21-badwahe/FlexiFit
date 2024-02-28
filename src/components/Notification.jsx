import React from 'react';

function Notification({ notificationText }) {
  const notifyUser = (text) => {
    if (!("Notification" in window)) {
      alert("Browser does not support notifications");
    } else if (Notification.permission === "granted") {
      const notification = new Notification(text);
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          const notification = new Notification(text);
        }
      });
    }
  };
   
  // Trigger notification when component mounts
  useEffect(() => {
    notifyUser(notificationText);
  }, [notificationText]);

  return null; // Notifications don't need to render anything in the DOM
}

export default Notification;
