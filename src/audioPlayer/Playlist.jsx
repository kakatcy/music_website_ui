import React from 'react';
import playlistButton from './icons/playlist-50.png';
import { Dropdown,Tooltip, OverlayTrigger } from 'react-bootstrap';
import './styles/Playlist.css';


const style = {
  height: '30px', width: '30px', backgroundSize: 'cover', backgroundColor: 'transparent',
  border: 'none', backgroundImage: `url(${playlistButton})`, opacity: '0.7',
}

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <OverlayTrigger
    key={'playlist'}
    placement={'top'}
    overlay={
      <Tooltip id={'playlist'}>
        playlist
      </Tooltip>
    }
  >
    <div
      className="controls"
      style={style}
      ref={ref}
      onClick={e => {
        e.preventDefault();
        onClick(e);
      }}
    >
    </div>
  </OverlayTrigger>
));

function Playlist(props) {

  const { playlist, onMuiscSelect, removeFromPlaylist } = props;
  let dropItem;

  if (playlist.musics.length === 0) {
  dropItem = <Dropdown.Item onClick={ (e) => {e.preventDefault();}}>Nothing in playlist currently</Dropdown.Item>
  } else {
    dropItem = playlist.musics.map((e, key) => {
      return (
        <Dropdown.Item href="" key={key} style={{display: 'flex'}} onClick={(e) => { e.preventDefault(); }}>
          <div style={{paddingRight: '0.8em'}} onClick={(e) => { removeFromPlaylist(key);}}>
            <OverlayTrigger
              key={'delete'}
              placement={'top'}
              overlay={
                <Tooltip id={'delete'}>
                  delete
                </Tooltip>
              }
            >
              <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
              </svg>
            </OverlayTrigger>
          </div>
          <div onClick={() => { onMuiscSelect(key) }}>{ e.title.length > 30? `${e.title.slice(0,27)}...`: e.title }</div>
        </Dropdown.Item>
      );
    });
  } 

  return (
    <Dropdown drop="up">
      <Dropdown.Toggle as={CustomToggle} />
      <Dropdown.Menu>
        {dropItem}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default Playlist;