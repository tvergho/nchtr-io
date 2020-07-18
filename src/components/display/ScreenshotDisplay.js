import React, { useState } from 'react';
import SecondaryArrows from '../SecondaryArrows';

const ScreenshotDisplay = ({ images }) => {
  const [current, setCurrent] = useState(0);

  return (
    <>
      <div>
        <img src={images[current].src} alt="Current screenshot" className="main-image-display" />
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
