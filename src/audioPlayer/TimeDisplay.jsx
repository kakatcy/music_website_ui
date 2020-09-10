import React from 'react';

function TimeDisplay (props) {
  const currentTime = getTime(props.currentTime);
  const totalTime = getTime(props.totalTime);
  return (
    <div className="timeDisplay">
      <span>{currentTime}/{totalTime}</span>
    </div>
  );
}

// time formatter
const getTime = time => {
  if (time) {
    const minute = parseInt((time / 60));
    const second = parseInt(time % 60);
    let minuteText = `${minute}`;
    let secondText = `${second}`;
    if (minute < 10) {
      minuteText = `0${minute}`;
    }
    if (second < 10) {
      secondText = `0${second}`;
    }
    return `${minuteText}:${secondText}`;
  } else {
    return "00:00";
  }
};

export default TimeDisplay;