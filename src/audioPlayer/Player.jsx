import React from 'react';
import PlayButton from './PlayButton.jsx';
import TimeDisplay from './TimeDisplay.jsx';
import ProgressBar from './ProgressBar.jsx';
import VolumeBar from './VolumeBar.jsx';
import NextButton from './NextButton.jsx';
import PrevButton from './PrevButton.jsx';
import Info from './Info.jsx';
import ModeChange from './ModeChange.jsx';

import './Player.css';
import Playlist from './Playlist.jsx';
import { Container, Row, Col } from 'react-bootstrap';

class Player extends React.Component {
  // to use the ref point to audio element, put it into constructor
  constructor() {
    super();
    this.state = {
      nowPlaying: {
        src: '',
        title: '',
        author: '',
        thumbnail: '',
      },
      isPlay: false,
      totalTime: 0,
      currentTime: 0,
      buffered: 0,
      volume: 1,
      // current position at playlist
      currentIndex: 0,
      // playback mode: 0 none/1 list-repeat/2 shuffle
      mode: 0,
      // is the mouse drag the playhead to seek(change currentTime)?
      seeking: false,
    };
    // audio element reference
    this.audio = React.createRef();
  }


  componentDidUpdate(prevProps) {

    // handle the update due to playlist change
    if (prevProps.playlist.name !== this.props.playlist.name ) {
      // reset the currentIndex if there is musics
      if (this.props.playlist.musics.length > 0) {
        this.setState({ currentIndex: 0, nowPlaying: this.props.playlist.musics[0] }, this.reloadAudio);
      } else {
        this.setState({ currentIndex: 0});
      }
    }
  }

  componentDidMount() {

    if (this.props.playlist.musics.length > 0) {
      this.setState({ nowPlaying: this.props.playlist.musics[0] });
    }

    // audio reference
    const audio = this.audio.current;

    // error handling
    audio.addEventListener('error', () => {
      // !debug, log audio erro event
      console.log(`${new Date()}: audio error occurred during the loading`);
      console.log(audio.error);
      this.setState({ isPlay: false });
      // try to reload the element
      audio.load();
    });

    // add listener to event canplay, get total play time
    audio.addEventListener('canplay', () => {
      const totalTime = parseInt(audio.duration);
      this.setState({
        totalTime: totalTime
      });
    });

    // add listener when playing (timeupdate event)
    audio.addEventListener('timeupdate', () => {
      // only update when not seeking
      if (!this.state.seeking) {
        const currentTime = parseInt(audio.currentTime);
        this.setState({ currentTime: currentTime });
      }
    });

    // add listener to display buffer when downloading start
    audio.addEventListener('progress', () => {
      if (audio.duration > 0) {
        for (let i = 0; i < audio.buffered.length; i++) {
          if (audio.buffered.start(audio.buffered.length - 1 - i) < audio.currentTime) {
            this.setState({ buffered: audio.buffered.end(audio.buffered.length - 1 - i) });
            break;
          }
        }
      }
    });

    // add listener to play/pause to handle unexpected play/pause
    audio.addEventListener('play', () => {
      if (!this.state.isPlay) {
        this.setState({ isPlay: true });
      }
    });

    audio.addEventListener('pause', () => {
      if (this.state.isPlay) {
        this.setState({ isPlay: false });
      }
    });

    // add listener to end event, decided on the play mode
    audio.addEventListener('ended', () => {
      // playback mode: 0 none/1 shuffle/2 list-repeat
      if (this.state.mode === 1 || this.state.mode === 2) {
        this.onNextClick();
      }
    });

    // initialize volume
    this.setState({ volume: 1 });
    if (this.state.volume) {
      audio.volume = this.state.volume;
    }
  }

  // helper function, handle play promise error
  playErrorHandler = () => {
    console.log('Play() interrupted by reload/pause command');
  }

  // helper function, reload the audio and play
  reloadAudio = () => {
    const audio = this.audio.current;
    // if video is playing
    if (!audio.paused) {
      audio.pause();
    }
    // then reload video
    audio.load();
    // make sure auido is playing after reload
    if (audio.paused) {
      audio.play().catch(this.playErrorHandler);
      this.setState({ isPlay: true });
    }
  }

  // pass down to update the time when click progress bar
  onTimeUpdate = (newCurrentTime) => {
    if (newCurrentTime) {
      this.audio.current.currentTime = newCurrentTime;
      this.setState({ currentTime: this.audio.current.currentTime });
    }
  }

  // pass down to update the volume when change volume
  onVolumeUpdate = (volume) => {
    if (volume) {
      this.audio.current.volume = volume;
      this.setState({ volume: this.audio.current.volume });
    }
  }

  onPlayClick = () => {
    const audio = this.audio.current;
    if (this.state.isPlay) {
      this.setState({ isPlay: false });
      audio.pause();
    } else {
      this.setState({ isPlay: true });
      audio.play().catch(this.playErrorHandler);
    }
  }

  /**
   * select/prev/next function. The play() might be interrupted if click to quick
   * process flow: update currentIndex -> update nowPlaying -> reloadAudio
   */
  onNextClick = () => {

    const reloadAudio = () => {
      const audio = this.audio.current;
      // if video is playing
      if (!audio.paused) {
        audio.pause();
      }
      // then reload video
      audio.load();
      // make sure auido is playing after reload
      if (audio.paused) {
        audio.play().catch(this.playErrorHandler);
        this.setState({ isPlay: true });
      }
    }

    const playlistLen = this.props.playlist.musics.length;
    const updateAudio = () => {
      this.setState({ nowPlaying: this.props.playlist.musics[this.state.currentIndex] }, reloadAudio);
    }

    // if this is the last song in the playlist
    if (this.state.currentIndex + 1 > playlistLen - 1) {
      this.setState({ currentIndex: 0 }, updateAudio);
    } else {
      this.setState({ currentIndex: this.state.currentIndex + 1, }, updateAudio);
    }


  }

  onPrevClick = () => {

    const reloadAudio = () => {
      const audio = this.audio.current;
      // if video is playing
      if (!audio.paused) {
        audio.pause();
      }
      // then reload video
      audio.load();
      // make sure auido is playing after reload
      if (audio.paused) {
        audio.play().catch(this.playErrorHandler);
        this.setState({ isPlay: true });
      }
    }

    const updateAudio = () => {
      this.setState({ nowPlaying: this.props.playlist.musics[this.state.currentIndex] }, reloadAudio);
    }
    const playlistLen = this.props.playlist.musics.length;
    // if this is the first song in the playlist, roll back to last one
    if (this.state.currentIndex - 1 < 0) {
      this.setState({ currentIndex: playlistLen - 1 }, updateAudio);
    } else {
      this.setState({ currentIndex: this.state.currentIndex - 1 }, updateAudio);
    }


  }

  // handler for select a song in playlist 
  onMuiscSelect = (index) => {

    const reloadAudio = () => {
      const audio = this.audio.current;
      // if video is playing
      if (!audio.paused) {
        audio.pause();
      }
      // then reload video
      audio.load();
      // make sure auido is playing after reload
      if (audio.paused) {
        audio.play().catch(this.playErrorHandler);
        this.setState({ isPlay: true });
      }
    }

    const updateAudio = () => {
      this.setState({ nowPlaying: this.props.playlist.musics[index] }, reloadAudio);
    }

    // update currentIndex then update nowplaying
    this.setState({ currentIndex: index }, updateAudio);

  }

  // modify removeFromPlaylist(), if remove current playing song, current index -1

  removeFromPlaylist = (index) => {
    if (index === this.state.currentIndex) {
      this.setState({ currentIndex: this.state.currentIndex - 1 });
    }

    this.props.removeFromPlaylist(index);
  }

  // handler for change play mode:
  onModeChange = () => {
    const currMode = this.state.mode;
    // playback mode: 0 none/1 list-repeat/2 shuffle
    if (currMode === 2) {
      this.setState({ mode: 0 });
    } else if (currMode + 1 === 2) {
      this.setState({ mode: currMode + 1 });

      // as the playlist is shuffle, we need change the current index
      const findIndex = () => {
        const nowplaying = this.state.nowPlaying;
        this.props.playlist.musics.forEach((element, index) => {
          if (element.src === nowplaying.src) {
            this.setState({ currentIndex: index });
          }
        });
      }

      // pass in as call back
      this.props.shufflePlaylist(findIndex);
    }
    else {
      this.setState({ mode: currMode + 1 });
    }
  }

  // playhead mouse down event
  onPlayheadClick = e => {
    e.stopPropagation();
    this.setState({ seeking: true });
  }

  onPlayheadMove = (e, element) => {
    e.stopPropagation();
    if (this.state.seeking) {
      let offset = e.pageX - element.getBoundingClientRect().left;
      if (offset < 0) {
        offset = 0;
      }
      if (offset > element.offsetWidth) {
        offset = element.offsetWidth
      }

      // calculate relative position(% of the processbar)
      const offsetPercentage = offset / element.offsetWidth;
      const currentTime = offsetPercentage * this.state.totalTime;
      this.setState({ currentTime: currentTime });
    }
  }

  onPlayheadRelease = (e, element) => {
    e.stopPropagation();
    if (this.state.seeking) {
      // when mouse up, the seeking finished
      this.setState({ seeking: false });
      let offset = e.pageX - element.getBoundingClientRect().left;
      if (offset < 0) {
        offset = 0;
      }
      if (offset > element.offsetWidth) {
        offset = element.offsetWidth
      }

      // calculate relative position(% of the processbar)
      const offsetPercentage = offset / element.offsetWidth;
      const currentTime = offsetPercentage * this.state.totalTime;
      this.onTimeUpdate(currentTime);
    }
  }


  render() {
    const { nowPlaying: { src }, currentTime, totalTime, buffered, volume } = this.state;
    const prevNextEnable = this.props.playlist.musics.length === 0 ? false : true;

    return (
      <div className="player" style={this.props.hide ? { display: 'none' } : {}}>
        <audio ref={this.audio}>
          <source src={src} />
        </audio>

        <Container fluid>
          <Row>
            <Col sm={12} md={4}><Info nowPlaying={this.state.nowPlaying} /></Col>
            <Col xs={12} md={4}>
              <Container>
                <Row>
                  <Col style={{ paddingTop: "10px" }}>
                    <div className="controlButton">
                      <PrevButton enable={prevNextEnable} onPrevClick={this.onPrevClick} />
                      <PlayButton onPlayClick={this.onPlayClick} isPlay={this.state.isPlay} />
                      <NextButton enable={prevNextEnable} onNextClick={this.onNextClick} />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col><TimeDisplay currentTime={currentTime} totalTime={totalTime} /></Col>
                </Row>
                <Row>
                  <Col style={{ padding: 0, paddingBottom: "25px" }}>
                    <ProgressBar
                      currentTime={currentTime}
                      totalTime={totalTime}
                      buffered={buffered}
                      onTimeUpdate={this.onTimeUpdate}
                      onPlayheadClick={this.onPlayheadClick}
                      onPlayheadMove={this.onPlayheadMove}
                      onPlayheadRelease={this.onPlayheadRelease}
                    />
                  </Col>
                </Row>
              </Container>
            </Col>
            <Col sm={12} md={3}>
              <Container>
                <Row style={{ padding: "10px" }}>
                  <Col><ModeChange mode={this.state.mode} onModeChange={this.onModeChange} /></Col>
                  <Col><Playlist
                    playlist={this.props.playlist}
                    onMuiscSelect={this.onMuiscSelect}
                    removeFromPlaylist={this.removeFromPlaylist}
                  /></Col>
                  <Col><VolumeBar volume={volume} onVolumeUpdate={this.onVolumeUpdate} /></Col>
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Player;