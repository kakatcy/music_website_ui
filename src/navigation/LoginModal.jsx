import React from 'react';
import {
  Modal, Button, InputGroup, FormControl, Form
} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import graphQLFetch from '../GraphQLFetch.js';
import ReCAPTCHA from "react-google-recaptcha";


class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.emailInput = React.createRef();
    this.usernameInput = React.createRef();
    this.passwordInput = React.createRef();

    this.state = {
      isregister: false,    //display login if it is false, otherwise display register
      // alert: false,
      alert:'',
      verified: false,
    }
  }

  onRCChange = async (value) => {
    if (!value) {
      this.setState({ verified: false });
      return;
    }
    const query = `query rv($token:String!){
      rcVerify(token:$token) {
        success error_codes challenge_ts hostname
      }
    }`
    const data = await graphQLFetch(query, { token: value });
    if (data) {
      if (data.rcVerify.success) {
        this.setState({ verified: true });
      }
    }
    
  }

  // change to register modal
  openRegister = () => {
    this.setState({ alert: '' });
    this.setState({ isregister: true });
  }

  closeRegister = () => {
    this.setState({ isregister: false });
  }

  //alert when username and password don't match
  openAlert = (msg) => {
    this.setState({ alert: msg });
  }

  // set all states to original states
  closeModal = () => {
    this.setState({ alert: '' });
    this.setState({ isregister: false });
    this.props.closeModal();
  }

  //click on the register button
  async handleRegisterButton(email, user, pass) {
    // console.log('handle register');

    if(!(/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,8})$/.test(email))) {
      this.openAlert('Incorrect email format');
    }
    else if(pass.length < 8){
      this.openAlert('Password must contain at least 8 characters');
    }
    else if(user.length < 2 || user.length > 8){
      this.openAlert('Username must contain within 2-8 characters');
    }
    else{
      const input = {
        username: user,
        password: pass,
        email: email,
      };
  
      const query = `mutation signup($input: SignUpInput!) {
        signup(input: $input){
          token
          user {
            username
            playlists {
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
        }
      }`;
  
      const data = await graphQLFetch(query, { input });
      //console.log(data);
      if (data) {
        localStorage.setItem('music$$$_web***_user&&&_token', data.signup.token);
        // console.log(data.signup.token);
        this.closeModal();
        this.closeRegister();
        this.props.handleLogin();
      }
      else {
        this.openAlert('Email has already used');
      }
    }


    

  }

  //click on the login button
  // matching need to be implement
  async handleLoginButton(email, password) {
    // console.log('handle login');

    const query = `mutation login($email: String!, $password: String!) {
      login(email: $email, password: $password){
        token
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
      }
    }`;

    const data = await graphQLFetch(query, { email, password });
    // console.log(data);
    //if email and password are matched
    if (data) {
      // console.log("matched");
      localStorage.setItem('music$$$_web***_user&&&_token', data.login.token);
      this.props.updateUserinfo(data.login.user);
      this.props.handleLogin();
      //this.props.closeModal();
    }
    else {
      //alert when username and password don't match
      this.openAlert('Email or password is wrong');
    }
  }

  handleClick = () => {
    //get username and password that users input
    const email = this.emailInput.current ? this.emailInput.current.value : "";
    const username = this.usernameInput.current ? this.usernameInput.current.value : "";
    const password = this.passwordInput.current ? this.passwordInput.current.value : "";

    // select register or login handler according to isregister state
    if (this.state.isregister) {
      this.handleRegisterButton(email, username, password);
    }
    else {
      this.handleLoginButton(email, password);
    }
  }

  render() {
    const { isregister, verified } = this.state;
    const pwAutocomplete = isregister? "new-password" : "current-password";
    const username =
      <div>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroup-sizing-default" style={{backgroundColor: '#343b3f', color:'white'}}>Username:</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl aria-label="Default" aria-describedby="inputGroup-sizing-default" ref={this.usernameInput} style={{backgroundColor: '#343b3f', color:'white'}}/>
        </InputGroup>
        <br />
      </div>
    
    const sitekey = process.env.REACT_APP_RECAPTCHA_KEY || "6Lf6Rb0ZAAAAAMPfkkOtluTRBdAcAPvcJT8B5bD8";

    return (
      <div>
        {/* login and register popup */}
        <Modal
          show={this.props.showModal}
          onHide={this.closeModal}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton style={{backgroundColor: '#343b3f', color:'white'}}>
            <Modal.Title>{this.state.isregister ? "Register" : "Login"}</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{backgroundColor: '#343b3f', color:'white'}}>
            <Form>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroup-sizing-default" style={{backgroundColor: '#343b3f', color:'white'}}>Email:</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl autoComplete="username" aria-label="Default" aria-describedby="inputGroup-sizing-default" ref={this.emailInput} style={{backgroundColor: '#343b3f', color:'white'}}/>
              </InputGroup>
              <br />
              {isregister ? username : null}
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroup-sizing-default" style={{backgroundColor: '#343b3f', color:'white'}}>Password:</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl autoComplete={pwAutocomplete} type="password" aria-label="Default" aria-describedby="inputGroup-sizing-default" ref={this.passwordInput} style={{backgroundColor: '#343b3f', color:'white'}}/>

              </InputGroup>
              {''}
              {isregister? 
                <ReCAPTCHA theme="dark" sitekey={sitekey} onChange={this.onRCChange}/>:
                null
              }
              {isregister ?
                <Button variant="link" onClick={this.closeRegister} style={{backgroundColor: '#343b3f', color:'white'}}>{"Already have an account?"}</Button> :
                <Button variant="link" onClick={this.openRegister} style={{backgroundColor: '#343b3f', color:'white'}}>{"Create a new account"}</Button>
              }
              {/* {this.state.alert ? <h1 className="passalert" style={{ color: 'red', fontSize: 20 }}>{"Email or Password is wrong!"}</h1> : null} */}
              {<h1 className="passalert" style={{ color: '#d41818', fontSize: '1em' }}>{this.state.alert}</h1>}
            </Form>

          </Modal.Body>

          <Modal.Footer style={{backgroundColor: '#343b3f', color:'white'}}>
            <Button variant="primary" disabled={isregister && !verified } onClick={this.handleClick} style={{backgroundColor: '#343b3f', color:'white', borderColor:'#343b3f'}}>{this.state.isregister ? "Register" : "Login"}</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default LoginModal;
