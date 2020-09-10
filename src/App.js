import React from 'react';
//import logo from './logo.svg';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';

import Navigation from './navigation/Navigation.jsx';
import Player from './audioPlayer/Player.jsx';
import MusicInfo from './musicInfo/MusicInfo.jsx';

import main from './mainPage/main.jsx';
import Myhome from './myHome/Myhome.jsx';
import graphQLFetch from './GraphQLFetch';
import MusicSearch from './musicSearch/MusicSearch';

import {
  Tooltip, OverlayTrigger
} from 'react-bootstrap';


const tempPlaylist = {
  name: 'Temp Playlist',
  description: '',
  musics: [
    {
      src: 'https://stayhome-api.herokuapp.com/stream?id=HdQCWXh3XXU',
      title: 'STYX HELIX ',
      author: 'Re：ゼロから始める異世界生活 ED1',
      thumbnail: '',
    },
    {
      src: 'https://stayhome-api.herokuapp.com/stream?id=E8S2IHiuWZA',
      title: 'Kizuna Music キズナミュージック♪ [Piano+Sheet]',
      author: 'Poppin Party',
      thumbnail: '',
    },
    {
      src: 'https://stayhome-api.herokuapp.com/stream?id=9q7JOQfcJQM',
      title: '以父之名 In The Name of The Father',
      author: 'Jay Chou',
      thumbnail: '',
    },
    {
      src: 'https://stayhome-api.herokuapp.com/stream?id=qIZ5MAwbeCg',
      title: 'Wounds of War',
      author: 'Jay Chou',
      thumbnail: '',
    },
    {
      src: 'https://stayhome-api.herokuapp.com/stream?id=AdkkF6MT0R0',
      title: 'Chapter Seven',
      author: 'Jay Chou',
      thumbnail: '',
    }
  ],
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      islogin: false,
      playlist: tempPlaylist,
      userinfo: '',
      hidePlayer: false,
    };
  }


  // persistent login status
  componentDidMount() {
    const token = localStorage.getItem('music$$$_web***_user&&&_token');
    if (token) {
      const query = `query tokenlogin {
        user {
          username
          playlists {
            id
            name
            description
            musics {
              src
              title
              author
              thumbnail
            }
          }
          email
          avatars
          description
        }
      }`;
      graphQLFetch(query, null, null, null, token).then(res => {
        if (res.user) {
          this.setState({ islogin: true, userinfo: res.user });
        }
      });
    }
  }

  handleLogin = () => {
    this.setState({ islogin: true });
  }

  handleUnlogin = () => {
    this.setState({ islogin: false, userinfo: '' });
    localStorage.removeItem('music$$$_web***_user&&&_token');
  }

  shufflePlaylist = (callback) => {
    const copyList = [...this.state.playlist.musics];
    for (let i = copyList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copyList[i], copyList[j]] = [copyList[j], copyList[i]];
    }

    // we need reset the current index after shuffle, pass the call back in here
    this.setState({ playlist: { ...this.state.playlist, musics: copyList } });
  }

  // handler for add song to current playlist
  addToPlaylist = (musicInfo) => {
    const copyList = [...this.state.playlist.musics];
    copyList.push(musicInfo);
    this.setState({ playlist: { ...this.state.playlist, musics: copyList } });
  }

  // add one song to current playlist and play it
  // change the playlist name will trigger player reset and play from 0
  addToCurrentAndPlay = (musicInfo) => {
    const copyList = [...this.state.playlist.musics];
    copyList.unshift(musicInfo);
    this.setState({ playlist: { ...this.state.playlist, name: new Date().toISOString(), musics: copyList } });
  }

  // remove a song from current playlist
  removeFromPlaylist = (index) => {
    const copyList = [...this.state.playlist.musics];
    copyList.splice(index, 1);
    this.setState({ playlist: { ...this.state.playlist, musics: copyList } });
  }

  // change current playlist
  setCurrentPlaylist = (playlist) => {
    this.setState({ playlist });
  }

  updateUserinfo = (user) => {
    this.setState({ userinfo: user });
  }

  // update users' playlist(userinfo state update)
  updatePlaylist = (playlists) => {
    //const newUserinfo = [...this.state.userinfo, {playlists: playlists}];
    const newUserinfo = Object.assign({}, this.state.userinfo, { playlists: playlists })
    this.setState({ userinfo: newUserinfo });
  }

  togglePlayer = () => {
    this.setState({ hidePlayer: !this.state.hidePlayer });
  }



  render() {
    const playerControl = this.state.hidePlayer ?
      (<div onClick={this.togglePlayer}>
        <OverlayTrigger
          key={'show'}
          placement={'top'}
          overlay={
            <Tooltip id={'show'}>
              show player
            </Tooltip>
          }
        >
          <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-chevron-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" />
          </svg>
        </OverlayTrigger>
      </div>) :
      (
        <div onClick={this.togglePlayer}>
          <OverlayTrigger
            key={'hide'}
            placement={'bottom'}
            overlay={
              <Tooltip id={'hide'}>
                hide player
              </Tooltip>
            }
          >
            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-chevron-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
            </svg>
          </OverlayTrigger>
        </div>
      );
    return (
      <div className="App">
        <header className="App-header">
          <Navigation
            islogin={this.state.islogin}
            handleLogin={this.handleLogin}
            handleUnlogin={this.handleUnlogin}
            updateUserinfo={this.updateUserinfo}
          />

          <Switch>
            <Route path="/music" component={main} />
            <Route path="/myhome" render={() => <Myhome updateUserinfo={this.updateUserinfo} userinfo={this.state.userinfo} updatePlaylist={this.updatePlaylist} addToPlaylist={this.addToPlaylist} setCurrentPlaylist={this.setCurrentPlaylist} />} />
            <Route path="/musicInfo" render={() => <MusicInfo userinfo={this.state.userinfo} addToCurrentAndPlay={this.addToCurrentAndPlay} updatePlaylist={this.updatePlaylist} />} />
            <Route path="/musicSearch" component={MusicSearch} />
            <Redirect from="/" to="/music" exact component={main} />
          </Switch>

          <Player
            playlist={this.state.playlist}
            shufflePlaylist={this.shufflePlaylist}
            removeFromPlaylist={this.removeFromPlaylist}
            hide={this.state.hidePlayer}
          />
          {playerControl}
        </header>
      </div>
    );
  }
}

export default App;
