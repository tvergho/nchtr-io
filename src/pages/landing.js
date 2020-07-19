/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Container from '../components/Container';
import { getRandomScreenshot } from '../actions';
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

  render() {
    return (
      <Container landing>
        {this.props.loading ? <Loading /> : <ScreenshotDisplay images={this.props.images} />}
        <ResponseBox responses={this.props.responses} loading={this.props.responsesLoading} />
      </Container>
    );
  }
}

export default withResponses(withImages(connect(null, { getRandomScreenshot })(LandingPage)));
