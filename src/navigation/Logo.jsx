import React from 'react';
import {withRouter} from 'react-router-dom';
import {
  Tooltip, OverlayTrigger
} from 'react-bootstrap';

class Logo extends React.Component {
  // go to /music when click the logo
  handleClickOnLogo = (event) => {
    this.props.history.push("/music");
  }

  render () {
    return ( 
      <div className="title" onClick={this.handleClickOnLogo}>
        <OverlayTrigger
              key={'logo'}
              placement={'bottom'}
              overlay={
                <Tooltip id={'logo'}>
                  main page
                </Tooltip>
              }
            >
          <h1 className="webname" style={{fontFamily: "'Shadows Into Light', cursive"}}>TeaTime</h1>
        </OverlayTrigger>
      </div>
      
    );
  }
}

export default withRouter(Logo);
