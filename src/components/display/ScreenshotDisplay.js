import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import ModalImage from 'react-modal-image';
import { connect } from 'react-redux';
import SecondaryArrows from '../SecondaryArrows';

const ScreenshotDisplay = ({
  images, increment, decrement, decrementDisabled, landing, code,
}) => {
  const [current, setCurrent] = useState(0);

  return (
    <>
      <div className="main-image-container">
        {landing ? (
          <button type="button"
            className="transparent main-decrement"
            onClick={() => { decrement(); }}
            style={decrementDisabled ? { opacity: 0.5, cursor: 'default' } : {}}
            disabled={decrementDisabled}
          >
            <FontAwesomeIcon
              icon={faChevronLeft}
              color="#0D85FE"
              size="4x"
            />
          </button>
        ) : <></>}

        <ModalImage small={images[current].src} medium={images[current].src} className="main-image-display" hideDownload alt={code} />

        {landing ? (
          <button type="button"
            className="transparent main-increment"
            onClick={() => { increment(); }}
          >
            <FontAwesomeIcon
              icon={faChevronRight}
              color="#0D85FE"
              size="4x"
            />
          </button>
        ) : <></>}
      </div>
      <SecondaryArrows
        increment={() => { if (current < images.length - 1) setCurrent(current + 1); }}
        decrement={() => { if (current > 0) setCurrent(current - 1); }}
        current={current}
        images={images}
      />
    </>
  );
};

const mapStateToProps = (reduxState) => {
  return {
    code: reduxState.response.currentShot,
  };
};

export default connect(mapStateToProps, null)(ScreenshotDisplay);
