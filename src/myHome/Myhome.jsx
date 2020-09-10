import React from 'react';
import UserBasicInfo from './UserBasicInfo.jsx';
import UserPlaylist from './UserPlaylist.jsx';
import AddPlaylist from './AddPlaylist';
import BasicInfoEdit from './BasicInfoEdit';
import { Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import './myhome.css';


function Myhome(props){
  const history = useHistory();
  if (!props.userinfo) {
    history.push('/music');
    return null;
  }

    return (
      <Container className="myhome">
        <BasicInfoEdit userinfo={props.userinfo} updateUserinfo={props.updateUserinfo}/>
        <UserBasicInfo userinfo={props.userinfo} />
        <AddPlaylist userinfo={props.userinfo} updatePlaylist={props.updatePlaylist} />
        <UserPlaylist userinfo={props.userinfo} updatePlaylist={props.updatePlaylist} addToPlaylist={props.addToPlaylist} setCurrentPlaylist={props.setCurrentPlaylist}/>
      </Container>
    )
  }

export default Myhome;
