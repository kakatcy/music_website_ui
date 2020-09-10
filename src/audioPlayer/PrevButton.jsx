import React from 'react';
import prevIcon from './icons/prev-30.png';

function PrevButton(props) {
  const enable = props.enable;
  const onPrevClick = props.onPrevClick;
  const style = {
    height: '30px', width: '30px', backgroundSize: 'cover', opacity: '70%',
    backgroundImage: `url(${prevIcon})`, 
  };

  // if this button is disable
  if (!enable) {
    style.opacity = '35%';
    return (
      <div className="controls" style={style} ></div>
    );
  }

  return (
      <div className="controls" style={style} onClick={onPrevClick} ></div>
  );
}

export default PrevButton;