import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Modal = ({ code, display, close }) => {
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
        <div className="modal-text">Use this code to access your screenshot again in the future.</div>
        <div className="modal-text modal-code">{code}</div>
      </div>
    </>
  );
};

export default Modal;
