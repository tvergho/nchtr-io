/* eslint-disable react/no-did-update-set-state */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Container from '../components/Container';
import withImages from '../utils/withImages';
import withResponses from '../utils/withResponses';
import { Loading } from '../components/anonymize';
import { ScreenshotDisplay, Modal, ResponseBox } from '../components/display';
import { clearCode } from '../actions';

class DisplayPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalShown: false,
    };
  }

  componentDidMount() {
    if (this.props.code && this.props.code.length > 0) {
      this.setState({ modalShown: true });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.code !== prevProps.code && this.props.code.length > 0) {
      this.setState({ modalShown: true });
    }
  }

  componentWillUnmount() {
    this.props.clearCode();
  }

  render() {
    return (
      <>
        <Container landing>
          {this.props.loading ? <Loading /> : <ScreenshotDisplay images={this.props.images} />}
          <ResponseBox responses={this.props.responses} loading={this.props.responsesLoading} />
        </Container>
        <Modal code={this.props.code} display={this.state.modalShown} close={() => { this.setState({ modalShown: false }); }} />
      </>
    );
  }
}

const mapStateToProps = (reduxState) => {
  return {
    code: reduxState.response.code,
  };
};

export default withResponses(withImages(connect(mapStateToProps, { clearCode })(DisplayPage)));
