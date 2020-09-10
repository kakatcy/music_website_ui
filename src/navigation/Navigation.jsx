import React from 'react';
import Logo from './Logo.jsx';
import Avatars from './Avatars.jsx';
// import {Form, FormControl,Button} from 'react-bootstrap';
import "./Navigation.css"

class Navigation extends React.Component {

  render() {
    return (
      <div className="Nav">
        <Logo />
        {/* <Form inline style={{ float: 'left',width:'30%'}}>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" style={{width:'30%'}}/>
          <Button variant="outline-success">Search</Button>
        </Form> */}
        <Avatars 
          islogin = {this.props.islogin}
          handleLogin = {this.props.handleLogin}
          handleUnlogin = {this.props.handleUnlogin}
          updateUserinfo = {this.props.updateUserinfo}
        />
      </div>
    )
  }
}

export default Navigation;
