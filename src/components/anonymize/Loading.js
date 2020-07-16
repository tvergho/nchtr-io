import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const Loading = () => {
  return (
    <div style={{
      height: '65vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}
    >
      <ClipLoader size={100} color="#0D85FE" />
    </div>
  );
};

export default Loading;
