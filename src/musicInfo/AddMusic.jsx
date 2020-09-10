import React from 'react';
import { Dropdown } from 'react-bootstrap';
import graphQLFetch from '../GraphQLFetch.js';

class AddMusic extends React.Component{

  async onPlaylistSelect(playlistid) {
    console.log("handle on playlist select");

    const music = {
      src: this.props.musicinfo.src,
      title: this.props.musicinfo.title,
      author: this.props.musicinfo.author,
      thumbnail: this.props.musicinfo.thumbnail
    }

    const query = `mutation musicAdd(
      $playlistid: Int!, $music: musicInput!
    ) {
      musicAdd(
        playlistid: $playlistid, music: $music
      ) {
        id name description
        musics{
          src title author thumbnail
        }
      }
    }`;

    const data = await graphQLFetch(query, { playlistid, music } ,null, null, localStorage.getItem('music$$$_web***_user&&&_token'));
    if (data) {
      //console.log(data);
      this.props.updatePlaylist(data.musicAdd);
      console.log('add music successfully');
    }
  }

  render() {
    const dropItem = 
      <div>
        {this.props.userinfo.playlists && this.props.userinfo.playlists.map((e, key) => {
          return (
            <Dropdown.Item key={key} onClick={() => { this.onPlaylistSelect(e.id) }}>
              {e.name}
            </Dropdown.Item>
          );
        })}
      </div>

    return (
      <Dropdown drop="up">
        <Dropdown.Toggle className="ddAddtoPlaylist">AddToPlaylist</Dropdown.Toggle>
        <Dropdown.Menu className="ddplaylist">
          {dropItem}
        </Dropdown.Menu>
      </Dropdown>
    )
  }
}

export default AddMusic;
