import React from 'react';
import {Modal, Button,Tooltip, OverlayTrigger} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from 'react';


function MusicsModal(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    return (
      <>
      <div variant="primary" onClick={handleShow} style={{width:'5%', height:'5%', fontSize:'0.8em',cursor:'pointer'}}>
        <OverlayTrigger
          key={'musics'}
          placement={'bottom'}
          overlay={
            <Tooltip id={'musics'}>
              musics
            </Tooltip>
          }
        >
          <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-justify" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
          </svg>
        </OverlayTrigger>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
      >
        <Modal.Header closeButton style={{backgroundColor: '#343b3f', color:'white', borderColor:'#66696d'}}>
          <Modal.Title>{"Musics"}</Modal.Title>
        </Modal.Header>
        
        <Modal.Body style={{backgroundColor: '#343b3f', color:'white', borderColor:'#66696d'}}>
          {props.musicsinfo.map((music,mkey) => (
            <div key={mkey} style={{display: 'flex', margin:'2%'}}>
              
              <div style={{flex:'3', alignItems:'center'}}>{music.title.length > 30? `${music.title.slice(0,27)}...`: music.title}</div>
              <div style={{width:'5%', height:'5%', fontSize:'0.8em',margin:'2%',cursor:'pointer'}} onClick={()=> {props.handleMusicDelete(props.playlistid,music.title)}}>
                <OverlayTrigger
                key={'deletemusic'}
                placement={'bottom'}
                overlay={
                  <Tooltip id={'deletemusic'}>
                    delete music
                  </Tooltip>
                }
                >
                  <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                  </svg>
                </OverlayTrigger>
              </div>
              <div style={{width:'5%', height:'5%', fontSize:'0.8em',flex:'0',margin:'2%',cursor:'pointer'}} onClick={()=> {props.addToPlaylist(music)}}>
                <OverlayTrigger
                  key={'addtoplaylist'}
                  placement={'bottom'}
                  overlay={
                    <Tooltip id={'addtoplaylist'}>
                      add to current playlist
                    </Tooltip>
                  }
                  >
                  <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-plus-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z"/>
                    <path fillRule="evenodd" d="M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z"/>
                    <path fillRule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                  </svg>
                </OverlayTrigger>
              </div>

            </div>
          ))}
        </Modal.Body>

        <Modal.Footer style={{backgroundColor: '#343b3f', color:'white', borderColor:'#66696d'}}>
          <Button onClick={handleClose} style={{backgroundColor: '#343b3f', color:'white', borderColor:'#343b3f'}}>Close</Button>
        </Modal.Footer>
      </Modal>
      </>
    )
  
}

export default MusicsModal;
