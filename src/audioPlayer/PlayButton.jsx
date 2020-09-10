import React from 'react';
import playIcon from './icons/play-60.png';
import pauseIcon from './icons/pause-60.png';


function PlayButton(props) {
  const isPlay = props.isPlay;
  const onPlayClick = props.onPlayClick;
  const style = {
    height: '30px', width: '30px', backgroundSize: 'cover', opacity: '70%',
  };
  if (isPlay) {
    style['backgroundImage'] = `url(${pauseIcon})`;
  } else {
    style['backgroundImage'] = `url(${playIcon})`;
  }
  return (
      <div className="controls" onClick={onPlayClick} style={style}></div>
  );
}

export default PlayButton;