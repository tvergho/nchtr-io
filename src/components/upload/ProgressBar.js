import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

const ProgressBar = ({ progress, hasStarted, isFinished }) => {
  let percent = progress && progress.length > 0 ? Math.round(Math.min(...progress) * 100) : 0;
  if (hasStarted) {
    percent = Math.max(10, percent);
  }

  if (percent >= 100 && isFinished) {
    const history = useHistory();
    setTimeout(() => { history.push('/anonymize'); }, 300);
  }

  return (
    <div className="upload-progress-bar" style={{ width: `${percent}vw` }} />
  );
};

const mapStateToProps = (reduxState) => {
  return {
    progress: reduxState.file.loading,
    hasStarted: reduxState.file.files.length > 0,
    isFinished: reduxState.file.files.length === reduxState.file.filenames.length,
  };
};

export default connect(mapStateToProps, null)(ProgressBar);
