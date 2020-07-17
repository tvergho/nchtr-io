import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const SecondaryArrows = ({
  increment, decrement, current, images, handleSwap,
}) => {
  const [decrementHovering, setDecrementHovering] = useState(false);
  const [incrementHovering, setIncrementHovering] = useState(false);
  const [swapLeftHovering, setSwapLeftHovering] = useState(false);
  const [swapRightHovering, setSwapRightHovering] = useState(false);

  return (
    <div className="secondary-arrows">
      <button type="button" className="transparent" style={current === 0 ? { opacity: 0.5 } : { opacity: 1 }}>
        <FontAwesomeIcon
          icon={faChevronLeft}
          color="#0D85FE"
          size="3x"
          onMouseEnter={() => { if (current > 0) setDecrementHovering(true); }}
          onMouseLeave={() => { setDecrementHovering(false); }}
          style={decrementHovering ? { opacity: 0.7 } : { opacity: 1 }}
          onClick={() => { decrement(); }}
        />
      </button>

      <button type="button" className="transparent" style={current === 0 ? { opacity: 0.5 } : { opacity: 1 }}>
        <FontAwesomeIcon
          icon={faChevronLeft}
          color="#0D85FE"
          size="2x"
          onMouseEnter={() => { if (current > 0) setSwapLeftHovering(true); }}
          onMouseLeave={() => { setSwapLeftHovering(false); }}
          style={swapLeftHovering ? { opacity: 0.7 } : { opacity: 1 }}
          onClick={() => { if (current > 0) handleSwap(current - 1); }}
        />
      </button>

      <div className="subtitle">{`${current + 1} of ${images.length}`}</div>

      <button type="button" className="transparent" style={current >= images.length - 1 ? { opacity: 0.5 } : { opacity: 1 }}>
        <FontAwesomeIcon
          icon={faChevronRight}
          color="#0D85FE"
          size="2x"
          onMouseEnter={() => { if (current < images.length - 1) setSwapRightHovering(true); }}
          onMouseLeave={() => { setSwapRightHovering(false); }}
          style={swapRightHovering ? { opacity: 0.7 } : { opacity: 1 }}
          onClick={() => { if (current < images.length - 1) handleSwap(current + 1); }}
        />
      </button>

      <button type="button" className="transparent" style={current >= images.length - 1 ? { opacity: 0.5 } : { opacity: 1 }}>
        <FontAwesomeIcon
          icon={faChevronRight}
          color="#0D85FE"
          size="3x"
          onMouseEnter={() => { if (current < images.length - 1) setIncrementHovering(true); }}
          onMouseLeave={() => { setIncrementHovering(false); }}
          style={incrementHovering ? { opacity: 0.7 } : { opacity: 1 }}
          onClick={() => { increment(); }}
        />
      </button>
    </div>
  );
};

export default SecondaryArrows;
