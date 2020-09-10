import React from 'react';
import defaultAvatar from './defaultPic/defaultAvatar.jpeg';
import Avatar1 from './defaultPic/avatar1.jpeg';
import Avatar2 from './defaultPic/avatar2.jpeg';
import './UserBasicInfo.css';

class UserBasicInfo extends React.Component {

  render () {
    const avatars = <img
      src={this.props.userinfo.avatars? this.props.userinfo.avatars === '2' ? Avatar1 : this.props.userinfo.avatars === '3' ? Avatar2 : defaultAvatar  : defaultAvatar}
      className="round_icon"  alt="icon"
    />

    return (
      <div className="userinfo">
        {avatars}
        <div className="basicinfo" style={{width:'90%'}}>
          <h1 className="username">User: {this.props.userinfo.username}</h1>
          <h1 className="details">Email: {this.props.userinfo.email? this.props.userinfo.email : "Unknown"}</h1>
          <h1 className="details">Description: {this.props.userinfo.description? (this.props.userinfo.description.length > 100 ? this.props.userinfo.description.slice(0,97) +'...' : this.props.userinfo.description)  : "Unknown"}</h1>
        </div>
        
      </div>
    );
  }
}

export default UserBasicInfo;