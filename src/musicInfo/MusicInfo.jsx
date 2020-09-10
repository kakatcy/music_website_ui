import React from 'react';
import { useLocation, useHistory } from 'react-router'
import AddMusic from './AddMusic.jsx';
import { Button,Container } from 'react-bootstrap';
import './MusicInfo.css';

function MusicInfo(props) {
  const location = useLocation();
  const history = useHistory();

  const info = location.state;


  return (
    <Container style={{marginBottom:'100px',marginTop:'50px'}}>
      <img className="musicImg" src={info.thumbnail} alt="" />
      <p>{info.title}</p>
      <p>{info.author}</p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Button className="musicInfoBtn" onClick={() => history.push('/music')} >New search</Button>
        <Button className="musicInfoBtn" onClick={() => {props.addToCurrentAndPlay(info)}} >Play Now</Button>
        <AddMusic userinfo = {props.userinfo} musicinfo = {info} updatePlaylist={props.updatePlaylist}/>
      </div>
    </Container>
  );
}

export default MusicInfo;