import React from 'react';
import {Modal, Button, Form, InputGroup, FormControl,Image,Tooltip, OverlayTrigger} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import defaultAvatar from './defaultPic/defaultAvatar.jpeg';
import Avatar1 from './defaultPic/avatar1.jpeg';
import Avatar2 from './defaultPic/avatar2.jpeg';
import graphQLFetch from '../GraphQLFetch.js';
import "./BasicInfoEdit.css";

class BasicInfoEdit extends React.Component {
  constructor(props) {
    super(props);
    this.descriptionInput = React.createRef();
    this.checkboxInput = React.createRef();

    this.state = {
      show: false,
      radioValue:''
    }
  }

  handleClose = () => {this.setState({ show: false })}
  handleShow = () => {this.setState({ show: true })}


  handleRadioChange = (e) => {
    this.setState({
      radioValue: e.target.id
    })
  }

  handleSave = async (e) => {
    // console.log('handle save');
    const description = this.descriptionInput.current ? this.descriptionInput.current.value : "";

    const avatars = this.state.radioValue;

    const query = `mutation userEdit(
      $description: String, $avatars: String
    ) {
      userEdit(
        description: $description, avatars: $avatars
      ) {
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

    const data = await graphQLFetch(query, { description, avatars } ,null, null, localStorage.getItem('music$$$_web***_user&&&_token'));
    if (data) {
      this.props.updateUserinfo(data.userEdit);
      // console.log('edit user info successfully');
    }
    this.handleClose();
  }

  render(){
    return (
      <>
      <div variant="primary" onClick={this.handleShow} style={{float:'right', marginRight:'15%', fontSize:'1em',cursor:'pointer'}}>
        <OverlayTrigger
          key={'edit'}
          placement={'bottom'}
          overlay={
            <Tooltip id={'edit'}>
              edit
            </Tooltip>
          }
        >
          <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
          </svg>
        </OverlayTrigger>
      </div>
      <Modal
        show={this.state.show}
        onHide={this.handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
      >
        <Modal.Header closeButton style={{backgroundColor: '#343b3f', color:'white'}}>
          <Modal.Title>{"Musics"}</Modal.Title>
        </Modal.Header>
        
        <Modal.Body style={{backgroundColor: '#343b3f', color:'white'}}>
          <Form>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-default" style={{backgroundColor: '#343b3f', color:'white'}}>Description:</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl as="textarea" defaultValue={this.props.userinfo.description} aria-label="With textarea" ref={this.descriptionInput} style={{backgroundColor: '#343b3f', color:'white'}}/>
              {/* <FormControl aria-label="Default" aria-describedby="inputGroup-sizing-default" ref={descriptionInput} /> */}
            </InputGroup>
            <br />

            <div style={{display:'flex'}}>
              <div key={`custom-inline-radio1`} className="mb-3">
                <Image src={defaultAvatar} rounded className="images" />
                <Form.Check
                  custom
                  inline
                  label="1"
                  type={'radio'}
                  name="avatars"
                  id={`1`}
                  ref={this.checkboxInput}
                  onChange={(e) => this.handleRadioChange(e)}
                />
              </div>

              <div key={`custom-inline-radio2`} className="mb-3">
                <Image src={Avatar1} rounded className="images"/>
                <Form.Check
                  custom
                  inline
                  label="2"
                  type="radio"
                  name="avatars"
                  id={`2`}
                  ref={this.checkboxInput}
                  onChange={(e) => this.handleRadioChange(e)}
                />
              </div>

              <div key={`custom-inline-radio3`} className="mb-3">
                <Image src={Avatar2} rounded className="images" />
                <Form.Check
                  custom
                  inline
                  label="3"
                  type={'radio'}
                  name="avatars"
                  id={`3`}
                  ref={this.checkboxInput}
                  onChange={(e) => this.handleRadioChange(e)}
                />
              </div>
            </div>
    
          </Form>
        </Modal.Body>

        <Modal.Footer style={{backgroundColor: '#343b3f', color:'white'}}>
          <Button onClick={this.handleClose} style={{backgroundColor: '#343b3f', color:'white',borderColor:'#343b3f'}}>Close</Button>
          <Button onClick={this.handleSave} style={{backgroundColor: '#343b3f', color:'white',borderColor:'#343b3f'}}>Save</Button>
        </Modal.Footer>
      </Modal>
      </>
    )
  }
}

export default BasicInfoEdit;
