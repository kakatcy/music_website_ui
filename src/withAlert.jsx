import React from 'react';
import { Alert } from 'react-bootstrap';

function withAlert(OriginalComponent) {
  return class AlertWrapper extends React.Component {
    state = {
      variant: 'info',
      show: false,
      message: '',
    }

    componentDidUpdate() {
      if (this.state.show) {
        clearTimeout(this.dismissTimer);
        this.dismissTimer = setTimeout(this.closeAlert, 5000);
      }
    }

    componentWillUnmount() {
      clearTimeout(this.dismissTimer);
    }

    showSuccess = (message) => {
      this.setState({
        variant: 'success', show: true, message
      });
    }

    showError = (message) => {
      this.setState({
        variant: 'danger', show: true, message
      });
    }

    closeAlert = () => {
      this.setState({ show: false });
    }

    render() {
      const { variant, show, message } = this.state;

      return (
        <>
          <OriginalComponent
            showError={this.showError}
            showSuccess={this.showSuccess}
            closeAlert={this.closeAlert}
            {... this.props}
          />
          <div style={{
            position: 'fixed', top: 20, zIndex: 20, fontSize: '0.75em'
          }}>
            <Alert show={show} variant={variant} onClose={this.closeAlert} dismissible>
              <div>{message}</div>
            </Alert>
          </div>
        </>
      );
    }
  }
}

export default withAlert;