import React, { useRef } from 'react';
import './styles/VolumeBar.css';
import volumeIcon from './icons/volume-30.png';

function VolumeBar(props) {
  const { volume, onVolumeUpdate } = props;
  // volumebar reference
  const volumeRef = useRef(null);

  // vol click handler
  const onVolumeClick = e => {
    const volDiv = volumeRef.current;
    // get click position 
    let offset = e.pageX - volDiv.getBoundingClientRect().left;
    if (offset < 0) {
      offset = 0;
    }
    if (offset > volDiv.offsetWidth) {
      offset = volDiv.offsetWidth
    }

    // calculate relative position(% of the processbar)
    const newVol = offset / volDiv.offsetWidth;

    onVolumeUpdate(newVol);
  }

  const slideStyle = {
    position: 'absolute', borderRadius: '50%', zIndex: '10', top: '-2px', left: `${volume * 100}%`,
    width: '8px', height: '8px', backgroundColor: 'cornsilk',
  };

  const icon = { height: '30px', width: '30px', backgroundImage: `url(${volumeIcon})`, opacity:'70%', marginRight: '0px' }
  return (
    <div className="volumeWrap">
      <div style={icon} className="controls"></div>
      <div className="volumeBar" ref={volumeRef} onClick={onVolumeClick}>
        <div className="silde" style={slideStyle} ></div>
      </div>
    </div>

  );
}

export default VolumeBar