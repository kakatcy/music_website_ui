import React from 'react';
import defaultAlbumPic from './defaultPic/defaultAlbumPic.jpeg';
import graphQLFetch from '../GraphQLFetch.js';
import './UserPlaylist.css';
import "bootstrap/dist/css/bootstrap.min.css";
import MusicsModal from './MusicsModal.jsx';
import {
  Tooltip, OverlayTrigger
} from 'react-bootstrap';

class UserPlaylist extends React.Component {

   handlePlaylistDelete = async (playlistid) => {
    // console.log("handle delete " + playlistid);

    const query = `mutation playlistDelete(
      $playlistid: Int!) {
        playlistDelete(playlistid: $playlistid) {
          id name description
          musics{
            src title author thumbnail
          }
        }
      }`;

    const data = await graphQLFetch(query, { playlistid } ,null, null, localStorage.getItem('music$$$_web***_user&&&_token'));
    if (data) {
    //  console.log(data);
      this.props.updatePlaylist(data.playlistDelete);
    //  console.log('delete playlist successfully');
    }

  }

  handleMusicDelete = async (playlistid, title) => {
    // console.log("deleted music id and title " + playlistid +" " + title);

    const query = `mutation musicDelete(
      $playlistid: Int!, $title: String!) {
        musicDelete(playlistid: $playlistid, title: $title) {
          id name description
          musics{
            src title author thumbnail
          }
        }
      }`;

    const data = await graphQLFetch(query, { playlistid, title } ,null, null, localStorage.getItem('music$$$_web***_user&&&_token'));
    if (data) {
      //console.log(data);
      this.props.updatePlaylist(data.musicDelete);
      // console.log('delete music successfully');
    }
    else{
      console.log('data is null');
    }
  }

  render () {

    return (
      <div className="playlists">
        <h1 className="title">Playlists:</h1>
        <div>
          {this.props.userinfo.playlists && this.props.userinfo.playlists.map((playlist , index)=>{
            return (
              <div key={index} className="playlist" >
                <img src={playlist.musics[0] ? playlist.musics[0].thumbnail : defaultAlbumPic} className="playlistPic"  alt="icon" />
                <div className="playlistName">{playlist.name}</div>

                <MusicsModal musicsinfo={playlist.musics} playlistid = {playlist.id} addToPlaylist={this.props.addToPlaylist} handleMusicDelete={this.handleMusicDelete}/>
                
                <div style={{width:'5%', height:'5%', fontSize:'0.8em', cursor:'pointer'}} onClick={() =>this.handlePlaylistDelete(playlist.id)}>
                  <OverlayTrigger
                    key={'deleteplaylist'}
                    placement={'bottom'}
                    overlay={
                      <Tooltip id={'deleteplaylist'}>
                        delete playlist
                      </Tooltip>
                    }
                  >
                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                      <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                  </OverlayTrigger>
                </div>

                {/* <button style={{width:'100px', height:'50px', fontSize:'0.8em'}} onClick={() => {this.props.setCurrentPlaylist(playlist)}}>PlayNow</button> */}
                <div style={{width:'5%', height:'5%', fontSize:'0.8em', cursor:'pointer'}} onClick={() => {this.props.setCurrentPlaylist(playlist)}}>
                  <OverlayTrigger
                    key={'playnow'}
                    placement={'bottom'}
                    overlay={
                      <Tooltip id={'playnow'}>
                        play
                      </Tooltip>
                    }
                  >
                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-play-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                    </svg>
                  </OverlayTrigger>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}

export default UserPlaylist;
