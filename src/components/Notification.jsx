import { useEffect } from 'react';
import PropTypes from 'prop-types';

function Notification({ notificationText }) {
  // Add prop validation for 'notificationText'
  Notification.propTypes = {
    notificationText: PropTypes.string.isRequired,
  };

  const notifyUser = (text) => {
    // Check for browser notifications support
    if (!("Notification" in window)) {
      alert("Browser does not support notifications");
    } else {
      // Display browser notification
      if (Notification.permission === "granted") {
        new Notification(text);
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            new Notification(text);
          }
        });
      }
    }

    // Check for desktop notifications support (using a third-party library, e.g., desktop-notification)
    if (window.desktopNotification && typeof window.desktopNotification.showNotification === 'function') {
      window.desktopNotification.showNotification('Desktop Notification', {
        body: text,
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
