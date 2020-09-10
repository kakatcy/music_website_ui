import React from 'react';
import './styles/Info.css';
import defaultThumb from './icons/default_thumb.jpg';

function Info(props) {
  const nowPlaying = props.nowPlaying;

  return (
    <div className="info">
      <div className="thumbnail" >
        <img style ={ {height: '75px', width: '133px'}} src={nowPlaying.thumbnail? nowPlaying.thumbnail : defaultThumb} alt={nowPlaying.title}/>
      </div>
      <div className="textInfo">
        <div>{nowPlaying.title}</div>
        <div>{nowPlaying.author}</div>
      </div>
    </div>
  );
}

export default Info;