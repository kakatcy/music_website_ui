import React from 'react';
import { Form, FormControl, Container, Row, Col } from 'react-bootstrap';
import './main.css';
import graphQLFetch from '../GraphQLFetch.js';
import withAlert from '../withAlert.jsx';

class main extends React.Component {
  constructor() {
    super();
    this.urlInput = React.createRef();
  }

  handleClick = () => {
    // url test regx
    // eslint-disable-next-line no-useless-escape
    const urlTest = new RegExp(/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/);

    const input = this.urlInput.current.value;

    // if empty input
    if (!input) {
      this.props.showError('Input Something to search');
      return;
    }

    if (urlTest.test(input)) {
      const query = `query music($url:String!){
        music(url:$url)
        { src title author thumbnail}
      }`;
      graphQLFetch(query, { url:input }, this.props.showError).then(res => {
        if (res.music.src) {
          let path = {
            pathname: '/musicInfo',
            state: res.music,
          }
          this.props.history.push(path);
        } else {
          this.props.showError('Invalid search link!')
        }
      }).catch(() => {});
    } else {
      const query = `query searchMusic($keyword:String!){
        searchMusic(keyword:$keyword)
        { src title author thumbnail}
      }`;
      graphQLFetch(query, { keyword:input }, this.props.showError).then(res => {
        if (res.searchMusic) {
          let path = {
            pathname: '/musicSearch',
            state: res.searchMusic,
          }
          this.props.history.push(path);
        } else {
          this.props.showError('Oops, Nothing Found for this keyword')
        }
      }).catch(() => {});
    }
    
  }

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.handleClick();
    }
  }

  render() {
    return (
      <Container fluid="sm" className="search">
        <Row style={{ justifyContent:'center' }}>
          <h1 style={{ fontFamily: "'Dancing Script', cursive" }}>Just&nbsp;&nbsp;&nbsp;Listen.</h1>
        </Row>
        <Row>
          <Col xs={12}>
            <Form inline style={{display:'flex',justifyContent:'center'}}>
              <FormControl type="text" placeholder="Input Youtube URL or Keywords" ref={this.urlInput} onKeyDown={this.handleKeyDown} />
              <div className='search-btn' onClick={this.handleClick} style={{borderStyle:'solid', borderWidth:'1px', padding:'5px 8px',borderColor:'#66696d', borderRadius:'8px'}}>Search</div>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default withAlert(main);
