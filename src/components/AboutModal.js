import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const AboutModal = ({ display, close }) => {
  const [delayedClose, setDelayedClose] = useState(display);

  useEffect(() => {
    setTimeout(() => { setDelayedClose(display); }, 200);
  }, [display]);

  return (
    <>
      <div className={`backdrop ${display ? 'show' : 'hide'}`} style={delayedClose ? {} : { display: 'none' }} />
      <div className={`blue-modal ${display ? 'show' : 'hide'}`} style={delayedClose ? {} : { display: 'none' }}>
        <button className="transparent modal-close" type="button" onClick={close}>
          <FontAwesomeIcon icon={faTimes} color="white" size="2x" />
        </button>
        <div className="modal-text info">
          Nchtr.io is for those moments when you realize you have <span style={{ fontWeight: 500 }}>no clue how to respond. </span>
          Crowdsource your texts so you&apos;ll always have the perfect response.
        </div>
        <div className="modal-text info">
          Nchtr.io was designed by Rishab Yeddula and developed by Tyler Vergho.
          The GitHub repo is accessible <a href="https://github.com/tvergho/nchtr-io/" target="_blank" rel="noopener noreferrer">here</a>.
        </div>
      </div>
    </>
  );
};

export default AboutModal;
