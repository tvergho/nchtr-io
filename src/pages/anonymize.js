/* eslint-disable new-cap */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Container from '../components/Container';
import { DrawField, Loading } from '../components/anonymize';
import { ProgressBar } from '../components/upload';
import { updateImages, clearLoading, setCurrentCode } from '../actions';
import withImages from '../utils/withImages';

class AnonymizePage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    this.props.clearLoading();
  }

  submit = (urls) => {
    this.props.setCurrentCode();
    this.props.startLoading();
    this.props.updateImages(urls);
  }

  render() {
    return (
      <>
        <Container style={{ alignItems: 'center', justifyContent: 'center', width: '60vw' }}>
          <div className="title">Draw over any names or profile pictures.</div>
          {this.props.loading ? <Loading /> : <DrawField images={this.props.images} swap={this.props.swap} onSubmit={this.submit} />}
        </Container>
        <ProgressBar onFinishedRoute={`${this.props.code}`} />
      </>
    );
  }
}

const mapStateToProps = (reduxState) => {
  return {
    code: reduxState.response.code,
  };
};


export default withImages(connect(mapStateToProps, { updateImages, clearLoading, setCurrentCode })(AnonymizePage));
