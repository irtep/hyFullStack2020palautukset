import React, {useState} from 'react';

const ActionButton = ({id, action, name, textColor, bgColor, hoverText, hoverBg}) => {
  const [hovered, setHovered] = useState(false);

  const hoverSwitch = () =>{
    setHovered(!hovered);
  };

  let style = null;

  if (hovered) {
    style = {
      color: hoverText,
      background: hoverBg
    };
  } else {
    style = {
      color: textColor,
      background: bgColor,
      border: `2px solid ${textColor}`};
  }

  return(
    <>
      <button
        id= {id}
        onClick= {action}
        name= {name}
        style = {style}
        onMouseEnter= {hoverSwitch}
        onMouseLeave= {hoverSwitch}>
        {name}
      </button>
    </>
  );
};

export default ActionButton;
