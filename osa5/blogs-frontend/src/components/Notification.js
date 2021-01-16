import React from 'react';
const goodStyle = { color: 'green',
  textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
};
const badStyle = {
  color: 'red',
  textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
};


// send object with msg string and badNews boolean
const Notification = ({ message }) => {
  if (message.msg === null) {
    return null;
  } else {
    if (message.badNews) {
      return (
        <div className="notifications" style= {badStyle}>
          {message.msg}
        </div>
      );
    } else {
      return (
        <div className="notifications" style= {goodStyle}>
          {message.msg}
        </div>
      );
    }
  }
};

export default Notification;
