import React from 'react';
import nextIcon from './icons/next-30.png';

function NextButton(props) {
  const enable = props.enable;
  const onNextClick = props.onNextClick;

  const style = {
    height: '30px', width: '30px', backgroundSize: 'cover', opacity: '70%',
    backgroundImage: `url(${nextIcon})`, 
  };

  // if this button is disable
  if (!enable) {
    style.opacity = '35%';
    return (
      <div className="controls" style={style} ></div>
    );
  }

  return (
      <div className="controls" style={style} onClick={onNextClick} ></div>
  );
}

export default NextButton;