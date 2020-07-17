/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
import React, { Component, createRef } from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { UploadPrompt, ProgressBar } from '../components/upload';
import Container from '../components/Container';
import { uploadImages, clearLoading } from '../actions';

const dropzoneRef = createRef();

const openDialog = () => {
  if (dropzoneRef.current) {
    dropzoneRef.current.open();
  }
};

class UploadPage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    this.props.clearLoading();
  }

  onDrop = (files) => {
    this.props.uploadImages(files);
  }

  render() {
    return (
      <Dropzone ref={dropzoneRef} onDrop={this.onDrop} accept="image/jpeg, image/png">
        {({ getRootProps, getInputProps, isDragActive }) => (
          <>
            <Container
              style={{
                alignItems: 'center', justifyContent: 'center', width: '40vw', opacity: isDragActive ? 0.5 : 1,
              }}
              rootProps={getRootProps}
            >
              <UploadPrompt open={openDialog} inputProps={getInputProps} />
            </Container>
            <ProgressBar />
          </>
        )}
      </Dropzone>
    );
  }
}

export default connect(null, { uploadImages, clearLoading })(UploadPage);
