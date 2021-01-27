import React from 'react';
import { useSelector } from 'react-redux';

const goodStyle = { color: 'rgb(10, 200, 20)',
  textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
};
const badStyle = {
  color: 'rgb(255, 0, 0)',
  textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
};


// send object with msg string and badNews boolean
const Notification = () => {
  const message = useSelector(state => state.notifications);
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
