import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const SecondaryArrows = ({
  increment, decrement, current, images, handleSwap, showSwap,
}) => {
  return (
    <div className="secondary-arrows">
      <button type="button"
        className="transparent"
        onClick={() => { decrement(); }}
        style={current === 0 ? { opacity: 0.5, cursor: 'default' } : {}}
        disabled={current === 0}
      >
        <FontAwesomeIcon
          icon={faChevronLeft}
          color="#0D85FE"
          size="3x"
        />
      </button>

      {showSwap ? (
        <button type="button"
          className="transparent"
          onClick={() => { if (current > 0) handleSwap(current - 1); }}
          style={current === 0 ? { opacity: 0.5, cursor: 'default' } : {}}
          disabled={current === 0}
        >
          <FontAwesomeIcon
            icon={faChevronLeft}
            color="#0D85FE"
            size="2x"
          />
        </button>
      ) : <></>}

      <div className="subtitle">{`${current + 1} of ${images.length}`}</div>

      {showSwap ? (
        <button type="button"
          className="transparent"
          onClick={() => { if (current < images.length - 1) handleSwap(current + 1); }}
          style={current >= images.length - 1 ? { opacity: 0.5, cursor: 'default' } : {}}
          disabled={current >= images.length - 1}
        >
          <FontAwesomeIcon
            icon={faChevronRight}
            color="#0D85FE"
            size="2x"
          />
        </button>
      ) : <></>}

      <button type="button"
        className="transparent"
        onClick={() => { increment(); }}
        style={current >= images.length - 1 ? { opacity: 0.5, cursor: 'default' } : {}}
        disabled={current >= images.length - 1}
      >
        <FontAwesomeIcon
          icon={faChevronRight}
          color="#0D85FE"
          size="3x"
        />
      </button>
    </div>
  );
};

export default SecondaryArrows;
