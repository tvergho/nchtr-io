/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import BlueButton from '../BlueButton';

const UploadPrompt = ({ open, inputProps }) => {
  return (
    <>
      <div className="title">Drag your screenshots anywhere on the page.</div>
      <div className="subtitle">or</div>
      <input {...inputProps()} />
      <BlueButton onClick={open} icon={faCloudUploadAlt} title="Upload from files" />
    </>
  );
};

export default UploadPrompt;
