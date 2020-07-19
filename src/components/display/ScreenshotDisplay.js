import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import SecondaryArrows from '../SecondaryArrows';

const ScreenshotDisplay = ({
  images, increment, decrement, decrementDisabled, landing,
}) => {
  const [current, setCurrent] = useState(0);

  return (
    <>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
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

        <img src={images[current].src} alt="Current screenshot" className="main-image-display" />

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

export default ScreenshotDisplay;
