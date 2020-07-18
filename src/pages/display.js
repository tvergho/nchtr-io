/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import Container from '../components/Container';
import withImages from '../utils/withImages';
import { Loading } from '../components/anonymize';
import { ScreenshotDisplay } from '../components/display';

class DisplayPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container landing>
        {this.props.loading ? <Loading /> : <ScreenshotDisplay images={this.props.images} />}
      </Container>
    );
  }
}

export default withImages(DisplayPage);
