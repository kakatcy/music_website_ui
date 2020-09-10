import React, { useRef } from 'react';
import './styles/ProgressBar.css'

function ProgerssBar(props) {
  const { currentTime, totalTime, buffered } = props;
  const { onTimeUpdate } = props;
  // calculate played percentage
  const played = parseInt(((currentTime / totalTime) * 100), 10);
  const playedStyle = { width: `${played}%`, backgroundColor: ' cornflowerblue', position: 'absolute', zIndex: '8', left: '0', height: '4px' };
  // calculate buffered percentage
  const buf = parseInt(((buffered / totalTime) * 100), 10);
  const bufStyle = { width: `${buf}%`, backgroundColor: '#545454', position: 'absolute', zIndex: '5', left: '0', height: '4px' };

  const onProgressClick = e => {
    const progressDiv = ProgressRef.current;
    // get click position 
    let offset = e.pageX - progressDiv.getBoundingClientRect().left;
    if (offset < 0) {
      offset = 0;
    }
    if (offset > progressDiv.offsetWidth) {
      offset = progressDiv.offsetWidth
    }

    // calculate relative position(% of the processbar)
    const offsetPercentage = offset / progressDiv.offsetWidth;
    const currentTime = offsetPercentage * totalTime;

    // ! debug
    console.log(`offset%=${offsetPercentage} currentTime=${currentTime}`);

    onTimeUpdate(currentTime);
  };

  const ProgressRef = useRef(null);

  const { onPlayheadRelease, onPlayheadMove, onPlayheadClick } = props;

  return (
    <div className="progressWrap" onClick={onProgressClick} onMouseMove={e => { onPlayheadMove(e, ProgressRef.current) }} onMouseUp={e => { onPlayheadRelease(e, ProgressRef.current) }}>
      <div className="progress" ref={ProgressRef} >
        <div className="played" style={playedStyle} >
          <div className="playhead" onMouseDown={onPlayheadClick} ></div>
        </div>
        <div className="buffered" style={bufStyle}></div>
      </div>
    </div>
  );
}


export default ProgerssBar;