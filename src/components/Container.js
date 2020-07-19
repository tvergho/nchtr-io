/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import Header from './Header';
import AboutModal from './AboutModal';

const Container = ({
  children, landing, style, rootProps,
}) => {
  const [modalShown, setModalShown] = useState(false);

  return (
    <>
      <Header landing={landing} />
      {rootProps
        ? (
          <div {...rootProps({ style: { display: 'flex', alignItems: 'center', justifyContent: 'center' }, onClick: (e) => { e.stopPropagation(); } })}>
            <div className="container" style={style}>
              {children}
            </div>
          </div>
        )
        : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="container" style={style}>
              {children}
            </div>
          </div>
        )}
      <button type="button" className="transparent about-button" onClick={() => { setModalShown(true); }}>
        <FontAwesomeIcon color="#0D85FE" size="2x" icon={faInfoCircle} />
      </button>
      <AboutModal display={modalShown} close={() => { setModalShown(false); }} />
    </>
  );
};

export default Container;
