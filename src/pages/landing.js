/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Container from '../components/Container';
import { getRandomScreenshot, incrementShot, decrementShot } from '../actions';
import { Loading } from '../components/anonymize';
import { ScreenshotDisplay, ResponseBox } from '../components/display';
import withImages from '../utils/withImages';
import withResponses from '../utils/withResponses';

class LandingPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getRandomScreenshot();
  }

  increment = () => {
    this.props.clearImages();
    this.props.startLoading();
    if (this.props.currentShowIndex >= this.props.shownScreenshots.length - 1) {
      this.props.getRandomScreenshot();
    } else {
      this.props.incrementShot();
    }
  }

  decrement = () => {
    this.props.clearImages();
    this.props.startLoading();
    this.props.decrementShot();
  }

  render() {
    return (
      <Container landing>
        {this.props.loading
          ? <Loading />
          : (
            <ScreenshotDisplay
              images={this.props.images}
              landing
              increment={this.increment}
              decrement={this.decrement}
              decrementDisabled={this.props.shownScreenshots.length <= 1 || this.props.currentShowIndex === 0}
            />
          )}
        <ResponseBox responses={this.props.responses} loading={this.props.responsesLoading} addResponse={this.props.addResponse} />
      </Container>
    );
  }
}

const mapStateToProps = (reduxState) => {
  return {
    shownScreenshots: reduxState.response.shownScreenshots,
    currentShowIndex: reduxState.response.currentShowIndex,
  };
};

export default withResponses(withImages(connect(mapStateToProps, { getRandomScreenshot, incrementShot, decrementShot })(LandingPage)));
