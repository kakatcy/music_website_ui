import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import LoginModal from './LoginModal.jsx';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal : false
    };
  }

  // open modal
  openModal = () => {
    this.setState({ showModal: true });
  }

  // close modal
  closeModal = () => {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <div>
        <div variant="primary" onClick={this.openModal} style={{fontSize:'0.5em',cursor: 'pointer',marginTop:'15px'}}>
          Login
        </div>
        <LoginModal 
          showModal = {this.state.showModal}
          closeModal = {this.closeModal}
          handleLogin = {this.props.handleLogin}
          updateUserinfo = {this.props.updateUserinfo}
        />
      </div>
    );
  }
}

export default Login;
