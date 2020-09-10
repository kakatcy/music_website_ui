import React from 'react';
import repeatIcon from './icons/repeat-30.png';
import shuffleIcon from './icons/shuffle-30.png';
import {
  Tooltip, OverlayTrigger
} from 'react-bootstrap';

function ModeChange(props) {
  const { mode, onModeChange } = props;
  const style = {
    height: '30px', width: '30px', backgroundSize: 'cover', margin: 0
  };
  // playback mode: 0 none/1 list-repeat/2 shuffle
  switch (mode) {
    case 0:
      style['backgroundImage'] = `url(${repeatIcon})`;
      style['opacity'] = '50%';
      break;
    case 1:
      style['backgroundImage'] = `url(${repeatIcon})`;
      style['opacity'] = '100%';
      break;
    case 2:
      style['backgroundImage'] = `url(${shuffleIcon})`;
      style['opacity'] = '100%';
      break;
    default:
      style['backgroundImage'] = `url(${repeatIcon})`;
      style['opacity'] = '50%';
      break;
  }
  return (
    <OverlayTrigger
      key={'mode'}
      placement={'top'}
      overlay={
        <Tooltip id={'mode'}>
          mode
        </Tooltip>
      }
    >
      <div onClick={onModeChange} style={style} className="controls"></div>
    </OverlayTrigger>
  );
}

export default ModeChange;