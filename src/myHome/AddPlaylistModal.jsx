import React from 'react';
import {
  Modal, Button, InputGroup, FormControl
} from 'react-bootstrap';
import graphQLFetch from '../GraphQLFetch.js';
import "bootstrap/dist/css/bootstrap.min.css";

class AddPlaylistModal extends React.Component {
  constructor(props) {
    super(props);
    this.playlistName = React.createRef();
    this.description = React.createRef();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      error: '',
    };
  }

  async handleSubmit(e) {
    e.preventDefault();
    //get username and password that users input
    const playlistname = this.playlistName.current ? this.playlistName.current.value : "";
    const description = this.description.current ? this.description.current.value : "";

    if (playlistname.length > 12) {
      this.setState({ error: 'Max characters of playlist name might not exceed 12' });
      return;
    }

    const playlist = {
      name: playlistname,
      description: description,
    };

    const query = `mutation playlistAdd(
      $playlist: playlistInput!
    ) {
      playlistAdd(
        playlist: $playlist
      ) {
        id name description
        musics{
          src title author thumbnail
        }
      }
    }`;

    const data = await graphQLFetch(query, { playlist }, null, null, localStorage.getItem('music$$$_web***_user&&&_token'));
    if (data) {
      //console.log(data);
      this.props.updatePlaylist(data.playlistAdd);
      console.log('add playlist successfully');
      this.setState({ error: '' });
      this.props.closeModal(null);
    }
  }

  render() {
    return (
      <div>
        <Modal
          show={this.props.showModal}
          onHide={() => {this.props.closeModal(() => {this.setState({ error: '' });})}}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton style={{ backgroundColor: '#343b3f', color: 'white', borderColor: '#66696d' }}>
            <Modal.Title>{"Playlist"}</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: '#343b3f', color: 'white', borderColor: '#66696d' }}>
            <div>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroup-sizing-default" style={{ backgroundColor: '#343b3f', color: 'white', borderColor: '#66696d' }}>Name:</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl aria-label="Default" aria-describedby="inputGroup-sizing-default" ref={this.playlistName} style={{ backgroundColor: '#343b3f', color: 'white', borderColor: '#66696d' }} />

              </InputGroup>
              <br />
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroup-sizing-default" style={{ backgroundColor: '#343b3f', color: 'white', borderColor: '#66696d' }}>Description:</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl aria-label="Default" aria-describedby="inputGroup-sizing-default" ref={this.description} style={{ backgroundColor: '#343b3f', color: 'white', borderColor: '#66696d' }} />
              </InputGroup>
            </div>
            <div style={{ color: '#d41818', fontSize: '1em' }}>{this.state.error}</div>
          </Modal.Body>

          <Modal.Footer style={{ backgroundColor: '#343b3f', color: 'white', borderColor: '#66696d' }}>
            <Button variant="primary" onClick={this.handleSubmit} style={{ backgroundColor: '#343b3f', color: 'white', borderColor: '#343b3f' }}>{"Add"}</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default AddPlaylistModal;
