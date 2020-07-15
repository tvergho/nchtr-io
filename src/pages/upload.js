/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
import React, { Component, createRef } from 'react';
import Dropzone from 'react-dropzone';
import { UploadPrompt } from '../components/upload';
import Container from '../components/Container';

const dropzoneRef = createRef();

const openDialog = () => {
  if (dropzoneRef.current) {
    dropzoneRef.current.open();
  }
};

class UploadPage extends Component {
  onDrop = (files) => {
    console.log(files[0].name);
  }

  render() {
    return (
      <Dropzone ref={dropzoneRef} onDrop={this.onDrop} accept="image/*">
        {({ getRootProps, getInputProps, isDragActive }) => (
          <Container
            style={{
              alignItems: 'center', justifyContent: 'center', width: '40vw', opacity: isDragActive ? 0.5 : 1,
            }}
            rootProps={getRootProps}
          >
            <UploadPrompt open={openDialog} inputProps={getInputProps} />
          </Container>
        )}
      </Dropzone>
    );
  }
}

export default UploadPage;
