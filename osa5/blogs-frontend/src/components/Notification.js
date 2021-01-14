import React from 'react';
const goodStyle = { color: "green" };
const badStyle = { color: 'red' };

// send object with msg string and badNews boolean
const Notification = ({ message }) => {
  if (message.msg === null) {
    return null
  } else {
    if (message.badNews) {
      return (
        <div className="notifications" style= {badStyle}>
          {message.msg}
        </div>
      )
    } else {
      return (
        <div className="notifications" style= {goodStyle}>
          {message.msg}
        </div>
      )
    }
  }
}

export default Notification;
