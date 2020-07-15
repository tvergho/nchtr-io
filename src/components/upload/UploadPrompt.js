/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';

const UploadPrompt = ({ open, inputProps }) => {
  return (
    <>
      <div className="upload-title">Drag your screenshots anywhere on the page.</div>
      <div className="upload-subtitle">or</div>
      <input {...inputProps()} />
      <button type="button" className="upload-button" onClick={open}>
        <FontAwesomeIcon icon={faCloudUploadAlt} color="white" size="2x" />
        <div>Upload from files</div>
      </button>
    </>
  );
};

export default UploadPrompt;
