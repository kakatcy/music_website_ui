import React from 'react';
import Login from './Login';
import {
  Dropdown, DropdownButton
} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import './Navigation.css';

class Avatars extends React.Component {

  handleLogout = () => {
    this.props.handleUnlogin();
    this.props.history.push("/music");
  }

  handClickMyhome = () => {
    this.props.history.push("/myhome");
  }

  render() {
    // display a dropdown when loggedin
    const loggedin = 
      <div className="loggedin" >
        <DropdownButton
          className="ddbutton"
          variant="Secondary"
          title={
            <svg className="bi bi-emoji-sunglasses" viewBox="0 0 16 16" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm7 1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm2 9a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"/>
            </svg>
          }
        >
          <Dropdown.Item onClick={this.handClickMyhome} style={{backgroundColor: '#343b3f', color:'white'}}>myHome</Dropdown.Item>
          <Dropdown.Item onClick={this.handleLogout} style={{backgroundColor: '#343b3f', color:'white'}}>Logout</Dropdown.Item>
        </DropdownButton>
        
      </div>

    //display a Login Button without login
    const unlogin = <div><Login handleLogin={this.props.handleLogin} updateUserinfo = {this.props.updateUserinfo} /></div>

    return (
      <div>
        {/* display login or unlogin according to the islogin state */}
        <h1 className="avatars">{this.props.islogin ? loggedin : unlogin}</h1>
      </div> 
    )
  }
}

export default withRouter(Avatars);
